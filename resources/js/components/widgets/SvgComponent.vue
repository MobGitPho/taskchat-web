<script lang="ts" setup>
  import { removeLeadingSlash } from '@/utils/functions'

  interface Props {
    path: string
  }

  const props = withDefaults(defineProps<Props>(), {})

  const icon = defineAsyncComponent(
    () =>
      import(
        /* @vite-ignore */ `../../${removeLeadingSlash(props.path)}?component`
      )
  )
</script>

<template>
  <component :is="icon" />
</template>
