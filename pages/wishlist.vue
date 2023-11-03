<template>
  <div class="flex flex-col justify-center mx-auto h-full max-w-[1536px] w-full p-4 md:px-10">
    <h1 class="border-b font-semibold my-4 text-center py-4 text-2xl">{{ $t('pages.wishlist') }}</h1>

    <client-only placeholder="Loading...">
      <!-- Grid -->
      <div class="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6" v-if="wishlist.length">
        <!-- Card -->
        <NuxtLink class="group flex flex-col bg-white border shadow-sm rounded-xl hover:shadow-md transition dark:bg-slate-900 dark:border-gray-800" :to="`/products/${like.id}`" v-for="like in wishlist" :key="like.id">
          <div class="p-4 md:p-5">
            <div class="flex justify-between items-center">
              <div class="mr-4">
                <UAvatar
                  size="lg"
                  :src="useSanitizeUri(like.meta.image)"
                  :alt="like.name"
                />
              </div>
              <div class="truncate">
                <h3 class="group-hover:text-purple-600 font-semibold text-gray-800 dark:group-hover:text-gray-400 dark:text-gray-200">
                  {{ like.name }}
                </h3>
                <p class="truncate text-sm text-gray-500">
                  {{ like.metadata }}
                </p>
              </div>
              <div class="pl-3">
                <svg class="w-3.5 h-3.5 text-gray-500" width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M5.27921 2L10.9257 7.64645C11.1209 7.84171 11.1209 8.15829 10.9257 8.35355L5.27921 14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
              </div>
            </div>
          </div>
        </NuxtLink>
        <!-- End Card -->
      </div>
      <!-- End Grid -->
      <div class="flex text-center text-gray-500 items-center justify-center min-h-[600px]" v-else>
        <p>{{ $t('messages.empty_wishlist') }}</p>
      </div>
    </client-only>

  </div>
</template>

<script setup lang="ts">
import { useWishlistStore } from '@/stores/wishlist'

const wishlistStore = useWishlistStore()
const wishlist = computed(() => wishlistStore.getWishlist)
wishlistStore.getFromLocalStorage()
</script>
