<template>
	<div class="my-4 lg:grid lg:grid-cols-2 lg:gap-x-16">
		<div class="w-full rounded-xl border-2 border-gray-200 dark:border-gray-700 lg:mt-0 lg:col-start-1 lg:row-span-2 lg:self-start">
			<div class="rounded-lg overflow-hidden">
				<img class="w-full h-full object-center object-contain"
          :src="image"
          :alt="item.name"
          width="400"
          height="400"
				/>
			</div>
		</div>
		<div>
			<div class="flex flex-col gap-4 py-4 lg:pt-0">
				<div class="w-full flex items-center justify-between gap-4">
					<hgroup>
						<h1 class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white tracking-tight">
							{{ item.name }}
						</h1>
            <div class="mt-2 text-gray-400">
              <UTooltip :text="new Date(item.createdAt).toLocaleDateString()">
                <time>Minted {{ timeAgo(item.createdAt) }} ago</time>
              </UTooltip>
            </div>
					</hgroup>
          <UBadge color="gray" size="lg" variant="solid" v-if="isAvailable">
            {{ formatPrice(item.price) }}
          </UBadge>
				</div>
			</div>

      <div class="my-8 text-sm grid gap-2">
        <div class="flex gap-2 items-center" v-if="item.currentOwner">
          <span class="text-gray-400">{{ $t('text.owner') }}: </span>
          <span>
            <a class="text-blue-500 hover:underline"
                target="_blank"
                :href="`https://beta.kodadot.xyz/${config.public.CHAIN}/u/${item.currentOwner}`">
              {{ shortAddress(item.currentOwner) }}
            </a>
          </span>
        </div>
        <div class="flex gap-2 items-center">
          <span class="text-gray-400">{{ $t('text.availability') }}: </span>
          <span class="text-red-600" v-if="!isAvailable">{{ $t('text.unavailable') }}</span>
          <span class="text-green-600" v-else>{{ $t('text.available') }}</span>
        </div>
        <div class="flex gap-2 items-center">
          <span class="text-gray-400">ID: </span>
          <span>{{ item.id }}</span>
        </div>
      </div>

      <div class="mt-4 text-lg text-gray-500 dark:text-gray-400 mb-8 space-y-6 font-light prose">
        {{ description }}
      </div>

      <hr class="border-1 border-gray-200 dark:border-gray-700">

      <UButton
        block
        class="my-12"
        size="lg"
        icon="i-heroicons-shopping-cart"
        :disabled="!isAvailable"
        @click="addToCart()"
      >
        {{ $t('action.add_to_cart') }}
      </UButton>

      <hr class="border-1 border-gray-200 dark:border-gray-700">

      <div class="flex flex-wrap gap-4">
        <ShareButtons :product="item" />
      </div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { useCartStore } from '@/stores/cart'
const props = defineProps(['item'])

const cartStore = useCartStore()
const config = useRuntimeConfig()

const image = useSanitizeUri(props.item.meta?.image)
const description = ref(props.item.meta?.description)
const isAvailable = ref(props.item.price !== '0')

const addToCart = () => {
  cartStore.addToCart(props.item)
}
</script>
