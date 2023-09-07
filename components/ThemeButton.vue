<template>
  <UButton
    :icon="isDarkMode ? 'i-heroicons-moon' : 'i-heroicons-sun'"
    variant="ghost"
    aria-label="Theme"
    @click="toggleColorMode"
  />
</template>

<script lang="ts" setup>
const { toggleColorMode, isDarkMode } = useTheme()
</script>
