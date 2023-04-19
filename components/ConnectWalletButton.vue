<!-- <template>
	<SfButton
		class="hidden lg:inline-flex mr-2 -ml-0.5 text-primary-700 hover:bg-primary-100 active:bg-primary-200 hover:text-primary-600 active:text-primary-700"
		aria-label="Log in"
		variant="tertiary"
    @click="fetchWalletsList"
	>
		<template #prefix>
			<SfIconPerson />
		</template>
		{{ $t('action.login') }}
	</SfButton>
</template> -->

<template>
  <SfButton
		class="lg:inline-flex mr-2 -ml-0.5 text-primary-700 hover:bg-primary-100 active:bg-primary-200 hover:text-primary-600 active:text-primary-700"
    aria-label="Connect your Wallet"
		variant="tertiary"
    @click="toggleWalletModal"
	>
		<template #prefix>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="mr-2 -ml-1 w-6 h-5"
        viewBox="0 0 512 512"
      >
        <rect
          x="48"
          y="144"
          width="416"
          height="288"
          rx="48"
          ry="48"
          fill="none"
          stroke="currentColor"
          stroke-linejoin="round"
          stroke-width="32"
        />
        <path
          d="M411.36 144v-30A50 50 0 00352 64.9L88.64 109.85A50 50 0 0048 159v49"
          fill="none"
          stroke="currentColor"
          stroke-linejoin="round"
          stroke-width="32"
        />
        <path d="M368 320a32 32 0 1132-32 32 32 0 01-32 32z" />
      </svg>
		</template>
		{{ $t('action.login') }}
	</SfButton>

  <WalletModal v-show="isWalletModalOpen" @close-modal="toggleWalletModal" />
</template>

<script lang="ts" setup>
import { SfButton, SfIconPerson } from '@storefront-ui/vue'

const { isWalletModalOpen, toggleWalletModal } = useConnectWallet()
</script>
