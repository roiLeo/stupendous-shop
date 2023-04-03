<template>
  <SfButton
    type="button"
    variant="tertiary"
    size="sm"
    square
    aria-label="Add to wishlist"
    @click="toggleWishlist">
      <SfIconFavoriteFilled v-if="false" size="sm" class="text-pink-400"/>
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

const isInList = computed(() => console.log(props.product.id))
const isWishlisted = computed(() => {
  // console.log(wishlistStore.wishlist)
  console.log(props.product.id)
  wishlistStore.isInList(props.product.id)
})
// const isWishlisted = computed(() => wishlistStore.isInList.value(props.product.id))
// const toggleWishlist = () => (isWishlisted.value ? wishlistStore.removeFromList({...props.product.id}) : wishlistStore.addToList({...props.product}))
const toggleWishlist = () => {
  wishlistStore.addToList({...props.product})
}
</script>
