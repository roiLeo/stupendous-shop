/**
 * Maps an NFT returned by /api/collection/:id/nfts into the flat "product"
 * shape the UI components (cards, cart, wishlist) work with.
 */
export interface Product {
  id: string
  sn: number
  name: string
  price: string
  currentOwner: string
  meta: { image?: string; description?: string }
}

export function toProduct(nft: any): Product {
  return {
    id: String(nft.itemId),
    sn: nft.itemId,
    name: nft.offChainMetadata?.name ?? `#${nft.itemId}`,
    price: nft.price ?? '0',
    currentOwner: nft.owner,
    meta: {
      image: nft.offChainMetadata?.image,
      description: nft.offChainMetadata?.description,
    },
  }
}

export function useCollectionSource() {
  const config = useRuntimeConfig()
  return { chain: config.public.CHAIN, collectionId: config.public.COLLECTION_ID }
}
