import { $purify } from '@kodadot1/minipfs'

export const useSanitizeUri = (uri?: string) => {
	return uri ? $purify(uri).at(0) : ''
}
