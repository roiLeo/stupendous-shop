<template>
  <div class="flex flex-col justify-center mx-auto h-full max-w-384 w-full mt-8 pb-24">
    <h2 class="text-center pb-4"> {{ $t('messages.mint_draw_title') }} </h2>
    <div class="max-w-150 mx-auto">
      <DrawPad
        :save-label="$t('action.create_nft')"
        :saving="saving"
        @save="save"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const saving = ref(false)

async function save(dataURL: string) {
  saving.value = true
  const dateIn2050 = new Date('2050-01-01').getTime()
  const blob = await fetch(dataURL).then(res => res.blob())
  const file = new File([blob], `${dateIn2050 - Date.now()}.jpg`, { type: 'image/jpeg' })

  // TODO: put minting logic to existing collection
  // await useUpload('/api/upload')(file)
  // await navigateTo('/')
  saving.value = false
}
</script>
