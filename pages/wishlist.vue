<template>
  <div class="flex flex-col justify-center mx-auto h-full max-w-[1536px] w-full p-4 md:px-10">
    <h1 class="border-b font-semibold my-4 text-center py-4 text-2xl">{{ $t('pages.wishlist') }}</h1>

    <client-only placeholder="Loading...">
      <div class="mx-auto text-center" v-if="wishlist.length">
        <NuxtLink :to="`/products/${like.id}`" v-for="like in wishlist" :key="like.id">
          <SfListItem class="max-w-md">
            <template #prefix>
              <SfThumbnail size="xl">
                <img :src="useSanitizeUri(like.meta.image)" alt="Thumbnail avatar" />
              </SfThumbnail>
            </template>
            <div class="break-words">{{ like.name }}</div>
            <span class="text-xs text-neutral-500 break-words truncate">
              {{ like.metadata }}
            </span>
          </SfListItem>
        </NuxtLink>
      </div>
      <div class="flex text-center text-gray-500 items-center justify-center min-h-[600px]" v-else>
        <p>{{ $t('messages.empty_wishlist') }}</p>
      </div>
    </client-only>

  </div>
</template>

<script setup lang="ts">
import { SfListItem, SfThumbnail } from '@storefront-ui/vue'
import { useWishlistStore } from '@/stores/wishlist'

const wishlistStore = useWishlistStore()
const wishlist = computed(() => wishlistStore.getWishlist)
wishlistStore.getFromLocalStorage()
</script>
