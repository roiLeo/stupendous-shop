<template>
	<div class="flex flex-col justify-center mx-auto h-full max-w-384 w-full p-4">
		<!-- BREADCRUMB HERE -->
		<div>
      <UButton
        variant="ghost"
        icon="i-heroicons-arrow-left"
        aria-label="Back to list"
        to="/"
      >
        {{ $t('action.back_to_list') }}
      </UButton>
		</div>

		<ProductCardDetailsSkeleton v-if="status === 'pending' || status === 'idle'" />
		<UAlert v-else-if="!item" color="error" variant="subtle" title="NFT not found" />
		<ProductCardDetails v-else :item="item" />
	</div>
</template>

<script setup lang="ts">
const route = useRoute()
const { chain, collectionId } = useCollectionSource()

const { data, status } = useFetch(`/api/collection/${collectionId}/nfts/${route.params.id}`, {
  query: { chain },
})
const item = computed(() => (data.value ? toProduct(data.value) : null))
</script>
