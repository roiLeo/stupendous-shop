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
    getCartQuantity: (state) => state.cart.reduce((total, product: {quantity: number}) => total + product.quantity, 0),
    getCartTotal: (state) => {
      const currencySymbol = '€'

      return state.cart.reduce(
        (total, product) =>
          total +
          Number(product.price.replace(currencySymbol, '')) * product.quantity,
        0
      )
    },
  },
  actions: {
    addToCart(product) {
      const foundProductInCartIndex = this.cart.findIndex(
        (cartproduct) => product.slug === cartproduct.slug
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
