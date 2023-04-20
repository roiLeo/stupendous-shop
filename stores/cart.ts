interface State {
  cart: []
  loading: boolean
  error: any
}

export const useCartStore = defineStore('cart', {
  state: (): State => ({
    cart: [],
    loading: true,
    error: null,
  }),
  getters: {
    getCartQuantity: (state) => state.cart.reduce((total) => total, 0),
    getCartTotal: (state) => state.cart.reduce(
      (total, product) =>
        total +
        Number(product.price) ,
      0
    )
  },
  actions: {
    addToCart(product) {
      const foundProductInCartIndex = this.cart.findIndex(
        (cartproduct) => product.id === cartproduct.id
      )

      if (foundProductInCartIndex > -1) {
        this.cart[foundProductInCartIndex].quantity += 1
      } else {
        product.quantity = 1
        this.cart.push(product)
      }
    },
    removeProductFromCart(product) {
      this.cart.splice(this.cart.indexOf(product), 1)
    },
    clearCart() {
      this.cart.length = 0
    },
  },
})
