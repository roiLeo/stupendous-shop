<template>
  <UDropdownMenu
    :items="items"
    :popper="{ placement: 'bottom-start' }"
  >
    <UButton aria-label="your Wallet" color="neutral" variant="ghost" square size="lg">
      <Polkadot size="24" theme="polkadot" :address="account" class="avatar" />
    </UButton>
    <template #account="{ item }">
      <div class="text-left truncate">
        <p>Signed in as</p>
        <p class="truncate font-medium text-neutral-900 dark:text-white">
          {{ shortAddress(item.label) }}
        </p>
      </div>
    </template>

    <template #item="{ item }">
      <span class="truncate">{{ item.label }}</span>

      <UIcon
        :name="item.icon"
        class="flex-shrink-0 h-4 w-4 text-neutral-400 dark:text-neutral-500 ms-auto"
      />
    </template>
  </UDropdownMenu>
</template>

<script lang="ts" setup>
const { account, resetAccount } = useConnectWallet()
const items = [
  [
    {
      label: account.value,
      slot: 'account',
      disabled: true,
    },
  ],
  [
    {
      label: 'Settings',
      icon: 'i-heroicons-cog-8-tooth',
    },
  ],
  [
    {
      label: 'Documentation',
      icon: 'i-heroicons-book-open',
      to: 'https://github.com/roiLeo/stupendous-shop#nft-shop'
    },
    {
      label: 'Status',
      icon: 'i-heroicons-signal',
    },
  ],
  [
    {
      label: 'Sign out',
      icon: 'i-heroicons-arrow-left-on-rectangle',
      click: () => resetAccount()
    },
  ],
]
</script>
