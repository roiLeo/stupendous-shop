import { extendFields, getClient } from '@kodadot1/uniquery'

interface State {
  collectionId: string
  items: []
}

export const useProductsStore = defineStore('products', {
  state: (): State => ({
    collectionId: '1825819407',
    items: [],
  }),
  getters: {
    getItems: (state) => state.items,
    getCollectionId: (state) => state.collectionId,
  },
  actions: {
    setCollectionId(id: string) {
      this.collectionId = id
    },
    async fetchItems() {
      const client = getClient('bsx')
      const query = client.itemListByCollectionId(this.collectionId, {
        fields: extendFields(['meta', 'price']),
        orderBy: 'createdAt_ASC',
      })
      const { data } = await client.fetch(query)
      this.items = data.items
    }
  },
})
