<template>
	<div class="border border-gray-200 dark:border-gray-700 rounded-md hover:shadow-lg max-w-[300px]">
		<div class="relative">
      <nuxt-link :to="`/products/${item.id}`">
				<img class="block object-cover h-auto rounded-md aspect-square"
          :src="image"
          :alt="item.name"
          :width="300"
          :height="300"
          loading="lazy"
        />
      </nuxt-link>

      <WishlistButton
        :product="item"
        class="absolute bottom-0 right-0 mr-2 mb-2 border border-gray-200 dark:border-gray-700 !rounded-full"
      />
		</div>
		<div class="p-4 border-t border-gray-200 dark:border-gray-700">
      <nuxt-link :to="`/products/${item.id}`">
        {{ item.name }}
      </nuxt-link>

			<p class="block py-2 font-normal leading-5 typography-text-sm text-neutral-700">
				{{ description }}
			</p>
			<span class="block pb-2 font-bold typography-text-lg" v-if="price > 0">{{ formatPrice(price) }}</span>
      <UButton
        block
        class="my-12"
        size="sm"
        icon="i-heroicons-shopping-cart"
        v-if="!hasOwner"
      >
        {{ $t('action.add_to_cart') }}
      </UButton>
		</div>
	</div>
</template>

<script lang="ts" setup>
const props = defineProps(['item'])
const image = useSanitizeUri(props.item.meta?.image)
const price = ref(props.item.price)
const description = ref(props.item.meta?.description)
const hasOwner = ref(props.item.currentOwner)

// { "id": "1825819407-57", "createdAt": "2022-12-05T08:42:06.595000Z", "name": "KoDragon#55", "metadata": "ipfs://ipfs/bafkreie7mgymfpy7oiyz2v2sd5utwb44fcvutrveqrkswieg2cpm7evsqm", "currentOwner": "bXkSjdJoRueC7TCPVs4LAVFa8BiPNwZPZXsfzHdt95MSL2NMp", "issuer": "bXmx9pNXZw6dYkwaoafJyTrAZVQ1znGq8boJHC2MfQwgGLxPz" }
</script>
