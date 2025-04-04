<script lang="ts" setup>
  import { Head } from '@inertiajs/vue3'

  const { tr, resolveUrl } = useHelper()
  const { getAppInformationValue, logo, icon, page } = useContent()

  interface Props {
    title?: string | undefined
    description?: string | undefined
    favicon?: string | undefined
    url?: string | undefined
    image?: string | undefined
  }

  const props = withDefaults(defineProps<Props>(), {
    title: undefined,
    description: undefined,
    favicon: undefined,
    url: undefined,
    image: undefined,
  })

  const description = computed(
    () => props.description || tr(getAppInformationValue('description'))
  )

  const url = computed(() => props.url || resolveUrl(page.url))

  const image = computed(() => props.image || logo.value)

  const favicon = computed(() => props.favicon || icon.value)
</script>

<template>
  <Head :title="props.title">
    <meta head-key="description" name="description" :content="description" />
    <link head-key="icon" rel="icon" type="image/png" :href="favicon" />
    <link head-key="canonical" rel="canonical" :href="url" />

    <meta head-key="og:title" property="og:title" :content="props.title" />
    <meta
      head-key="og:description"
      property="og:description"
      :content="description" />
    <meta head-key="og:image" property="og:image" :content="image" />
    <meta head-key="og:url" property="og:url" :content="url" />
    <meta head-key="og:type" property="og:type" content="website" />

    <meta
      head-key="twitter:title"
      name="twitter:title"
      :content="props.title" />
    <meta
      head-key="twitter:description"
      name="twitter:description"
      :content="description" />
    <meta head-key="twitter:image" name="twitter:image" :content="image" />
    <meta
      head-key="twitter:card"
      name="twitter:card"
      content="summary_large_image" />

    <slot />
  </Head>
</template>
