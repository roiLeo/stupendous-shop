import { SupportWalletExtension } from '@/utils/wallets'
import { BaseDotsamaWallet } from '@/utils/wallets/BaseDotsamaWallet'

export class LedgerWallet extends BaseDotsamaWallet {
	img = '/img/partners/logo-ledger.svg'
	extensionName = 'ledger'
	name = 'Ledger'
	source = SupportWalletExtension.Ledger
	walletUrl = 'https://www.ledger.com/ledger-live'
	guideUrl = 'https://www.ledger.com/ledger-live'
	isBrowserExtension = false
	isMobileApp = false
	isPopular = false
}
