<template>
  <SfDropdown v-model="isOpen" :placement="SfPopoverPlacement['bottom-start']">
    <template #trigger>
      <SfButton
        class="mr-2 -ml-0.5 rounded-md text-primary-700 hover:bg-primary-100 active:bg-primary-200 hover:text-primary-600 active:text-primary-700"
        variant="tertiary"
        square
        @click="toggle()"
      >
        <template #prefix>
          <Polkadot size="24" theme="polkadot" :address="account" class="avatar" />
        </template>
        {{ shortAddress(account) }}
      </SfButton>
    </template>
    <ul class="p-2 rounded bg-neutral-100">
      <li><SfButton type="button" variant="tertiary" @click="resetAccount()"> Log out </SfButton></li>
      <li><SfButton type="button" variant="tertiary"> Settings </SfButton></li>
    </ul>
  </SfDropdown>
</template>

<script lang="ts" setup>
import { SfButton, SfDropdown, useDisclosure, SfPopoverPlacement } from '@storefront-ui/vue'
const { isOpen, toggle } = useDisclosure()
const { account, resetAccount } = useConnectWallet()
</script>
