import { SupportWalletExtension } from '@/utils/wallets'
import { BaseDotsamaWallet } from '@/utils/wallets/BaseDotsamaWallet'

export class MathWallet extends BaseDotsamaWallet {
	img = '/img/partners/logo-mathwallet.png'
	extensionName = 'mathwallet'
	name = 'Math Wallet'
	source = SupportWalletExtension.Math
	walletUrl = 'https://mathwallet.org/en-us/'
	guideUrl = 'https://blog.mathwallet.org/?p=540'
	isBrowserExtension = false
	isMobileApp = true
	isPopular = false
}
