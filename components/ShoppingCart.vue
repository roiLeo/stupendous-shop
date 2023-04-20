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
        <li class="flex gap-4 items-center" v-for="item in cart" :key="item.id">
          <img class="rounded-lg h-16 w-16" :src="useSanitizeUri(item.meta?.image)" :alt="item.name" :title="item.name" loading="lazy" width="64" height="64">
          <div class="flex-1">
            <div class="leading-tight">{{ item.name }}</div>
            <div class="flex mt-1 text-xs"><span class="font-semibold">{{ formatPrice(item.price) }}</span></div>
          </div>
          <SfButton square variant="secondary" @click="removeProductFromCart(item)">
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
          {{ $t('action.checkout') }} {{ formatPrice(String(total)) }}
        </SfButton>
      </div>
    </SfDrawer>
  </transition>
</template>

<script lang="ts" setup>
import { SfDrawer, SfDrawerPlacement, SfIconShoppingCart, SfButton, SfIconHelp, SfIconShoppingCartCheckout, SfIconClose, SfIconDelete, useTrapFocus } from '@storefront-ui/vue'
import { useCartStore } from '@/stores/cart'

const placement = ref<SfDrawerPlacement>(SfDrawerPlacement.right)
const open = ref(false)
const drawerRef = ref()
const cartStore = useCartStore()
const cart = computed(() => cartStore.cart)
const total = computed(() => cartStore.getCartTotal)
const removeProductFromCart = (product: any) => cartStore.removeProductFromCart(product)

useTrapFocus(drawerRef, { activeState: open })
</script>
