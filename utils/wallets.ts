import { MetaMaskInpageProvider } from '@metamask/providers'
import { PolkadotjsWallet } from '~/utils/wallets/PolkadotjsWallet'
import { MetamaskWallet } from '~/utils/wallets/MetamaskWallet'
import { LedgerWallet } from '~/utils/wallets/LedgerWallet'
import { MathWallet } from '~/utils/wallets/MathWallet'
import { NovaWallet } from '~/utils/wallets/NovaWallet'
import { FearlessWallet } from '~/utils/wallets/FearlessWallet'
import { SubWallet } from '~/utils/wallets/SubWallet'
import { TalismanWallet } from '~/utils/wallets/TalismanWallet'

// source as 'polkadot-js' in mobile app
export enum SupportWalletExtension {
  PolkadotJs = 'polkadot-js',
  Metamask = 'metamask',
  Clover = 'clover',
  Ledger = 'ledger',
  Math = 'polkadot-js', // mathwallet
  Nova = 'polkadot-js', // nova
  Fearless = 'polkadot-js', // fearless
  SubWallet = 'subwallet-js',
  Talisman = 'talisman',
}

export const SubstrateWallets = [
  SupportWalletExtension.PolkadotJs,
  SupportWalletExtension.Metamask,
  SupportWalletExtension.Clover,
  SupportWalletExtension.Math,
  SupportWalletExtension.Nova,
  SupportWalletExtension.SubWallet,
  SupportWalletExtension.Talisman,
]

// export const isMobileDevice = 'ontouchstart' in document.documentElement && navigator.userAgent.match(/Mobi/)

// export const SupportedWallets = isMobileDevice
//   ? [new MathWallet(), new NovaWallet()]
//   : [new LedgerWallet(), new PolkadotjsWallet(), new SubWallet(), new TalismanWallet()]

export const SupportedWallets = [
  new LedgerWallet(),
  new NovaWallet(),
  new PolkadotjsWallet(),
  new MetamaskWallet(),
  new SubWallet(),
  new TalismanWallet(),
]

export function getWalletBySource(
  source: string | unknown
): Wallet | undefined {
  return SupportedWallets.find((wallet) => {
    return wallet.extensionName === source
  })
}

export function isWalletInstalled(source: string | unknown): boolean {
  const wallet = getWalletBySource(source)
  return wallet?.installed as boolean
}

export type SubscriptionFn = (
  accounts: WalletAccount[] | undefined
) => void | Promise<void>

export interface WalletAccount {
  address: string
  source: string
  name?: string
  wallet?: Wallet
  signer?: unknown
}

interface WalletData {
  extensionName: string
  source: string
  name: string
  walletUrl: string
  guideUrl: string
  img: string
  isBrowserExtension: boolean
  isMobileApp: boolean
  isPopular: boolean
}

interface WalletExtension {
  installed: boolean | undefined

  // The raw extension object which will have everything a dapp developer needs.
  // Refer to a specific wallet's extension documentation
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  extension: any

  // The raw signer object for convenience. Usually the implementer can derive this from the extension object.
  // Refer to a specific wallet's extension documentation
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  signer: any
}

interface Signer {
  // Sign function
  sign?: (address: string, payload: string) => unknown
}

interface Connector {
  enable: () => unknown

  getAccounts: () => unknown

  // The subscribe to accounts function
  subscribeAccounts: (callback: SubscriptionFn) => unknown
}

export interface EvmWalletInfo extends WalletData {
  isSetGlobalString: string
  initEvent?: string
}

export interface EvmWallet extends EvmWalletInfo {
  installed: boolean
  extension: MetaMaskInpageProvider | undefined
  isReady: Promise<MetaMaskInpageProvider | undefined>

  request<T>(args: any): Promise<any>
  enable(): Promise<boolean>
}

export interface Wallet
  extends WalletData,
    WalletExtension,
    Connector,
    Signer {}
