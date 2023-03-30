<template>
	<div class="flex flex-col justify-center mx-auto h-full max-w-[1536px] w-full p-4 md:px-10">
		<!-- BREADCRUMB HERE -->
		<div>
			<SfButton type="button" :tag="NuxtLink" to="/" :variant="SfButtonVariant.secondary">
				<template #prefix>
          <SfIconArrowBack />
        </template>
				Back to list
			</SfButton>
		</div>
		<!-- {{ item }} -->

		<ProductCardDetails :item="item" />
	</div>
</template>

<script setup lang="ts">
import { SfButton, SfButtonVariant, SfIconArrowBack } from '@storefront-ui/vue'
import { getClient, extendFields } from '@kodadot1/uniquery'
import { resolveComponent } from 'vue'

const NuxtLink = resolveComponent('NuxtLink')

const route = useRoute()
const id = computed(() => route.params.id)

const client = getClient('bsx')
const query = client.itemById(String(id.value), extendFields(['meta', 'price']))
const { data } = await client.fetch(query)
const item = ref(data.item)
</script>
