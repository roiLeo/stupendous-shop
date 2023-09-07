<template>
  <UButton
    variant="ghost"
    :ui="{ rounded: 'rounded-full bg-white' }"
    :icon="isInList ? 'i-heroicons-heart-20-solid' : 'i-heroicons-heart'"
    aria-label="Add to wishlist"
    @click="toggleWishlist"
  />
</template>

<script setup lang="ts">
import { useWishlistStore } from '@/stores/wishlist'

const wishlistStore = useWishlistStore()
const props = defineProps({
  product: { type: Object, required: true },
})

const isInList = computed(() => wishlistStore.isInList(props.product))
const toggleWishlist = () => (isInList.value ? wishlistStore.removeFromList(props.product) : wishlistStore.addToList(props.product))
</script>
