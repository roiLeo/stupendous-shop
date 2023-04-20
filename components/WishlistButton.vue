<template>
  <SfButton
    type="button"
    variant="tertiary"
    size="sm"
    square
    aria-label="Add to wishlist"
    @click="toggleWishlist">
      <SfIconFavoriteFilled v-if="isInList" size="sm" class="text-pink-400"/>
      <SfIconFavorite v-else size="sm" class="text-pink-200" />
  </SfButton>
</template>

<script setup lang="ts">
import { SfButton, SfIconFavorite, SfIconFavoriteFilled } from '@storefront-ui/vue'
import { useWishlistStore } from '@/stores/wishlist'

const wishlistStore = useWishlistStore()
const props = defineProps({
  product: { type: Object, required: true },
})

const isInList = computed(() => wishlistStore.isInList(props.product))
const toggleWishlist = () => (isInList.value ? wishlistStore.removeFromList(props.product) : wishlistStore.addToList(props.product))
</script>
