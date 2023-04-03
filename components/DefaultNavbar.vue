<template>
  <div class="w-full h-full bg-neutral-50">
    <header class="flex justify-center w-full bg-white border-b h-14 md:h-20 border-neutral-200">
      <div class="flex items-center flex-row flex-nowrap justify-start h-full max-w-[1536px] w-full px-4 md:px-10">
        <SfButton class="block !px-2 mr-auto" type="button" variant="tertiary" :tag="NuxtLink" to="/">
          <template #prefix>
            <SfIconHome />
          </template>
          <span class="hidden md:inline-flex">Home</span>
        </SfButton>
        <nav>
          <div class="flex flex-row flex-nowrap">
            <ShoppingCart />
            <NuxtLink to="/wishlist">
              <SfButton
                class="mr-2 -ml-0.5 rounded-md text-primary-700 hover:bg-primary-100 active:bg-primary-200 hover:text-primary-600 active:text-primary-700"
                variant="tertiary"
                square
              >
                <template #prefix>
                  <SfIconFavorite />
                </template>
              </SfButton>
            </NuxtLink>

            <SfButton
              class="hidden lg:inline-flex mr-2 -ml-0.5 text-primary-700 hover:bg-primary-100 active:bg-primary-200 hover:text-primary-600 active:text-primary-700"
              :aria-label="actionItems[0].ariaLabel"
              variant="tertiary"
            >
              <template #prefix>
                <Component :is="actionItems[0].icon" />
              </template>
              Log in
            </SfButton>
          </div>
        </nav>
      </div>
    </header>
  </div>
</template>
<script lang="ts" setup>
import { SfButton, SfIconFavorite, SfIconPerson, SfIconHome } from '@storefront-ui/vue'
import { resolveComponent } from 'vue'

const NuxtLink = resolveComponent('NuxtLink')

const actionItems = [
  {
    label: 'Log in',
    icon: SfIconPerson,
    ariaLabel: 'Log in',
  },
]
</script>
