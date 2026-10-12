/**
 * server/utils/fetchCollection.ts
 *
 * Pure server-side data fetching for both Polkadot and Kusama Asset Hub.
 * Pass `chain: 'polkadot' | 'kusama'` to target the right network.
 */

import { getPapiClient, type Chain } from './papi'
import type {
  CollectionData,
  CollectionDetails,
  CollectionMetadata,
  CollectionConfig,
  CollectionAttribute,
  NftAttribute,
} from '../../types/nft'


export async function fetchCollection(
  collectionId: number,
  chain: Chain = 'polkadot',
): Promise<CollectionData> {
  // getPapiClient is overloaded — TypeScript picks the right typedApi shape
  // for each chain automatically.
  const { typedApi: api } = getPapiClient(chain)

  // 1. Details
  const rawDetails = await api.query.Nfts.Collection.getValue(collectionId)
  const details: CollectionDetails | null = rawDetails
    ? {
        owner: rawDetails.owner,
        items: rawDetails.items,
        itemMetadatas: rawDetails.item_metadatas,
        itemConfigs: rawDetails.item_configs,
        attributes: rawDetails.attributes,
      }
    : null

  // 2. Metadata URI
  const rawMeta = await api.query.Nfts.CollectionMetadataOf.getValue(collectionId)
  const metadata: CollectionMetadata | null = rawMeta
    ? await resolveIpfsJson(bytesToText(rawMeta.data))
    : null

  // 3. Config
  const rawConfig = await api.query.Nfts.CollectionConfigOf.getValue(collectionId)
  const config: CollectionConfig | null = rawConfig
    ? {
        settings: rawConfig.settings,
        maxSupply: rawConfig.max_supply ?? undefined,
        mintSettings: {
          mintType: rawConfig.mint_settings.mint_type,
          price: rawConfig.mint_settings.price ?? undefined,
          startBlock: rawConfig.mint_settings.start_block ?? undefined,
          endBlock: rawConfig.mint_settings.end_block ?? undefined,
          defaultItemSettings: rawConfig.mint_settings.default_item_settings,
        },
      }
    : null

  // 4. All attributes (collection-level + per-item) in one query
  // const rawAttrs = await api.query.Nfts.Attribute.getEntries(collectionId, undefined)

  // console.log(rawAttrs)
  // const collectionAttributes: CollectionAttribute[] = rawAttrs
  //   .filter(({ keyArgs }) => keyArgs[1] === undefined)
  //   .map(({ keyArgs, value }) => ({
  //     key: keyArgs[2].toText() as unknown as Uint8Array,
  //     value: value.value.toText(),
  //     namespace: keyArgs[2],
  //     deposit: value.deposit,
  //   }))

  const { stats } = await getCollectionIndex(collectionId, chain)

  return { id: collectionId, chain, details, metadata, config, stats }
}
