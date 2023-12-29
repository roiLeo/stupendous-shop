<template>
	<div class="flex flex-col justify-center mx-auto h-full max-w-[1536px] w-full p-4">
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

		<ProductCardDetails :item="item" />
	</div>
</template>

<script setup lang="ts">
import { getClient, extendFields } from '@kodadot1/uniquery'

const route = useRoute()
const id = computed(() => route.params.id)
const config = useRuntimeConfig()
const client = getClient(config.public.CHAIN)
const query = client.itemById(String(id.value), extendFields(['meta', 'price']))
const { data } = await client.fetch(query)
const item = ref(data.item)
</script>
