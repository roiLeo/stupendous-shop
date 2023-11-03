<template>
  <header class="flex justify-center w-full h-14 md:h-20">
    <div class="flex items-center flex-row flex-nowrap justify-start h-full max-w-[1536px] w-full">
      <UButton
        class="block !px-2 mr-auto"
        icon="i-heroicons-home"
        size="lg"
        color="gray"
        variant="ghost"
        aria-label="Heart"
        to="/"
      >
        <span class="hidden md:inline-flex">{{ $t('pages.home') }}</span>
      </UButton>
      <nav>
        <div class="flex flex-row flex-nowrap">
          <LocaleSwitcher class="mx-2" />
          <ThemeButton />
          <ShoppingCart />

          <UButton
            size="lg"
            icon="i-heroicons-heart"
            color="gray"
            variant="ghost"
            aria-label="Heart"
            to="/wishlist"
          />

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
