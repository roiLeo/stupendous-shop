<template>
  <svg :width="size" :height="size" viewBox="0 0 64 64">
    <circle v-for="(circle, index) in circles"
      :key="index"
      :cx="circle.cx"
      :cy="circle.cy"
      :r="circle.r"
      :fill="circle.fill"
      />
  </svg>
</template>

<script lang="ts" setup>
/**
 * @name Polkadot
 * @description The Polkadot default identicon
*/
import { polkadotIcon } from '@polkadot/ui-shared'

const { address, size, isAlternative } = defineProps(['address', 'isAlternative', 'size'])
const circles = ref(polkadotIcon(address, { isAlternative }).map(({ cx, cy, fill, r }) => {
  return {
    cx, cy, fill, r,
    width: size,
    height: size
  }
}))
</script>
