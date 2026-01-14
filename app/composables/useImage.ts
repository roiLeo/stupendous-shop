const GATEWAYS = [
  'https://bucket.chaotic.art/ipfs/',
  'https://cloudflare-ipfs.com/ipfs/',
  'https://ipfs.io/ipfs/',
  'https://gateway.pinata.cloud/ipfs/',
]

const TEST_CID = 'QmYwAPJzv5CZsnAzt8auVZRnJv3H8n7ZL8zR6xk1H5Z6kH'

let cachedGateway: string | null = null
let gatewayPromise: Promise<string> | null = null

const detectFastestGateway = async (): Promise<string> => {
  if (cachedGateway) return cachedGateway
  if (gatewayPromise) return gatewayPromise

  gatewayPromise = new Promise(async (resolve) => {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 3000)

    const tests = GATEWAYS.map(async (gateway) => {
      const start = performance.now()
      try {
        await fetch(gateway + TEST_CID, {
          method: 'HEAD',
          signal: controller.signal,
        })
        return { gateway, time: performance.now() - start }
      } catch {
        return null
      }
    })

    const results = (await Promise.all(tests))
      .filter(Boolean) as { gateway: string; time: number }[]

    clearTimeout(timeout)

    cachedGateway =
      results?.sort((a, b) => a.time - b.time)[0]?.gateway ??
      GATEWAYS[0]

    resolve(cachedGateway)
  })

  return gatewayPromise
}

export const useSanitizeUri = async (url?: string): Promise<string | null> => {
  if (!url) return null

  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url
  }

  if (url.startsWith('ipfs://')) {
    const cid = url
      .replace('ipfs://', '')
      .replace(/^ipfs\//, '')

    const gateway = await detectFastestGateway()
    console.log(`${gateway}${cid}`)
    return `${gateway}${cid}`
  }

  return null
}
