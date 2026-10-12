/**
 * GET /api/collection/:id/nfts/:itemId?chain=polkadot|kusama|ahp|ahk
 *
 * Returns a single NFT with its on-chain and IPFS metadata.
 */

import { defineEventHandler, getRouterParam, getQuery, createError } from 'h3'

export default defineEventHandler(async (event) => {
  const collectionId = parseInt(getRouterParam(event, 'id') ?? '', 10)
  const itemId = parseInt(getRouterParam(event, 'itemId') ?? '', 10)

  if (![collectionId, itemId].every((n) => Number.isFinite(n) && n >= 0)) {
    throw createError({ statusCode: 400, message: 'Invalid collection or item ID' })
  }

  const chain = resolveChain(getQuery(event).chain)

  try {
    const nft = await fetchNft(collectionId, itemId, chain)
    if (!nft) {
      throw createError({ statusCode: 404, message: `NFT ${collectionId}-${itemId} not found` })
    }
    return JSON.parse(
      JSON.stringify(nft, (_key, value) =>
        typeof value === 'bigint' ? value.toString() : value,
      ),
    )
  } catch (err: unknown) {
    if ((err as { statusCode?: number }).statusCode) throw err
    throw createError({
      statusCode: 500,
      message: err instanceof Error ? err.message : 'Internal server error',
    })
  }
})
