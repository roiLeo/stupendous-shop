<template>
  <UButton
    size="lg"
    aria-label="Connect your Wallet"
    icon="i-heroicons-wallet"
    :ui="{ rounded: 'rounded-full' }"
    variant="outline"
    @click="toggleWalletModal"
	>
		{{ $t('action.login') }}
	</UButton>

  <WalletModal v-show="isWalletModalOpen" @close-modal="toggleWalletModal" />
</template>

<script lang="ts" setup>
const { isWalletModalOpen, toggleWalletModal } = useConnectWallet()
</script>
