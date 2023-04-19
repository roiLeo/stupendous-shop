<template>
  <div>{{ account }}</div>
</template>

<script setup lang="ts">
import { useAccountStore } from '@/stores/account'
// const { account } = useConnectWallet()

const accountStore = useAccountStore()
const account = computed(() => accountStore.getAccount)
</script>
