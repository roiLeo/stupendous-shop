import { SupportWalletExtension } from '@/utils/wallets'
import { BaseDotsamaWallet } from '@/utils/wallets/BaseDotsamaWallet'

export class CloverWallet extends BaseDotsamaWallet {
	img = '/img/partners/logo-clover.png'
	extensionName = 'clover'
	name = 'Clover'
	source = SupportWalletExtension.Clover
	walletUrl = 'https://clover.finance/'
	guideUrl = 'https://docs.clover.finance/quick-start/about-clover'
	isBrowserExtension = true
	isMobileApp = false
	isPopular = false
}
