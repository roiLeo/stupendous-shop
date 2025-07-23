import { SupportWalletExtension } from '@/utils/wallets'
import { BaseDotsamaWallet } from '@/utils/wallets/BaseDotsamaWallet'

export class TalismanWallet extends BaseDotsamaWallet {
	img = '/img/partners/logo-talisman.svg'
	extensionName = 'talisman'
	name = 'Talisman'
	source = SupportWalletExtension.Talisman
	walletUrl = 'https://app.talisman.xyz/spiritkeys'
	guideUrl = 'https://app.talisman.xyz/'
	isBrowserExtension = true
	isMobileApp = false
	isPopular = false
}
