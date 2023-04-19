import { SupportedWallets, Wallet, WalletAccount } from '@/utils/wallets'
import { useAccountStore } from '@/stores/account'

export const useConnectWallet = () => {
  const accountStore = useAccountStore()
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

  const account = computed(() => accountStore.getAccount)

  const resetAccount = () => accountStore.resetAccount()

  const setAccount = (address: string) => {
    accountStore.setAccount(address)
    toggleWalletModal()
  }

  // const account = computed({
  //   get: () => accountStore.getAccount,
  //   set: (address: string) => accountStore.setAccount(address)
  // })

	return {
    account,
    setAccount,
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
