/**
 * server/api/collection/[id].get.ts
 *
 * GET /api/collection/:id?chain=polkadot   (default)
 * GET /api/collection/:id?chain=kusama
 *
 * Returns the full CollectionData JSON for the given collection ID on the
 * specified chain. BigInt values are serialised as strings.
 *
 * Examples:
 *   curl http://localhost:3000/api/collection/1
 *   curl http://localhost:3000/api/collection/1?chain=kusama
 */

import { defineEventHandler, getRouterParam, getQuery, createError } from 'h3'

export default defineEventHandler(async (event) => {
  const raw = getRouterParam(event, 'id')
  const collectionId = parseInt(raw ?? '', 10)

  if (!Number.isFinite(collectionId) || collectionId < 0) {
    throw createError({ statusCode: 400, message: 'Invalid collection ID' })
  }

  const { chain: chainParam } = getQuery(event)
  const chain = resolveChain(chainParam)

  try {
    const data = await fetchCollection(collectionId, chain)

    if (!data.details) {
      throw createError({
        statusCode: 404,
        message: `Collection ${collectionId} does not exist on ${chain} Asset Hub`,
      })
    }

    // BigInt is not JSON-serialisable — convert to string
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
