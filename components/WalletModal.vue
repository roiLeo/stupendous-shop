<template>
	<!-- Main modal -->
	<div
		ref="modal-backdrop"
		class="overflow-y-auto overflow-x-hidden w-full h-full fixed right-0 left-0 top-4 z-50 justify-center items-center h-modal md:h-full md:inset-0 bg-black bg-opacity-50"
		aria-modal="true"
		role="dialog"
	>
		<div class="relative px-4 w-full max-w-md h-full md:h-auto m-auto">
			<!-- Modal content -->
			<div
				class="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow w-full max-w-md"
			>
				<!-- Modal header -->
				<div
					class="flex justify-between items-center py-4 px-6 rounded-t border-b"
				>
					<button
						type="button"
						class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 mr-4 inline-flex items-center"
						@click="hasSelectedWalletProvider = false"
						v-show="hasSelectedWalletProvider"
					>
						<svg
							class="w-5 h-5"
							fill="currentColor"
							viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								fill-rule="evenodd"
								d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
								clip-rule="evenodd"
							></path>
						</svg>
					</button>
					<h3
						class="text-base font-semibold text-gray-900 lg:text-xl"
					>
						Connect wallet
					</h3>
					<button
						type="button"
						class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
						@click="$emit('close-modal')"
					>
						<svg
							class="w-5 h-5"
							fill="currentColor"
							viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								fill-rule="evenodd"
								d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
								clip-rule="evenodd"
							></path>
						</svg>
					</button>
				</div>

				<!-- Modal body -->
				<div class="p-6" v-show="!hasSelectedWalletProvider">
					<p
						class="text-sm text-center font-normal text-gray-500"
					>
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

					<div>
						<a
							href="#"
							class="inline-flex items-center text-xs font-normal text-gray-500 hover:underline"
						>
							<svg
								class="mr-2 w-3 h-3"
								aria-hidden="true"
								focusable="false"
								data-prefix="far"
								data-icon="question-circle"
								role="img"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 512 512"
							>
								<path
									fill="currentColor"
									d="M256 8C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm0 448c-110.532 0-200-89.431-200-200 0-110.495 89.472-200 200-200 110.491 0 200 89.471 200 200 0 110.53-89.431 200-200 200zm107.244-255.2c0 67.052-72.421 68.084-72.421 92.863V300c0 6.627-5.373 12-12 12h-45.647c-6.627 0-12-5.373-12-12v-8.659c0-35.745 27.1-50.034 47.579-61.516 17.561-9.845 28.324-16.541 28.324-29.579 0-17.246-21.999-28.693-39.784-28.693-23.189 0-33.894 10.977-48.942 29.969-4.057 5.12-11.46 6.071-16.666 2.124l-27.824-21.098c-5.107-3.872-6.251-11.066-2.644-16.363C184.846 131.491 214.94 112 261.794 112c49.071 0 101.45 38.304 101.45 88.8zM298 368c0 23.159-18.841 42-42 42s-42-18.841-42-42 18.841-42 42-42 42 18.841 42 42z"
								></path>
							</svg>
							Why do I need to connect with my wallet?</a
						>
					</div>
				</div>

				<div
					class="p-6"
					v-show="
						hasSelectedWalletProvider && hasWalletProviderExtension
					"
				>
					<p
						class="text-sm font-normal text-gray-500"
						v-if="selectedWalletProvider"
					>
						Choose your
						<img
							class="w-4"
							style="display: inline-block;vertical-align: middle;"
							:src="selectedWalletProvider.img"
						/>
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
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { SupportedWallets, Wallet, WalletAccount } from '@/utils/wallets'

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
