import { SupportedWallets, Wallet, WalletAccount } from '@/utils/wallets'

export const useConnectWallet = () => {
  const selectedWallet = ref<string>('')
  const hasWalletProviderExtension = ref<boolean>(false)
  const hasSelectedWalletProvider = ref<boolean>(false)
  const hasEnabledWalletProvider = ref<boolean>(false)
  const isWalletModalOpen = ref<boolean>(false)
  const selectedWalletProvider = ref<Wallet>()
  const wallets = ref<Wallet[]>(SupportedWallets)
  const walletAccounts = ref<WalletAccount[]>()
  const guideUrl = ref('')
  const extensionUrl = ref('')

  const toggleWalletModal = () => {
    nextTick(() => {
      isWalletModalOpen.value = !isWalletModalOpen.value
    })
  }

  const setWallet = (wallet: Wallet) => {
    nextTick(async () => {
      hasWalletProviderExtension.value = true
      hasSelectedWalletProvider.value = true
      selectedWalletProvider.value = wallet

      if (wallet.installed) {
        walletAccounts.value = (await wallet.getAccounts()) as any
      } else {
        hasEnabledWalletProvider.value = false
        guideUrl.value = wallet.guideUrl
        extensionUrl.value = wallet.walletUrl
      }
    })
  }

  const setAccount = (address: string) => {
    console.log(address)
    localStorage.setItem('account', address)
    isWalletModalOpen.value = false
  }

  const resetAccount = () => {
    console.log('init logout...')
    localStorage.removeItem('account')
    account.value = ''
  }

  const account = computed({
    get: () => localStorage.getItem('account') || '',
    set: (address: string) => setAccount(address)
  })

	return {
    account,
    resetAccount,
    hasWalletProviderExtension,
    hasSelectedWalletProvider,
    hasEnabledWalletProvider,
    selectedWalletProvider,
    isWalletModalOpen,
    toggleWalletModal,
    wallets,
    walletAccounts,
    guideUrl,
    extensionUrl,
    selectedWallet,
    setWallet
  }
}
