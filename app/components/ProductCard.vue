<template>
	<div class="border border-neutral-200 dark:border-neutral-700 rounded-md hover:shadow-lg max-w-[300px]">
		<div class="relative">
      <nuxt-link :to="`/products/${item.id}`">
				<img class="block object-cover h-auto rounded-md aspect-square"
          :src="image"
          :alt="item.name"
          :width="300"
          :height="300"
        />
      </nuxt-link>

      <WishlistButton
        :product="item"
        class="absolute bottom-0 right-0 mr-2 mb-2 border border-neutral-200 dark:border-neutral-700 !rounded-full"
      />
		</div>
		<div class="p-4 border-y border-neutral-200 dark:border-neutral-700">
      <nuxt-link :to="`/products/${item.id}`" class="max-w-full self-start text-sm hover:underline">
        {{ item.name }} #{{ item.sn }}
      </nuxt-link>

			<p class="block py-2 font-normal leading-5 text-sm truncate text-neutral-400">
				{{ description }}
			</p>
		</div>

    <div class="heading heading flex h-[3.8rem] items-center justify-between px-4 font-medium leading-none">
      <template v-if="price > 0">
        <div>
          {{ formatPrice(price) }}
        </div>
        <UButton
          square
          variant="ghost"
          size="sm"
          icon="i-heroicons-shopping-cart"
          v-if="price > 0"
          @click="addToCart"
        />
      </template>
      <small v-else class="text-neutral-500">
        Not for sale
      </small>
    </div>
	</div>
</template>

<script lang="ts" setup>
const props = defineProps(['item'])
const image = useSanitizeUri(props.item.meta?.image)
const price = ref(props.item.price)
const description = ref(props.item.meta?.description)
const cartStore = useCartStore()

const addToCart = () => {
  cartStore.addToCart(props.item)
}
</script>
