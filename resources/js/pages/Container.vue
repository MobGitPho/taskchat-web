<script lang="ts" setup>
  import { slideToId } from '@/utils/functions'

  const { getFinalPageSections, getComponents, page } = useContent()

  const sections = getFinalPageSections()
  const components = getComponents()

  onMounted(() => {
    setTimeout(() => {
      if (
        page.props.sectionData &&
        sections
          .map((section) => section.slug)
          .includes(page.props.sectionData.slug)
      ) {
        slideToId(`${page.props.sectionData.slug}-container`)
      }
    }, 1000)
  })
</script>

<template>
  <Page>
    <AppHead />
    <template v-for="(section, i) in sections" :key="'section-' + i">
      <section :id="`${section.slug}-container`" class="reset-styles">
        <component :is="components[section.name]" />
      </section>
    </template>
  </Page>
</template>

<style scoped>
  .reset-styles {
    all: unset !important;
  }
</style>
