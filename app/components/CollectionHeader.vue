<template>
  <CollectionHeaderSkeleton v-if="!collection" />
  <div v-else class="flex flex-col">
    <div class="flex flex-col gap-4 my-6">
      <div class="flex flex-col gap-4">
        <div class="relative h-27 w-27">
          <div class="aspect-square overflow-hidden rounded-[18%]">
            <div class="relative h-full w-full">
              <img v-if="image" class="m-0 p-0" :src="image">
              <USkeleton v-else class="h-full w-full" />
            </div>
          </div>
        </div>
        <div class="flex flex-wrap items-center justify-between gap-4 md:flex-nowrap md:justify-start">
          <h2 class="heading mb-2 max-w-100 text-4xl font-normal md:max-w-none">
            {{ collection.metadata?.name }}
            <UIcon name="i-heroicons-check-badge" class="shrink-0 h-4 w-4 text-blue-500 ms-auto" />
          </h2>
        </div>
      </div>
      <div class="mb-3 flex max-w-[640px] flex-wrap items-center gap-1 self-start leading-normal">
        <div class="text-neutral-600 dark:text-neutral-400">{{ $t('text.created_by') }}</div>
        <a class="flex font-medium"
           :href="`https://beta.chaotic.art/${config.public.CHAIN}/u/${collection.details.owner}`">
          <Polkadot size="24" theme="polkadot" :address="collection.details.owner" class="mx-2" />
          <div class="hover:underline focus:underline">{{ shortAddress(collection.details.owner) }}</div>
        </a>
      </div>
      <div class="flex max-w-[600px] flex-col gap-6 ">
        <div class="max-w-[600px] whitespace-pre-line leading-relaxed text-neutral-500">
          {{ metaDescription }}
          <UButton
            v-if="hasMaxDescriptionLength"
            size="sm"
            color="primary"
            variant="link"
            :label="!toggleShowMore ? 'Show more' : 'Show less'"
            @click="toggleShowMore = !toggleShowMore"
          />
        </div>

        <!-- TODO: custom links -->
      </div>
    </div>

    <div class="mt-1 flex w-full flex-wrap items-center gap-6 xl:justify-end">
      <div class="flex flex-row items-center gap-2">
        <div class="leading-6 tracking-wide">{{ collection.stats.floor ? formatPrice(collection.stats.floor) : '—' }}</div>
        <div class="text-neutral-500">Floor price</div>
      </div>
      <div class="flex flex-row items-center gap-2">
        <div class="leading-6 tracking-wide">{{ collection.stats.owners }}</div>
        <div class="text-neutral-500">Owners</div>
      </div>
      <div class="flex flex-row items-center gap-2">
        <div class="leading-6 tracking-wide">{{ collection.details.items }}</div>/
        <div class="leading-6 tracking-wide">{{ collection.config.maxSupply || '∞' }}</div>
        <div class="text-neutral-500">Items</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const MAX_CHARS = 240

const config = useRuntimeConfig()

const { chain, collectionId } = useCollectionSource()
const { data: collection } = useFetch(`/api/collection/${collectionId}`, { query: { chain }, key: 'collection' })

const meta = computed(() => collection.value?.metadata ?? {})
const image = ref<string | null>(null)
watch(meta, async (m) => { image.value = await useSanitizeUri(m.image) }, { immediate: true })

const toggleShowMore = ref(false)
const hasMaxDescriptionLength = computed(() => (meta.value.description?.length || 0) > MAX_CHARS)
const metaDescription = computed(() => hasMaxDescriptionLength.value && !toggleShowMore.value ? meta.value.description?.slice(0, MAX_CHARS)+ '...' : meta.value.description)
</script>
