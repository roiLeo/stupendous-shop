<template>
  <div class="flex flex-col">
    <div class="flex flex-col gap-4 my-6">
      <div class="flex flex-col gap-4">
        <div class="relative h-[108px] w-[108px]">
          <div class="aspect-square overflow-hidden rounded-[18%]">
            <div class="relative h-full w-full">
              <img class="m-0 bg-background-subdued p-0" :src="image" loading="lazy">
            </div>
          </div>
        </div>
        <div class="flex flex-wrap items-center justify-between gap-4 md:flex-nowrap md:justify-start">
          <h2 class="heading mb-2 max-w-[400px] text-4xl font-normal md:max-w-none">
            {{ collection.name }}
            <UIcon name="i-heroicons-check-badge" class="flex-shrink-0 h-4 w-4 text-blue-500 ms-auto" />
          </h2>
        </div>
      </div>
      <div class="mb-3 flex max-w-[640px] flex-wrap items-center gap-1 self-start leading-normal">
        <div class="text-text-subdued">Created by</div>
        <a class="flex font-medium"
           :href="`https://beta.kodadot.xyz/${config.public.CHAIN}/u/${collection.issuer}`">
          <Polkadot size="24" theme="polkadot" :address="collection.issuer" class="mx-2" />
          <div class="hover:underline focus:underline">{{ shortAddress(collection.issuer) }}</div>
        </a>
      </div>
      <div class="flex max-w-[600px] flex-col gap-6 ">
        <div class="max-w-[600px] whitespace-pre-line leading-relaxed text-neutral-500">
          {{ meta.description }}
        </div>

        <!-- TODO: custom links -->
      </div>
    </div>

    <div class="mt-1 flex w-full flex-wrap items-center gap-6 xl:justify-end">
      <div class="flex flex-row items-center gap-2">
        <div class="leading-6 tracking-wide">{{ formatPrice(collection.volume) }}</div>
        <div class="text-neutral-500">Volume</div>
      </div>
      <div class="flex flex-row items-center gap-2">
        <div class="leading-6 tracking-wide">{{ formatPrice(collection.floor) }}</div>
        <div class="text-neutral-500">Floor price</div>
      </div>
      <!-- <div class="flex flex-row items-center gap-2">
        <div class="leading-6 tracking-wide">9</div>
        <div class="text-neutral-500">Listed</div>
      </div> -->
      <div class="flex flex-row items-center gap-2">
        <div class="leading-6 tracking-wide">{{ collection.ownerCount }}</div>
        <div class="text-neutral-500">Owners</div>
      </div>
      <div class="flex flex-row items-center gap-2">
        <div class="leading-6 tracking-wide">{{ collection.nftCount }}</div>
        <div class="text-neutral-500">Items</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useProductsStore } from '@/stores/products'

const productsStore = useProductsStore()
const config = useRuntimeConfig()

await useAsyncData('collection', () => productsStore.fetchCollection())

const collection = computed(() => productsStore.getCollection)
const meta = ref(collection.value.meta)
const image = useSanitizeUri(meta.value.image)
</script>
