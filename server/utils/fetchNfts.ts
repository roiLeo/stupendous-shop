/**
 * server/utils/fetchNfts.ts
 *
 * Paginated NFTs for a collection. The item list (ids, owners, prices) comes
 * from the cached collection index; only the current page's on-chain metadata
 * URIs (one batched getValues) and IPFS JSON (disk-cached, immutable) are
 * resolved per request. Attributes are loaded only by fetchNft (detail view).
 */

import { getPapiClient, type Chain } from './papi'
import { resolveIpfsJson } from './ipfs'
import type {
  NftItem,
  NftItemMetadata,
  NftAttribute,
  NftWithMetadata,
  NftOffChainMetadata,
  NftPage,
} from '../../types/nft'

// ── Pagination defaults ───────────────────────────────────────────────────────

export const DEFAULT_PAGE_SIZE = 20
export const MAX_PAGE_SIZE     = 100

// ── IPFS concurrency ──────────────────────────────────────────────────────────
// Keep low — each call already tries 4 gateways sequentially.
const IPFS_CONCURRENCY = 6

// ── Main export ───────────────────────────────────────────────────────────────

export interface FetchNftsParams {
  collectionId: number
  chain?:       Chain
  page?:        number   // 1-based, default 1
  pageSize?:    number   // default 20, max 100
}

export async function fetchNfts({
  collectionId,
  chain    = 'polkadot',
  page     = 1,
  pageSize = DEFAULT_PAGE_SIZE,
}: FetchNftsParams): Promise<NftPage> {
  const { typedApi: api } = getPapiClient(chain)

  // Clamp inputs
  const safePage     = Math.max(1, Math.floor(page))
  const safePageSize = Math.min(MAX_PAGE_SIZE, Math.max(1, Math.floor(pageSize)))

  // ── 1. Cached item index (ids, owners, prices) — shared across pages ────
  const { items: sortedItems } = await getCollectionIndex(collectionId, chain)

  const total       = sortedItems.length
  const totalPages  = Math.max(1, Math.ceil(total / safePageSize))
  const clampedPage = Math.min(safePage, totalPages)

  // ── 2. Slice the page window ─────────────────────────────────────────────
  const offset    = (clampedPage - 1) * safePageSize
  const pageItems = sortedItems.slice(offset, offset + safePageSize)

  // ── 3. Bulk-fetch on-chain metadata URIs for this page only ─────────────
  const rawMetaList = await api.query.Nfts.ItemMetadataOf.getValues(
    pageItems.map((item) => [collectionId, item.itemId]),
  )

  const onChainMetaMap = new Map<number, NftItemMetadata>()
  pageItems.forEach((item, i) => {
    const raw = rawMetaList[i]
    if (raw?.data) {
      onChainMetaMap.set(item.itemId, {
        itemId: item.itemId,
        data: bytesToText(raw.data),
        isFrozen: false,
      })
    }
  })

  // ── 5. Resolve IPFS metadata for this page (concurrency = 3) ─────────────
  const nfts: NftWithMetadata[] = []

  for (let i = 0; i < pageItems.length; i += IPFS_CONCURRENCY) {
    const batch    = pageItems.slice(i, i + IPFS_CONCURRENCY)
    const resolved = await Promise.all(
      batch.map(async (item) => {
        const onChainMeta  = onChainMetaMap.get(item.itemId) ?? null
        const offChainMeta = onChainMeta?.data
          ? await resolveIpfsJson<NftOffChainMetadata>(onChainMeta.data)
          : null

        return {
          itemId:           item.itemId,
          owner:            item.owner,
          onChainMetadata:  onChainMeta,
          offChainMetadata: offChainMeta,
          attributes:       [], // only loaded by fetchNft (detail view)
          price:            item.price,
        } satisfies NftWithMetadata
      }),
    )
    nfts.push(...resolved)
  }

  return {
    collectionId,
    chain,
    page:        clampedPage,
    pageSize:    safePageSize,
    total,
    totalPages,
    hasNextPage: clampedPage < totalPages,
    hasPrevPage: clampedPage > 1,
    nfts,
  }
}


/** Fetches a single NFT with its on-chain + IPFS metadata, or null if it does not exist. */
export async function fetchNft(
  collectionId: number,
  itemId: number,
  chain: Chain = 'polkadot',
): Promise<NftWithMetadata | null> {
  const { typedApi: api } = getPapiClient(chain)

  const item = await api.query.Nfts.Item.getValue(collectionId, itemId)
  if (!item) return null

  const [rawMeta, rawPrice, rawAttrs] = await Promise.all([
    api.query.Nfts.ItemMetadataOf.getValue(collectionId, itemId),
    api.query.Nfts.ItemPriceOf.getValue(collectionId, itemId),
    api.query.Nfts.Attribute.getEntries(collectionId, itemId),
  ])

  const uri = rawMeta?.data ? bytesToText(rawMeta.data) : undefined
  const onChainMetadata: NftItemMetadata | null = uri
    ? { itemId, data: uri, isFrozen: false }
    : null

  return {
    itemId,
    owner: item.owner,
    onChainMetadata,
    offChainMetadata: uri ? await resolveIpfsJson<NftOffChainMetadata>(uri) : null,
    attributes: rawAttrs.map(({ keyArgs, value }) => ({
      key:       keyArgs[2].asText() as unknown as string,
      value:     bytesToText(value.value),
      namespace: keyArgs[2],
      deposit:   value.deposit,
    })),
    price: rawPrice ? rawPrice[0].toString() : null,
  }
}
