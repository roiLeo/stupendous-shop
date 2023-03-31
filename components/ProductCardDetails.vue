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
			<div class="flex flex-col gap-4 pt-4 lg:pt-0">
				<div class="w-full flex items-center justify-between gap-4">
					<hgroup>
						<h1 class="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
							{{ item.name }}
						</h1>
						<h2 class="text-gray-500 text-base leading-tight mt-2" v-if="item.currentOwner">
							Owned by
							<a class="text-blue-500 hover:underline"
							   target="_blank"
							   :href="`https://beta.kodadot.xyz/bsx/u/${item.currentOwner}`">
								{{ shortAddress(item.currentOwner) }}
							</a>
						</h2>
            <div class="mt-2 text-gray-400">
              <SfTooltip :label="new Date(item.createdAt).toLocaleDateString()">
                <time><SfIconCalendarToday size="sm" /> Minted {{ timeAgo(item.createdAt) }} ago</time>
              </SfTooltip>
            </div>

					</hgroup>

					<SfChip class="text-gray-600">
						<template #prefix>
							<!-- bg-gradient-to-tr from-[#4ADE80] to-[#A78BFA] -->
							<SfThumbnail class="bg-gray-600 text-sm text-white leading-5 text-center">
								$
							</SfThumbnail>
						</template>
						{{ price || 420 }}
					</SfChip>
				</div>
			</div>

			<section class="mt-12 pt-6">
				<hr class="border-1 border-gray-200">
				<div class="mt-4 space-y-6">
					<p class="text-base text-gray-600">
						{{ description }}
					</p>
				</div>
			</section>

      <SfButton type="button" size="lg" class="w-full" >
        <template #prefix>
          <SfIconShoppingCart size="sm" />
        </template>
        Add to cart
      </SfButton>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { SfChip, SfIconShoppingCart, SfButton, SfThumbnail, SfTooltip, SfIconCalendarToday } from '@storefront-ui/vue'

const props = defineProps(['item'])
// const metadata = useSanitizeUri(props.item.metadata)
const image = useSanitizeUri(props.item.meta?.image)
const price = ref(props.item.meta?.price)
const description = ref(props.item.meta?.description)
// const hasOwner = ref(props.item.currentOwner)
</script>
