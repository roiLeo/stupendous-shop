<template>
  <UButton
    icon="i-heroicons-shopping-cart"
    size="lg"
    color="gray"
    variant="ghost"
    aria-label="Cart"
    @click="open = true"
    square
  />

  <USlideover v-model="open">
    <UCard class="flex flex-col flex-1" :ui="{ body: { base: 'flex-1' }, ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
      <template #header>
        <header class="flex items-center justify-between">
          <div class="flex items-center">
            <UIcon name="i-heroicons-shopping-bag" class="mr-2" /> {{ $t('pages.cart') }}
          </div>
          <UButton
            icon="i-heroicons-x-mark"
            size="lg"
            color="gray"
            variant="ghost"
            @click="open = false"
            square
          />
        </header>
      </template>

      <ul class="flex flex-col flex-1 p-8 gap-4 overflow-y-scroll">
        <li class="flex gap-4 items-center" v-for="item in cart" :key="item.id">
          <img class="rounded-lg h-16 w-16" :src="useSanitizeUri(item.meta?.image)" :alt="item.name" :title="item.name" width="64" height="64">
          <div class="flex-1">
            <div class="leading-tight">{{ item.name }}</div>
            <div class="flex mt-1 text-xs"><span class="font-semibold">{{ formatPrice(item.price) }}</span></div>
          </div>
          <UButton
            square
            icon="i-heroicons-trash"
            size="lg"
            color="gray"
            variant="ghost"
            @click="removeProductFromCart(item)"
          />
        </li>
      </ul>

      <template #footer>
        <div class="p-8 text-xs">
          <UIcon name="i-heroicons-question-mark-circle" size="xs" /> <strong>{{ $t('messages.close_drawer') }}</strong>
        </div>

        <div class="mb-8 px-8">
          <UButton block size="lg" icon="i-heroicons-credit-card" :disabled="!cart.length">
            {{ $t('action.checkout') }} {{ formatPrice(String(total)) }}
          </UButton>
        </div>
      </template>
    </UCard>
  </USlideover>
</template>

<script lang="ts" setup>
import { useCartStore } from '@/stores/cart'

const open = ref(false)
const cartStore = useCartStore()
const cart = computed(() => cartStore.cart)
const total = computed(() => cartStore.getCartTotal)
const removeProductFromCart = (product: any) => cartStore.removeProductFromCart(product)
</script>
