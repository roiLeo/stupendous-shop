<template>
  <WalletModal v-model="isWalletModalOpen" @close-modal="toggleWalletModal" />
</template>

<script lang="ts" setup>
const { isWalletModalOpen, toggleWalletModal } = useConnectWallet()
</script>
