<script lang="ts" setup>
  import type { CSSProperties } from 'vue'

  interface Props {
    load: () => Promise<string>
    alt?: string
    width?: string | number
    height?: string | number
    title?: string
    loading?: 'lazy' | 'eager' | undefined
    style?: CSSProperties
  }

  const props = defineProps<Props>()

  const url = ref('')

  const init = async () => {
    url.value = await props.load()
  }

  init()
</script>

<template>
  <img
    :src="url"
    :alt="props.alt"
    :title="props.title"
    :style="props.style"
    :width="props.width"
    :height="props.height"
    :loading="props.loading" />
</template>
