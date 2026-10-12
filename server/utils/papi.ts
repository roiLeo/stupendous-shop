/**
 * server/utils/papi.ts
 *
 * Two process-level singleton PAPI clients — one for Polkadot Asset Hub,
 * one for Kusama Asset Hub. Both are lazy-initialised on first use.
 *
 * Node.js version notes:
 *   - Node ≥ 22.4  →  global WebSocket is available, no extra package needed.
 *   - Node 18 / 20 →  install `ws` (`npm i ws`) and uncomment the shim below.
 *
 * Setup (run once after npm install):
 *   npx papi add ahp -n polkadot_asset_hub    # Polkadot Asset Hub descriptor
 *   npx papi add ahk -n ksmcc3_asset_hub      # Kusama   Asset Hub descriptor
 *   npx papi                                  # codegen
 */

import { createClient } from 'polkadot-api'
import { getWsProvider } from 'polkadot-api/ws'
import { ahp, ahk } from '@polkadot-api/descriptors'

// ── Chain identifiers ─────────────────────────────────────────────────────────
export type Chain = 'polkadot' | 'kusama'

const CHAIN_DEFAULTS: Record<Chain, string> = {
  polkadot: 'wss://polkadot-asset-hub-rpc.polkadot.io',
  kusama:   'wss://kusama-asset-hub-rpc.polkadot.io',
}

// ── Per-chain singleton state ─────────────────────────────────────────────────
type AhpTypedApi  = ReturnType<ReturnType<typeof createClient>['getTypedApi']>  // polkadot
type AhkTypedApi = ReturnType<ReturnType<typeof createClient>['getTypedApi']>  // kusama

const _instances = {
  polkadot: null as { client: ReturnType<typeof createClient>; typedApi: AhpTypedApi  } | null,
  kusama:   null as { client: ReturnType<typeof createClient>; typedApi: AhkTypedApi } | null,
}

// ── Factory ───────────────────────────────────────────────────────────────────

function makeClient(wsUrl: string, label: string) {
  // polkadot-api ≥ 3: getWsProvider already includes the polkadot-sdk compat layer
  return createClient(
    getWsProvider(wsUrl, {
      // websocketClass: WSForPapi,   // ← uncomment for Node 18/20
      onStatusChanged: (s) => console.log(`[papi:${label}]`, s.type),
    }),
  )
}

// ── Public API ────────────────────────────────────────────────────────────────

export function getPapiClient(chain: 'polkadot'): { client: ReturnType<typeof createClient>; typedApi: AhpTypedApi }
export function getPapiClient(chain: 'kusama'):   { client: ReturnType<typeof createClient>; typedApi: AhkTypedApi }
export function getPapiClient(chain: Chain) {
  if (chain === 'polkadot') {
    if (!_instances.polkadot) {
      const wsUrl = process.env.NUXT_POLKADOT_HUB_WS_URL ?? CHAIN_DEFAULTS.polkadot
      const client = makeClient(wsUrl, 'polkadot')
      _instances.polkadot = { client, typedApi: client.getTypedApi(ahp) }
    }
    return _instances.polkadot
  }

  // kusama
  if (!_instances.kusama) {
    const wsUrl = process.env.NUXT_KUSAMA_HUB_WS_URL ?? CHAIN_DEFAULTS.kusama
    const client = makeClient(wsUrl, 'kusama')
    _instances.kusama = { client, typedApi: client.getTypedApi(ahk) }
  }
  return _instances.kusama
}
