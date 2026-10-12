<template>
	<div>
		<CollectionHeader />

		<div class="grid lg:grid-cols-5 md:grid-cols-4 grid-cols-2 gap-4 py-4">
			<template v-if="status === 'pending' || !data">
				<ProductCardSkeleton v-for="n in 10" :key="n" />
			</template>
			<ProductCard v-else v-for="item in items" :key="item.id" :item="item" />
		</div>

		<UPagination v-if="total > pageSize" v-model:page="page" :total="total" :items-per-page="pageSize" />
	</div>
</template>

<script setup lang="ts">
const { chain, collectionId } = useCollectionSource()
const pageSize = 20
const page = ref(1)

const { data, status } = useFetch(`/api/collection/${collectionId}/nfts`, {
  query: { chain, page, pageSize },
  key: 'collection-nfts',
})

const total = computed(() => data.value?.total ?? 0)
const items = computed(() => (data.value?.nfts ?? []).map(toProduct))
</script>
