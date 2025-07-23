import { SupportWalletExtension } from '@/utils/wallets'
import { BaseEvmWallet } from '@/utils/wallets/BaseEvmWallet'

export class MetamaskWallet extends BaseEvmWallet {
	img = '/img/partners/logo-metamask.svg'
  extensionName = 'ethereum'
  name = 'Metamask'
  source = SupportWalletExtension.Metamask
  walletUrl = 'https://metamask.io/download/'
  guideUrl = 'https://metamask.io/faqs/'
  isBrowserExtension = true
  isMobileApp = false
	isPopular = true
  isSetGlobalString = 'isMetaMask'
  initEvent = 'ethereum#initialized'
}
