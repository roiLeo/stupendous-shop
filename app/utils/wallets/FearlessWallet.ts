import { SupportWalletExtension } from '@/utils/wallets'
import { BaseDotsamaWallet } from '@/utils/wallets/BaseDotsamaWallet'

export class FearlessWallet extends BaseDotsamaWallet {
	img = '/img/partners/logo-fearless.svg'
	extensionName = 'fearless'
	name = 'Fearless'
	source = SupportWalletExtension.Fearless
	walletUrl = 'https://fearlesswallet.io/'
	guideUrl = 'https://fearlesswallet.io/#FAQ'
	isBrowserExtension = false
	isMobileApp = true
	isPopular = false
}
