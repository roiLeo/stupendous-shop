import { SupportWalletExtension } from '@/utils/wallets'
import { BaseDotsamaWallet } from '@/utils/wallets/BaseDotsamaWallet'

export class NovaWallet extends BaseDotsamaWallet {
	img = '/img/partners/logo-nova.png'
	extensionName = 'nova'
	name = 'Nova'
	source = SupportWalletExtension.Nova
	walletUrl = 'https://novawallet.io/'
	guideUrl = 'https://novawallet.io/'
	isBrowserExtension = false
	isMobileApp = true
	isPopular = false
}
