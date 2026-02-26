<template>
  <USlideover v-model="open" :title="$t('pages.cart')">
    <UButton
      icon="i-heroicons-shopping-cart"
      size="lg"
      color="neutral"
      variant="ghost"
      aria-label="Cart"
      @click="open = true"
      square
    />

    <template #body>
      <ul class="flex flex-col flex-1 gap-4 overflow-y-scroll">
        <li class="flex gap-4 items-center" v-for="item in cart" :key="item.id">
          <img class="rounded-lg h-16 w-16" :src="imageCache[item.id]" :alt="item.name" :title="item.name" width="64" height="64">
          <div class="flex-1">
            <div class="leading-tight">{{ item.name }}</div>
            <div class="flex mt-1 text-xs"><span class="font-semibold">{{ formatPrice(item.price) }}</span></div>
          </div>
          <UButton
            square
            icon="i-heroicons-trash"
            size="lg"
            color="neutral"
            variant="ghost"
            @click="removeProductFromCart(item)"
          />
        </li>
      </ul>
    </template>

    <template #footer>
      <div class="space-y-4">
        <div class="text-xs">
          <UIcon name="i-heroicons-question-mark-circle" size="xs" /> <strong>{{ $t('messages.close_drawer') }}</strong>
        </div>

        <div>
          <UButton block size="lg" icon="i-heroicons-credit-card" :disabled="!cart.length">
            {{ $t('action.checkout') }} {{ formatPrice(String(total)) }}
          </UButton>
        </div>
      </div>
    </template>
  </USlideover>
</template>

<script lang="ts" setup>
import { useCartStore } from '@/stores/cart'

const open = ref(false)
const cartStore = useCartStore()
const cart = computed(() => cartStore.cart)
const total = computed(() => cartStore.getCartTotal)
const removeProductFromCart = (product: any) => cartStore.removeProductFromCart(product)

const imageCache = reactive<Record<string, string>>({})

watch(() => cart.value, async (items) => {
  for (const item of items) {
    if (!imageCache[item.id]) {
      imageCache[item.id] = await useSanitizeUri(item.meta?.image) || ''
    }
  }
}, { deep: true, immediate: true })
</script>
