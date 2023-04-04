<template>
  <SfButton type="button" @click="open = true"
    class="mr-2 -ml-0.5 rounded-md text-primary-700 hover:bg-primary-100 active:bg-primary-200 hover:text-primary-600 active:text-primary-700"
    variant="tertiary"
    square>
    <template #prefix>
      <SfIconShoppingCart />
    </template>
  </SfButton>

  <transition
    enter-active-class="transition duration-500 ease-in-out"
    leave-active-class="transition duration-500 ease-in-out"
    enter-from-class="translate-x-full"
    enter-to-class="-translate-x-0"
    leave-from-class="-translate-x-0"
    leave-to-class="translate-x-full"
  >
    <SfDrawer
      ref="drawerRef"
      class="bg-neutral-50 border border-gray-300 flex flex-col z-10"
      v-model="open"
      :placement="placement"
      :class="{ 'max-w-[370px]': placement === SfDrawerPlacement.left || placement === SfDrawerPlacement.right }"
    >
      <header class="flex items-center justify-between px-8 py-5">
        <div class="flex items-center">
          <SfIconShoppingCartCheckout class="mr-4" /> {{ $t('pages.cart') }}
        </div>
        <SfButton square variant="tertiary" @click="open = false">
          <SfIconClose />
        </SfButton>
      </header>

      <ul class="flex flex-col flex-1 p-8 gap-4 overflow-y-scroll">
        <li class="flex gap-4 items-center">
          <img class="rounded-lg h-16 w-16" src="https://placehold.co/150x150" alt="Album XYZ #4" title="Album XYZ #4" loading="lazy" width="64" height="64">
          <div class="flex-1">
            <div class="leading-tight">Album XYZ #4</div>
            <div class="flex mt-1 text-xs"><span class="font-semibold">300.00 €</span></div>
          </div>
          <SfButton square variant="secondary" @click="open = false">
            <SfIconDelete />
          </SfButton>
        </li>
      </ul>


      <div class="p-8">
        <SfIconHelp size="xs" /> <strong>{{ $t('messages.close_drawer') }}</strong>
      </div>

      <div class="mb-8 px-8">
        <SfButton type="button" size="lg" class="w-full">
          <template #prefix>
            <SfIconShoppingCart size="sm" />
          </template>
          {{ $t('action.checkout') }} {{ 420 }} €
        </SfButton>
      </div>
    </SfDrawer>
  </transition>
</template>

<script lang="ts" setup>
import { SfDrawer, SfDrawerPlacement, SfIconShoppingCart, SfButton, SfIconHelp, SfIconShoppingCartCheckout, SfIconClose, SfIconDelete, useTrapFocus } from '@storefront-ui/vue'

const placement = ref<`${SfDrawerPlacement}`>('right')
const open = ref(false)
const drawerRef = ref()

useTrapFocus(drawerRef, { activeState: open })
</script>
