import { SupportWalletExtension } from '@/utils/wallets'
import { BaseDotsamaWallet } from '@/utils/wallets/BaseDotsamaWallet'

export class PolkadotjsWallet extends BaseDotsamaWallet {
	img = '/img/partners/logo-polkadot-js.png'
	extensionName = 'polkadot-js'
	name = 'Polkadot.js'
	source = SupportWalletExtension.PolkadotJs
	walletUrl = 'https://polkadot.js.org/extension/'
	guideUrl = 'https://www.youtube.com/watch?v=r-fAy7Ta_vY'
	isBrowserExtension = true
	isMobileApp = false
	isPopular = true
}
