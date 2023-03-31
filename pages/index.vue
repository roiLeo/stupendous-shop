<template>
	<div class="flex flex-col justify-center mx-auto h-full max-w-[1536px] w-full p-4 md:px-10">
		<form class="py-5" @submit.prevent="submitInput">
			<SfInput size="lg" aria-label="Label size lg" placeholder="Type your Collection Id" v-model="inputCollectionId">
				<template #suffix><SfIconSearch /></template>
			</SfInput>
		</form>

		<!-- {{ items }} -->
		<div class="grid lg:grid-cols-6 md:grid-cols-4 xs:grid-cols-2 gap-4">
			<ProductCard v-for="item in items" :key="item.id" :item="item" />
		</div>
	</div>
</template>

<script setup lang="ts">
import { SfInput, SfIconSearch } from '@storefront-ui/vue'
import { useProductsStore } from '@/stores/products'

const productsStore = useProductsStore()
const inputCollectionId = ref('') // 945672150

await useAsyncData('products', () => productsStore.fetchItems())

const items = computed(() => productsStore.getItems)

const submitInput = async () => {
  productsStore.setCollectionId(inputCollectionId.value)
  await useAsyncData('products', () => productsStore.fetchItems())
}
</script>
