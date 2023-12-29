<template>
	<!-- Main modal -->
  <UModal>
    <UCard>
      <template #header>
        <div class="flex items-center justify-between">
          <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
            {{ $t('action.login') }}
          </h3>
          <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="$emit('close-modal')" />
        </div>
      </template>

      <!-- Modal body -->
      <div v-show="!hasSelectedWalletProvider">
        <p class="text-sm text-center font-normal text-gray-500">
          Connect with one of our available wallet providers or
          create a new one.
        </p>

        <ul class="my-4 space-y-3">
          <li v-for="(wallet, idx) in wallets" :key="idx">
            <a
              href="#"
              @click="setWallet(wallet)"
              class="flex items-center p-3 text-base font-bold text-gray-900 bg-gray-50 rounded-lg hover:bg-gray-100 group hover:shadow"
            >
              <img
                class="w-4"
                :src="wallet.img"
                :alt="wallet.name"
                :title="wallet.name"
              />
              <span class="flex-1 ml-3 whitespace-nowrap">
                {{ wallet.name }}
              </span>
              <span
                v-show="wallet.isPopular"
                class="inline-flex items-center justify-center px-2 py-0.5 ml-3 text-xs font-medium text-gray-500 bg-gray-200 rounded"
              >
                Popular
              </span>
            </a>
          </li>
        </ul>

      </div>

      <div v-show="hasSelectedWalletProvider && hasWalletProviderExtension">
        <p
          class="text-sm font-normal text-gray-500"
          v-if="selectedWalletProvider"
        >
          Choose your
          <img
            class="w-4"
            style="display: inline-block;vertical-align: middle;"
            :src="selectedWalletProvider.img"
          />&nbsp;
          <b>{{ selectedWalletProvider.extensionName }}</b>
          account
        </p>

        <!-- Wallet accounts -->
        <select
          class="my-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-3 py-2 form-select appearance-none block"
          v-model="selectedAccount"
          @change="setAccount(selectedAccount)"
        >
          <option selected disabled>Select an account</option>
          <option
            v-for="option in walletAccounts"
            :key="option.address"
            :value="option.address"
          >
            <b v-if="option.name">{{ option.name }}:</b>
            {{ shortAddress(option.address) }}
          </option>
        </select>
      </div>

      <template #footer>
        <div>
          <a
            href="#"
            class="inline-flex items-center text-xs font-normal text-gray-500 hover:underline"
          >
            <UIcon name="i-heroicons-question-mark-circle" size="xs" class="mr-2" />
            Why do I need to connect with my wallet?</a
          >
        </div>
      </template>
    </UCard>
  </UModal>
</template>

<script lang="ts" setup>
const {
  account,
  setAccount,
  wallets,
  selectedWalletProvider,
  setWallet,
  hasEnabledWalletProvider,
  hasSelectedWalletProvider,
  hasWalletProviderExtension,
  walletAccounts
} = useConnectWallet()

const selectedAccount = ref('')

watchEffect(() => {
	// wallets.value = SupportedWallets.map((wallet) => {
	// 	const { isMobileApp, isBrowserExtension } = wallet
	// 	if (isMobileDevice) {
	// 		return isMobileApp ? wallet : null
	// 	} else {
	// 		return isBrowserExtension ? wallet : null
	// 	}
	// }).filter((wallet) => wallet !== null) as Wallet[]
})
</script>
