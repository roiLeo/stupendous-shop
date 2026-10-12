// ─────────────────────────────────────────────────────────────────────────────
// NFT Types  –  mirrors the on-chain shape returned by the NFTs pallet
// on Polkadot / Kusama Asset Hub.
// ─────────────────────────────────────────────────────────────────────────────

export type Chain = 'polkadot' | 'kusama'

export type CollectionId = number

export interface CollectionDetails {
  /** Account that owns the collection */
  owner: string
  /** Current total supply of items */
  items: number
  /** Number of items with metadata set */
  itemMetadatas: number
  /** Number of item configs stored */
  itemConfigs: number
  /** Number of attributes attached to the collection */
  attributes: number
}

export interface CollectionMetadata {
  /** Raw IPFS / HTTP URI stored on-chain */
  data: string
  /** Whether the metadata has been frozen (made immutable) */
  isFrozen: boolean
}

export interface CollectionConfig {
  settings: bigint
  maxSupply: number | undefined
  mintSettings: {
    mintType: unknown
    price: bigint | undefined
    startBlock: number | undefined
    endBlock: number | undefined
    defaultItemSettings: bigint
  }
}

export interface NftItem {
  itemId: number
  owner: string
}

export interface NftItemMetadata {
  itemId: number
  data: string
  isFrozen: boolean
}

export interface NftAttribute {
  /** Key of the attribute (decoded from bytes) */
  key: string
  /** Value of the attribute (decoded from bytes) */
  value: string
  /** Namespace descriptor */
  namespace: unknown
  /** Optional deposit info */
  deposit: unknown
}

export interface CollectionAttribute {
  key: string
  value: string
  namespace: unknown
  deposit: unknown
}

// ─── Resolved off-chain metadata (fetched from IPFS / HTTP) ─────────────────

export interface NftOffChainMetadata {
  name?: string
  description?: string
  image?: string
  external_url?: string
  attributes?: Array<{ trait_type: string; value: string | number }>
  [key: string]: unknown
}

// ─── Aggregate result ────────────────────────────────────────────────────────

export interface NftWithMetadata extends NftItem {
  onChainMetadata: NftItemMetadata | null
  offChainMetadata: NftOffChainMetadata | null
  attributes: NftAttribute[]
  /** Listing price in planck, null when not for sale */
  price: string | null
}

/** Collection-level data only — no NFT items (fetched separately with pagination) */
export interface CollectionData {
  collectionId: CollectionId
  chain: Chain
  details: CollectionDetails | null
  metadata: CollectionMetadata | null
  config: CollectionConfig | null
  stats: { items: number; owners: number; listed: number; floor: string | null }
}

/** One page of NFTs returned by fetchNfts */
export interface NftPage {
  collectionId: CollectionId
  chain: Chain
  page: number
  pageSize: number
  total: number
  totalPages: number
  hasNextPage: boolean
  hasPrevPage: boolean
  nfts: NftWithMetadata[]
}

// ─── Composable state ────────────────────────────────────────────────────────

export type FetchStatus = 'idle' | 'loading' | 'success' | 'error'

export interface UseNftCollectionState {
  status: FetchStatus
  error: string | null
  data: CollectionData | null
}
