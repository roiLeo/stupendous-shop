interface State {
  wishlist: []
}

export const useWishlistStore = defineStore('wishlist', {
  state: (): State => ({
    wishlist: [],
  }),
  getters: {
    getWishlist: (state) => state.wishlist,
    isEmpty: (state) => state.wishlist.length === 0,
    isInList: (state) => (product): boolean => {
      const foundProductInCartIndex = state.wishlist.findIndex(
        (wish) => product.id === wish.id
      )
      return foundProductInCartIndex > -1
    },
  },
  actions: {
    addToList(product: any) {
      const foundProductInListIndex = this.wishlist.findIndex(
        (item) => product.id === item.id
      )

      if (foundProductInListIndex > -1) {
        this.wishlist[foundProductInListIndex].quantity += 1
      } else {
        product.quantity = 1
        this.wishlist.push(product)
      }

      localStorage.setItem('wishlist', JSON.stringify(this.wishlist))
    },

    removeFromList(product) {
      this.wishlist.splice(this.wishlist.indexOf(product), 1)
      localStorage.setItem('wishlist', JSON.stringify(this.wishlist))
    },

    getFromLocalStorage() {
      const wishlist = localStorage.getItem('wishlist')
      console.log(wishlist)
      if (wishlist) this.wishlist = JSON.parse(wishlist)
    }
  },
})
