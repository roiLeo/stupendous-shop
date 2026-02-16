<template>
	<div>

    <CollectionHeader />

    <!-- TODO: search & filters  -->
		<!-- <form class="py-5" @submit.prevent="submitInput">
      <SearchInput v-model="inputCollectionId" />
		</form> -->

		<!-- {{ items }} -->
		<div class="grid lg:grid-cols-5 md:grid-cols-4 grid-cols-2 gap-4 py-4">
			<ProductCard v-for="item in items" :key="item.id" :item="item" />
		</div>
	</div>
</template>

<script setup lang="ts">
import { useProductsStore } from '@/stores/products'

const productsStore = useProductsStore()
const inputCollectionId = ref('') // 945672150

await callOnce('products', () => productsStore.fetchItems())

const items = computed(() => productsStore.getItems)

const submitInput = async () => {
  productsStore.setCollectionId(inputCollectionId.value)
  await useAsyncData('products', () => productsStore.fetchItems())
}
</script>
