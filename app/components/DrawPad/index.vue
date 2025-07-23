<template>
  <div class="max-w-[600px]">
    <canvas
      ref="canvas"
      class="border rounded-md"
      width="600"
    />
    <div class="flex justify-between">
      <div class="flex items-center gap-2 mt-2">
        <DrawPadColorPicker
          icon="i-heroicons-photo"
          default="#f9fafb"
          @color="setBackground"
        />
        <DrawPadColorPicker @color="setPenColor" />
        <DrawPadStrokePicker
          :color="signaturePad?.penColor"
          @size="setPenSize"
        />
      </div>
      <div class="flex items-center mt-2">
        <UTooltip
          :text="$t('action.undo')"
          :shortcuts="[metaSymbol, 'z']"
        >
          <UButton
            variant="ghost"
            color="neutral"
            :label="$t('action.undo')"
            icon="i-heroicons-arrow-uturn-left"
            @click="undo"
          />
        </UTooltip>
        <UTooltip
          :text="$t('action.clear')"
          :shortcuts="[metaSymbol, 'k']"
        >
          <UButton
            variant="ghost"
            color="neutral"
            icon="i-heroicons-x-mark"
            :label="$t('action.clear')"
            @click="clear"
          />
        </UTooltip>
      </div>
    </div>
    <UButton
      :label="saveLabel"
      class="mt-4"
      size="xl"
      block
      :disabled="!canPost"
      :loading="saving"
      @click="save"
    />
    <UAlert
      class="mt-6"
      color="amber"
      variant="subtle"
      :title="$t('messages.mint_draw_alert')"
    />
  </div>
</template>

<script setup lang="ts">
import SignaturePad from 'signature_pad'

const props = defineProps({
  saveLabel: {
    type: String,
    default: 'Save',
  },
  saveType: {
    type: String,
    default: 'image/jpeg',
  },
  saving: {
    type: Boolean,
    default: false,
  },
})
const emit = defineEmits(['save'])
const { metaSymbol } = useShortcuts()

const canPost = ref(false)
const canvas = ref()
const signaturePad = ref()

defineShortcuts({
  meta_z: undo,
  meta_k: clear,
})

onMounted(() => {
  signaturePad.value = new SignaturePad(canvas.value, {
    penColor: '#030712',
    backgroundColor: '#f9fafb',
    minWidth: 5,
    maxWidth: 5,
  })
  window.addEventListener('resize', resizeCanvas)
  resizeCanvas()
  signaturePad.value.addEventListener('afterUpdateStroke', () => {
    canPost.value = !signaturePad.value.isEmpty()
  })
})
onBeforeUnmount(() => {
  window.removeEventListener('resize', resizeCanvas)
  signaturePad.value?.off()
})

function resizeCanvas() {
  const ratio = Math.max(window.devicePixelRatio || 1, 1)
  canvas.value.width = canvas.value.offsetWidth * ratio
  canvas.value.height = canvas.value.offsetHeight * ratio
  canvas.value.getContext('2d').scale(ratio, ratio)
  signaturePad.value.fromData(signaturePad.value.toData())
}

function clear() {
  if (!signaturePad.value) return
  signaturePad.value.clear()
  canPost.value = false
}

function undo() {
  if (!signaturePad.value) return
  const data = signaturePad.value.toData()
  if (data) {
    data.pop() // remove the last dot or line
    signaturePad.value.fromData(data)
    canPost.value = !signaturePad.value.isEmpty()
  }
}
function setPenColor(color: string) {
  if (!signaturePad.value) return
  signaturePad.value.penColor = color
}
function setBackground(color: string) {
  if (!signaturePad.value) return
  signaturePad.value.backgroundColor = color
  const data = signaturePad.value.toData()
  signaturePad.value.clear()
  signaturePad.value.fromData(data)
}
function setPenSize(size: number) {
  if (!signaturePad.value) return
  signaturePad.value.minWidth = signaturePad.value.maxWidth = size
}

async function save() {
  if (!signaturePad.value || signaturePad.value.isEmpty() || props.saving) return
  const dataURL = signaturePad.value.toDataURL(props.saveType)
  emit('save', dataURL)
}
</script>

<style scoped>
canvas {
  max-width: 600px;
  max-height: 600px;
  width: 100%;
  height: auto;
  aspect-ratio: 1;
}
a, button, canvas {
  user-select: none;
}
</style>
