<template>
	<div class="flex flex-col justify-center mx-auto h-full max-w-[1536px] w-full p-4 md:px-10">
		<!-- BREADCRUMB HERE -->
		<div>
			<SfButton type="button" tag="a" href="/" :variant="SfButtonVariant.secondary">
				<template #prefix>
	        		<SfIconArrowBack />
	      		</template>
				Retour à la liste 
			</SfButton>
		</div>
		{{ item }}

		<ProductCardDetails :item="item" />
	</div>
</template>

<script setup lang="ts">
import { SfButton, SfButtonVariant, SfIconArrowBack } from '@storefront-ui/vue'
import { getClient, extendFields } from '@kodadot1/uniquery'

const route = useRoute()
const id = computed(() => route.params.id)

const client = getClient('bsx')
const query = client.itemById(String(id.value), extendFields(['meta', 'price']))
const { data } = await client.fetch(query)
const item = ref(data.item)
</script>