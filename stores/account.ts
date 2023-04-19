interface State {
  account: string
}

export const useAccountStore = defineStore('account', {
  state: (): State => ({
    account: localStorage.getItem('account') || '',
  }),
  getters: {
    getAccount: (state) => state.account,
  },
  actions: {
    setAccount(address: string) {
      this.account = address;
      localStorage.setItem('account', address);
    },
    resetAccount() {
      console.log('init logout...');
      localStorage.removeItem('account');
      this.account = '';
    },
  },
});
