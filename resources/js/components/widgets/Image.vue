<script setup lang="ts">
  import type { CSSProperties } from 'vue'

  interface Props {
    src: string
    alt?: string
    width?: string | number
    height?: string | number
    title?: string
    loading?: 'lazy' | 'eager'
    style?: CSSProperties
    size?: 'small' | 'medium' | 'large' | 'original'
    sync?: boolean
  }

  const props = withDefaults(defineProps<Props>(), {
    alt: '',
    width: undefined,
    height: undefined,
    title: undefined,
    loading: undefined,
    style: undefined,
    size: 'original',
    sync: false,
  })

  const { getImage } = useHelper()

  const { src, size, sync } = toRefs(props)

  const filteredProps = computed(() => {
    const { src: _, size: __, sync: ___, ...rest } = props
    return rest
  })
</script>

<template>
  <img v-if="sync" :src="src" v-bind="filteredProps" />
  <AsyncImg v-else :load="() => getImage(src, size)" v-bind="filteredProps" />
</template>
