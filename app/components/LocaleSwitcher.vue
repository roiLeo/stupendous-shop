<template>
  <div class="relative flex flex-col">
    <select class="rounded-md font-medium inline-flex items-center disabled:cursor-not-allowed aria-disabled:cursor-not-allowed disabled:opacity-75 aria-disabled:opacity-75 transition-colors text-sm gap-2 text-default hover:bg-elevated active:bg-elevated focus:outline-none focus-visible:bg-elevated hover:disabled:bg-transparent dark:hover:disabled:bg-transparent hover:aria-disabled:bg-transparent dark:hover:aria-disabled:bg-transparent p-2" v-model="locale">
      <option v-for="{ code, name } in locales" :key="code" :value="code">
        {{ name }}
      </option>
    </select>
  </div>
</template>

<script lang="ts" setup>
const { locales, locale } = useI18n()
</script>
