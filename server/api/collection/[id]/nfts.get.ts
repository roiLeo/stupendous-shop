/**
 * server/api/collection/[id]/nfts.get.ts
 *
 * GET /api/collection/:id/nfts?chain=polkadot&page=1&pageSize=20
 *
 * Returns a paginated NftPage for the given collection.
 *
 * Query params:
 *   chain    — 'polkadot' | 'kusama'  (default: 'polkadot')
 *   page     — 1-based page number    (default: 1)
 *   pageSize — items per page         (default: 20, max: 100)
 *
 * Examples:
 *   GET /api/collection/1/nfts
 *   GET /api/collection/1/nfts?chain=kusama&page=2&pageSize=50
 */

import { defineEventHandler, getRouterParam, getQuery, createError } from 'h3'

export default defineEventHandler(async (event) => {
  const raw = getRouterParam(event, 'id')
  const collectionId = parseInt(raw ?? '', 10)

  if (!Number.isFinite(collectionId) || collectionId < 0) {
    throw createError({ statusCode: 400, message: 'Invalid collection ID' })
  }

  const query = getQuery(event)

  const chain = resolveChain(query.chain)

  const page     = Math.max(1, parseInt(String(query.page     ?? '1'),                10))
  const pageSize = Math.max(1, parseInt(String(query.pageSize ?? DEFAULT_PAGE_SIZE),  10))

  try {
    const data = await fetchNfts({ collectionId, chain, page, pageSize })

    return JSON.parse(
      JSON.stringify(data, (_key, value) =>
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
