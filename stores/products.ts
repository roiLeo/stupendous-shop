import { extendFields, getClient } from '@kodadot1/uniquery'

interface State {
  items: []
  collection: []
  collectionId: string
  chain: string
}

const config = useRuntimeConfig()

export const useProductsStore = defineStore('products', {
  state: (): State => ({
    items: [],
    collection: [],
    collectionId: config.public.COLLECTION_ID,
    chain: config.public.CHAIN,
  }),
  getters: {
    getItems: (state) => state.items,
    getCollection: (state) => state.collection,
    getCollectionId: (state) => state.collectionId,
  },
  actions: {
    setCollectionId(id: string) {
      this.collectionId = id
    },
    async fetchItems() {
      const client = getClient(this.chain)
      const query = client.itemListByCollectionId(this.collectionId, {
        fields: extendFields(['meta', 'price', 'sn']),
        orderBy: 'createdAt_ASC',
      })
      const { data } = await client.fetch(query)
      this.items = data.items
    },
    async fetchCollection() {
      const client = getClient(this.chain)
      const query = client.collectionById(
        this.collectionId,
        extendFields(['meta', 'volume', 'nftCount', 'floor', 'ownerCount', 'distribution'])
      )
      const { data } = await client.fetch(query)
      this.collection = data.collection
    }
  },
})
