<template>
	<div class="my-4 lg:grid lg:grid-cols-2 lg:gap-x-16">
		<div class="w-full bg-white rounded-xl border-2 border-gray-200 lg:mt-0 lg:col-start-1 lg:row-span-2 lg:self-start">
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
						<h1 class="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
							{{ item.name }}
						</h1>
            <div class="mt-2 text-gray-400">
              <SfTooltip :label="new Date(item.createdAt).toLocaleDateString()">
                <time><SfIconCalendarToday size="sm" /> Minted {{ timeAgo(item.createdAt) }} ago</time>
              </SfTooltip>
            </div>
					</hgroup>

					<SfChip class="text-gray-600" v-if="item.price > 0">
            {{ formatPrice(item.price) }}
						<template #suffix>
							<!-- bg-gradient-to-tr from-[#4ADE80] to-[#A78BFA] -->
							<SfThumbnail class="bg-gray-600 text-sm text-white leading-5 text-center">
								°
							</SfThumbnail>
						</template>
					</SfChip>
				</div>
			</div>

      <div class="my-8 text-sm grid gap-2">
        <div class="flex gap-2 items-center" v-if="item.currentOwner">
          <span class="text-gray-400">{{ $t('text.owner') }}: </span>
          <span>
            <a class="text-blue-500 hover:underline"
                target="_blank"
                :href="`https://beta.kodadot.xyz/bsx/u/${item.currentOwner}`">
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

      <div class="mt-4 mb-8 space-y-6 font-light prose">
        {{ description }}
      </div>

      <hr class="border-1 border-gray-200">

      <SfButton type="button" size="lg" class="w-full my-12" :disabled="!isAvailable">
        <template #prefix>
          <SfIconShoppingCart size="sm" />
        </template>
  				{{ $t('action.add_to_cart') }}
      </SfButton>

      <hr class="border-1 border-gray-200">

      <div class="flex flex-wrap gap-4">
        <ShareButtons :product="item" />
      </div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { SfChip, SfIconShoppingCart, SfButton, SfThumbnail, SfTooltip, SfIconCalendarToday } from '@storefront-ui/vue'

const props = defineProps(['item'])
const image = useSanitizeUri(props.item.meta?.image)
const description = ref(props.item.meta?.description)
const isAvailable = ref(props.item.price !== '0')
// const metadata = useSanitizeUri(props.item.metadata)
// const hasOwner = ref(props.item.currentOwner)
</script>
