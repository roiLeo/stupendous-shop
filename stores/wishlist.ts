interface State {
  wishlist: []
}

export const useWishlistStore = defineStore('wishlist', {
  state: (): State => ({
    wishlist: JSON.parse(localStorage.getItem('wishlist') || ''),
    // wishlist: [],
  }),
  getters: {
    getWishlist: (state) => state.wishlist,
    isEmpty: (state) => state.wishlist.length === 0,
    isInList: (state) => (id: string): boolean => {
      // console.log(this.wishlist)
      console.log(id)
      console.log(state.wishlist)
      return state.wishlist.some((item) => item.id === id)
    },
  },
  actions: {
    addToList(item: any): void {
      this.wishlist.push(item)
      localStorage.setItem('wishlist', JSON.stringify(this.wishlist))
    },

    // to remove from the list
    removeFromList(id: string): void {
      this.wishlist = this.wishlist.filter(
        (item) => item.id !== id
      )
      localStorage.setItem('wishlist', JSON.stringify(this.wishlist))
    },

    fetchWishlist() {
      const wishlist = localStorage.getItem('wishlist')
      if (wishlist) this.wishlist = JSON.parse(wishlist)
    },

    getFromLocalStorage(): void {
      const wishlist = localStorage.getItem('wishlist')
      console.log(wishlist)
      if (wishlist) this.wishlist = JSON.parse(wishlist)
    }
  },
})
