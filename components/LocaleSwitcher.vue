<template>
  <div>
    <!-- <SfSelect v-model="locale">
      <option v-for="{ code, name } in locales" :key="code" :value="code">
        {{ name }}
      </option>
    </SfSelect> -->
    <div class="relative flex flex-col">
      <select class="appearance-none disabled:cursor-not-allowed cursor-pointer pl-4 pr-3.5 text-neutral-900 bg-transparent focus:outline-primary-700 rounded-md ring-1 ring-inset ring-neutral-300 hover:ring-primary-700 active:ring-2 active:ring-primary-700 disabled:bg-disabled-100 disabled:text-disabled-900 disabled:ring-disabled-200 peer py-2" data-testid="select-input" v-model="locale">
        <option v-for="{ code, name } in locales" :key="code" :value="code">
          {{ name }}
        </option>
      </select>
    </div>
  </div>
</template>

<script lang="ts" setup>
// import { SfSelect } from '@storefront-ui/vue'

// const switchLocalePath = useSwitchLocalePath()
const { locales, locale, setLocaleCookie } = useI18n()

watch(locale, (newLocale) => {
  setLocaleCookie(newLocale)
})
</script>
