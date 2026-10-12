/**
 * server/utils/collectionIndex.ts
 *
 * One cached, JSON-safe snapshot of a collection's items (id, owner, price).
 * Built from two storage reads — Nfts.Item and Nfts.ItemPriceOf — and shared
 * by every page request and by the collection stats, so the chain is queried
 * once per TTL instead of once per request.
 */

import { getPapiClient, type Chain } from './papi'

export interface IndexedItem {
  itemId: number
  owner: string
  /** planck, as a string (JSON-safe); null when not for sale */
  price: string | null
}

export interface CollectionStats {
  items: number
  owners: number
  listed: number
  /** cheapest listing in planck (string), null when nothing is listed */
  floor: string | null
}

export interface CollectionIndex {
  items: IndexedItem[]
  stats: CollectionStats
}

const INDEX_TTL_SECONDS = 60

export const getCollectionIndex = defineCachedFunction(
  async (collectionId: number, chain: Chain): Promise<CollectionIndex> => {
    const { typedApi: api } = getPapiClient(chain)

    const [entries, priceEntries] = await Promise.all([
      api.query.Nfts.Item.getEntries(collectionId),
      api.query.Nfts.ItemPriceOf.getEntries(collectionId),
    ])

    const prices = new Map<number, bigint>(
      priceEntries.map(({ keyArgs, value }) => [keyArgs[1] as number, value[0]]),
    )

    const items: IndexedItem[] = entries
      .map(({ keyArgs, value }) => ({
        itemId: keyArgs[1] as number,
        owner: value.owner,
        price: prices.get(keyArgs[1] as number)?.toString() ?? null,
      }))
      .sort((a, b) => a.itemId - b.itemId)

    const listedPrices = items.filter((i) => i.price !== null).map((i) => BigInt(i.price!))
    const floor = listedPrices.length
      ? listedPrices.reduce((min, p) => (p < min ? p : min)).toString()
      : null

    return {
      items,
      stats: {
        items: items.length,
        owners: new Set(items.map((i) => i.owner)).size,
        listed: listedPrices.length,
        floor,
      },
    }
  },
  {
    name: 'collection-index',
    group: 'papi',
    maxAge: INDEX_TTL_SECONDS,
    staleMaxAge: INDEX_TTL_SECONDS * 5, // serve stale while revalidating
    getKey: (collectionId: number, chain: Chain) => `${chain}-${collectionId}`,
  },
)
