import { ApiFactory } from '@kodadot1/sub-api'

export default function () {

  const apiUrl = computed(() => {
    const endpoint: string = 'wss://basilisk-rococo-rpc.play.hydration.cloud'
    return endpoint
  })

  const apiInstance = computed(() =>
    ApiFactory.useApiInstance(apiUrl.value)
  )

  return {
    apiUrl,
    apiInstance,
  }
}
