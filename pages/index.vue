<template>
	<div class="flex flex-col justify-center mx-auto h-full max-w-[1536px] w-full p-4 md:px-10">
		<form class="py-5" @submit.prevent="submitInput">
			<SfInput size="lg" aria-label="Label size lg" placeholder="Type your Collection Id" v-model="inputCollectionId">
				<template #suffix><SfIconSearch /></template>
			</SfInput>
		</form>

		<!-- {{ items }} -->
		<div class="grid grid-cols-4 gap-4 md:grid-cols-6">
			<ProductCard v-for="item in items" :key="item.id" :item="item" />
		</div>
	</div>
</template>

<script setup lang="ts">
import { SfInput, SfIconSearch } from '@storefront-ui/vue'
import { extendFields, getClient } from '@kodadot1/uniquery'

// 945672150
const inputCollectionId = ref('')

const fetchBsxCollection = async (collectionId?: string) => {
	const client = getClient('bsx')
	const query = client.itemListByCollectionId(collectionId || '1825819407', {
		fields: extendFields(['meta', 'price']),
		orderBy: 'createdAt_ASC',
	})
	const { data } = await client.fetch(query)
	return data.items
}

const items = ref(await fetchBsxCollection())

const submitInput = async () => {
	items.value = await fetchBsxCollection(inputCollectionId.value)
}
</script>