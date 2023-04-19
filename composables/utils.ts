import { encodeAddress } from '@polkadot/util-crypto'
import { formatBalance } from '@polkadot/util'

export function timeAgo(date: string) {
	const time = Date.parse(date)
	const between = Date.now() / 1000 - Number(time) / 1000
	if (between < 3600) {
		return pluralize(~~(between / 60), ' minute')
	} else if (between < 86400) {
		return pluralize(~~(between / 3600), ' hour')
	} else {
		return pluralize(~~(between / 86400), ' day')
	}
}

export function pluralize(time: number, label: string) {
	if (time === 1) {
		return time + label
	}

	return `${time + label}s`
}

export function shortAddress(address: string, begin?: number, end?: number): string {
	begin = begin || 6
	end = end || -6

	return `${address.slice(0, begin)}...${address.slice(end)}`
}

export function formatAddress(address: string, ss58Format: number) {
  return encodeAddress(address, ss58Format)
}

export function formatPrice(price?: bigint | string) {
  const value = BigInt(price || BigInt(0))
  const magic = formatBalance(value, {
    decimals: 12,
    forceUnit: '-',
    withZero: false,
    withUnit: false,
  })
  const intl = new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'KSM',
    useGrouping: false,
  })
  return intl.format(Number(magic)).replace(',', '.')
}
