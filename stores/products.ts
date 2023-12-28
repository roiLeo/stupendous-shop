import { extendFields, getClient } from '@kodadot1/uniquery'

interface State {
  items: []
  collection: []
  collectionId: string
}

export const useProductsStore = defineStore('products', {
  state: (): State => ({
    items: [],
    collection: [],
    collectionId: '136',
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
      const client = getClient('ahk')
      const query = client.itemListByCollectionId(this.collectionId, {
        fields: extendFields(['meta', 'price']),
        orderBy: 'createdAt_ASC',
      })
      const { data } = await client.fetch(query)
      this.items = data.items
    },
    async fetchCollection() {
      const client = getClient('ahk')
      const query = client.collectionById(this.collectionId, extendFields(['meta']))
      const { data } = await client.fetch(query)
      this.collection = data.collection
    }
  },
})
