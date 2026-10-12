/**
 * server/utils/ipfs.ts
 *
 * Server-side IPFS metadata resolver.
 *
 * Gateway priority (tried in order, first 200 wins):
 *   1. LRU cache                         — free, instant, process-level
 *   2. bucket.chaotic.art                — primary; override via NUXT_IPFS_PRIMARY_GATEWAY
 *   3. cloudflare-ipfs.com               — first public fallback
 *   4. ipfs.io                           — second public fallback
 *   5. gateway.pinata.cloud              — last-resort fallback
 *
 * Unlike the client-side composable (which races all gateways and picks the
 * fastest), the server tries them sequentially so we don't fire 4 parallel
 * outbound requests for every NFT. The primary gateway (chaotic.art) will
 * succeed for the vast majority of KodaDot-pinned content; the others exist
 * only to handle edge cases.
 *
 * Override / extend via .env:
 *   NUXT_IPFS_PRIMARY_GATEWAY=https://your-own-gateway.example.com/ipfs/
 *   NUXT_IPFS_TIMEOUT_MS=8000
 */

// ── Gateway list ──────────────────────────────────────────────────────────────

const DEFAULT_GATEWAYS = [
  'https://bucket.chaotic.art/ipfs/',
  // MOAR
] as const

/** Returns the ordered gateway list, inserting a custom primary if configured. */
function getGateways(): string[] {
  const custom = process.env.NUXT_IPFS_PRIMARY_GATEWAY
  if (custom) {
    const normalised = custom.endsWith('/') ? custom : `${custom}/`
    // Put the custom gateway first, then the defaults (deduped)
    return [normalised, ...DEFAULT_GATEWAYS.filter((g) => g !== normalised)]
  }
  return [...DEFAULT_GATEWAYS]
}

function getTimeoutMs(): number {
  return Number(process.env.NUXT_IPFS_TIMEOUT_MS ?? 8_000)
}

// ── LRU cache ─────────────────────────────────────────────────────────────────
// Process-level, no external deps. Capped at 1 000 CIDs (~10 MB for typical
// NFT JSON payloads). Oldest entry evicted when full.

const CACHE_MAX = 1_000
const _cache = new Map<string, unknown>()

function cacheGet<T>(key: string): T | undefined {
  if (!_cache.has(key)) return undefined
  const v = _cache.get(key)
  _cache.delete(key)
  _cache.set(key, v) // re-insert → marks as recently used
  return v as T
}

function cacheSet(key: string, value: unknown): void {
  if (_cache.size >= CACHE_MAX) {
    _cache.delete(_cache.keys().next().value!)
  }
  _cache.set(key, value)
}

// ── CID extraction ────────────────────────────────────────────────────────────

