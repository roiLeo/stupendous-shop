<template>
  <div class="flex flex-col justify-center mx-auto h-full max-w-384 w-full p-4 md:px-10">
    <h1 class="font-semibold my-4 text-center py-4 text-2xl">{{ $t('pages.wishlist') }}</h1>

    <UPageList divide v-if="wishlist.length">
      <UPageCard
        v-for="(like, index) in wishlist"
        :key="index"
        variant="ghost"
        :to="`/products/${like.id}`"
      >
        <template #body>
          <UUser :name="like.name" :description="like.metadata" :avatar="{ src: imageCache[like.id], alt: like.name }" size="xl" />
        </template>
      </UPageCard>
    </UPageList>

    <div class="flex text-center text-neutral-500 items-center justify-center min-h-150" v-else>
      <p>{{ $t('messages.empty_wishlist') }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useWishlistStore } from '@/stores/wishlist'

const wishlistStore = useWishlistStore()
const wishlist = computed(() => wishlistStore.getWishlist)
wishlistStore.getFromLocalStorage()

const imageCache = reactive<Record<string, string>>({})

watch(() => wishlist.value, async (items) => {
  for (const item of items) {
    if (!imageCache[item.id]) {
      imageCache[item.id] = await useSanitizeUri(item.meta?.image) || ''
    }
  }
}, { deep: true, immediate: true })
</script>
