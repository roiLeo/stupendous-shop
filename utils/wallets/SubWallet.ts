import { SupportWalletExtension } from '@/utils/wallets'
import { BaseDotsamaWallet } from '@/utils/wallets/BaseDotsamaWallet'

export class SubWallet extends BaseDotsamaWallet {
	img = '/img/partners/logo-subwallet.svg'
	extensionName = 'subwallet-js'
	name = 'SubWallet'
	source = SupportWalletExtension.SubWallet
	walletUrl =
		'https://chrome.google.com/webstore/detail/subwallet/onhogfjeacnfoofkfgppdlbmlmnplgbn?hl=en&authuser=0'
	guideUrl = 'https://connect.subwallet.app/#/welcome'
	isBrowserExtension = true
	isMobileApp = false
	isPopular = false
}