const RE_IPFS_PATH = /\/ipfs\/([^/?#\s]+)/
const RE_CID_V0    = /^(Qm[1-9A-HJ-NP-Za-km-z]{44,})/
const RE_CID_V1    = /^(b[a-z2-7]{58,})/i   // CIDv1 base32 starts with 'b'

/**
 * Extracts a raw CID (+ optional subpath) from any URI variant:
 *   ipfs://Qm…[/path]
 *   ipfs://bafy…[/path]
 *   /ipfs/Qm…
 *   https://any-host/ipfs/Qm…   ← re-routed through our gateways
 *   Qm… bare CIDv0
 *   bafy… bare CIDv1
 *
 * Returns { cid, subpath } or null for plain HTTP URIs.
 */
export function extractCid(uri: string): { cid: string; subpath: string } | null {
  if (!uri) return null

  // ipfs:// scheme — may include a subpath after the CID
  if (uri.startsWith('ipfs://')) {
    const rest    = uri.slice(7).replace(/^ipfs\//, '') // strip redundant /ipfs/ prefix
    const slashAt = rest.indexOf('/')
    const cid     = slashAt === -1 ? rest : rest.slice(0, slashAt)
    const subpath = slashAt === -1 ? '' : rest.slice(slashAt) // e.g. "/metadata.json"
    return cid ? { cid, subpath } : null
  }

  // /ipfs/<cid>[/path] or https://host/ipfs/<cid>[/path]
  const pathMatch = uri.match(RE_IPFS_PATH)
  if (pathMatch) {
    const after   = uri.slice(uri.indexOf(pathMatch[0]) + pathMatch[0].length)
    return { cid: pathMatch[1], subpath: after || '' }
  }

  // bare CIDv0
  const v0 = uri.match(RE_CID_V0)
  if (v0) return { cid: v0[1], subpath: '' }

  // bare CIDv1
  const v1 = uri.match(RE_CID_V1)
  if (v1) return { cid: v1[1], subpath: '' }

  return null // plain HTTP URI — not IPFS
}

// ── Core fetcher ──────────────────────────────────────────────────────────────

// Per-gateway timeout — kept short so we fail fast and try the next one.
// Total worst-case time = PER_GATEWAY_MS × number_of_gateways.
const PER_GATEWAY_MS = 10_000

/**
 * Tries each gateway in order until one returns a 200.
 * Returns the response text (JSON string) or throws if all fail.
 *
 * Timeout applies per-gateway so a slow gateway doesn't block the chain —
 * we immediately move on to the next one instead of waiting indefinitely.
 */
async function fetchFromGateways(cid: string, subpath: string): Promise<string> {
  const gateways = getGateways()
  const errors: string[] = []

  for (const gateway of gateways) {
    const url = `${gateway}${cid}${subpath}`
    try {
      const res = await fetch(url, {
        headers: { Accept: 'application/json' },
        // Short individual timeout — on expiry an AbortError is thrown,
        // caught below, and we immediately try the next gateway.
        signal: AbortSignal.timeout(PER_GATEWAY_MS),
      })

      if (res.ok) {
        console.debug(`[ipfs] ✓ ${gateway} → ${cid}`)
        return await res.text()
      }

      errors.push(`${gateway}: HTTP ${res.status}`)
      console.warn(`[ipfs] ✗ ${gateway} HTTP ${res.status} for ${cid}`)
    } catch (err) {
      const msg = (err as Error).message
      errors.push(`${gateway}: ${msg}`)
      // AbortError = timeout — log and try next gateway immediately
      console.warn(`[ipfs] ✗ ${gateway} failed for ${cid}: ${msg}`)
    }
  }

  throw new Error(
    `All IPFS gateways failed for CID ${cid}:\n  ${errors.join('\n  ')}`,
  )
}

// ── Public API ────────────────────────────────────────────────────────────────

/**
 * Resolves any URI to parsed JSON metadata, with LRU caching.
 *
 * - IPFS URIs → tried against the gateway chain (chaotic.art first)
 * - Plain HTTPS URIs (e.g. Arweave) → fetched directly
 * - Returns null on failure so one bad CID doesn't abort an entire collection fetch
 *
 * @example
 *   resolveIpfsJson('ipfs://QmXxx...')
 *   resolveIpfsJson('https://arweave.net/xxx')
 */
export async function resolveIpfsJson<T = unknown>(uri: string): Promise<T | null> {
  if (!uri) return null

  const parsed = extractCid(uri)

  // ── Plain HTTPS URI (Arweave, custom CDN, etc.) ───────────────────────────
  if (!parsed) {
    try {
      const res = await fetch(uri, {
        headers: { Accept: 'application/json' },
        signal:  AbortSignal.timeout(getTimeoutMs()),
      })
      if (!res.ok) return null
      return await res.json() as T
    } catch {
      return null
    }
  }

  const { cid, subpath } = parsed

  // ── Cache hit ─────────────────────────────────────────────────────────────
  const cacheKey = `${cid}${subpath}`
  const cached   = cacheGet<T>(cacheKey)
  if (cached !== undefined) return cached

  // CIDs are content-addressed, so persisted JSON never goes stale.
  const stored = await useStorage('ipfs').getItem<T>(cacheKey).catch(() => null)
  if (stored) {
    cacheSet(cacheKey, stored)
    return stored
  }

  // ── Fetch from gateway chain ──────────────────────────────────────────────
  try {
    const text   = await fetchFromGateways(cid, subpath)
    const result = JSON.parse(text) as T
    cacheSet(cacheKey, result)
    await useStorage('ipfs').setItem(cacheKey, result as any).catch(() => {})
    return result
  } catch (err) {
    console.warn(`[ipfs] resolveIpfsJson failed for "${uri}":`, (err as Error).message)
    return null
  }
}
