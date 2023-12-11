<template>
  <div class="relative flex flex-col">
    <select class="appearance-none cursor-pointer p-2.5 text-neutral-900 bg-transparent focus:outline-primary-700 rounded-md hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800" v-model="locale">
      <option v-for="{ code, name } in locales" :key="code" :value="code">
        {{ name }}
      </option>
    </select>
  </div>
</template>

<script lang="ts" setup>
// const switchLocalePath = useSwitchLocalePath()
const { locales, locale, setLocaleCookie } = useI18n()

watch(locale, (newLocale) => {
  setLocaleCookie(newLocale)
})
</script>
