<template>
  <header class="bg-background/75 backdrop-blur border-b border-neutral-200 dark:border-neutral-800 -mb-px sticky top-0 z-50">
    <div class="mx-auto flex items-center justify-between gap-3 h-16 max-w-[1536px] w-full">
      <UButton
        square
        icon="i-heroicons-home"
        size="lg"
        color="neutral"
        variant="ghost"
        aria-label="Heart"
        to="/"
      >
        <span class="hidden md:inline-flex">{{ $t('pages.home') }}</span>
      </UButton>
      <nav>
        <div class="flex items-center justify-end lg:flex-1 gap-1.5">
          <LocaleSwitcher />

          <UButton
            square
            size="lg"
            icon="i-heroicons-heart"
            color="neutral"
            variant="ghost"
            aria-label="Heart"
            to="/wishlist"
          />

          <ShoppingCart />
          <ThemeButton />

          <ConnectWalletButton v-if="account === '' || !account" />
          <ProfileDropdownButton v-else />
        </div>
      </nav>
    </div>
  </header>
</template>

<script lang="ts" setup>
const { account } = useConnectWallet()
</script>
