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

<script lang="ts">
/**
 * @name Polkadot
 * @description The Polkadot default identicon
 */

import { defineComponent, ref, watch } from 'vue'
import { polkadotIcon } from '@polkadot/ui-shared'

export default defineComponent({
  props: ['address', 'isAlternative', 'size'],
  setup (props) {
    const { address, size, isAlternative } = props
    const circles = ref()
    circles.value = polkadotIcon(address, { isAlternative }).map(({ cx, cy, fill, r }) => {
      return {
        cx, cy, fill, r,
        width: size,
        height: size
      }
    })
    return { circles }
  }
})
</script>
