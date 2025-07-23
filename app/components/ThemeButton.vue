<template>
  <ClientOnly>
    <UButton
      :icon="isDarkMode ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'"
      size="lg"
      color="neutral"
      variant="ghost"
      aria-label="Theme"
      @click="toggleColorMode"
      square
    />

    <template #fallback>
      <div class="w-8 h-8" />
    </template>
  </ClientOnly>
</template>

<script lang="ts" setup>
const { toggleColorMode, isDarkMode } = useTheme()
</script>
