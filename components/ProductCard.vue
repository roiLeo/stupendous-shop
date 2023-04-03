<template>
	<div class="border border-neutral-200 rounded-md hover:shadow-lg max-w-[300px]">
		<div class="relative">
			<SfLink :tag="NuxtLink" :to="`/products/${item.id}`">
				<img class="block object-cover h-auto rounded-md aspect-square"
          :src="image"
          :alt="item.name"
          :width="300"
          :height="300" />
			</SfLink>

      <WishlistButton
        :product="item"
        class="absolute bottom-0 right-0 mr-2 mb-2 bg-white border border-neutral-200 !rounded-full"
      />
		</div>
		<div class="p-4 border-t border-neutral-200">
			<SfLink :tag="NuxtLink" :to="`/products/${item.id}`" variant="secondary" class="no-underline">
        {{ item.name }}
      </SfLink>

			<!-- <div class="flex items-center pt-1">
				<SfRating size="xs" :value="5" :max="5" />

				<SfLink :tag="NuxtLink" :to="`/products/${item.id}`" variant="secondary" class="pl-1 no-underline">
					<SfCounter size="xs">123</SfCounter>
				</SfLink>
			</div> -->

			<p class="block py-2 font-normal leading-5 typography-text-sm text-neutral-700">
				{{ description }}
			</p>
			<span class="block pb-2 font-bold typography-text-lg" v-if="price">${{ price }}</span>
			<SfButton type="button" size="sm" v-if="!hasOwner">
				<template #prefix>
					<SfIconShoppingCart size="sm" />
				</template>
				Add to cart
			</SfButton>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { SfRating, SfCounter, SfLink, SfButton, SfIconShoppingCart, SfIconFavorite } from '@storefront-ui/vue'
import { resolveComponent } from 'vue'

const NuxtLink = resolveComponent('NuxtLink')
const props = defineProps(['item'])
const metadata = useSanitizeUri(props.item.metadata)
const image = useSanitizeUri(props.item.meta?.image)
const price = ref(props.item.meta?.price)
const description = ref(props.item.meta?.description)
const hasOwner = ref(props.item.currentOwner)

// { "id": "1825819407-57", "createdAt": "2022-12-05T08:42:06.595000Z", "name": "KoDragon#55", "metadata": "ipfs://ipfs/bafkreie7mgymfpy7oiyz2v2sd5utwb44fcvutrveqrkswieg2cpm7evsqm", "currentOwner": "bXkSjdJoRueC7TCPVs4LAVFa8BiPNwZPZXsfzHdt95MSL2NMp", "issuer": "bXmx9pNXZw6dYkwaoafJyTrAZVQ1znGq8boJHC2MfQwgGLxPz" }
</script>
