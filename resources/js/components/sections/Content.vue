<script lang="ts" setup>
  const { tr, rHtml } = useHelper()

  const { getSectionRootData, getSectionData } = useContent()

  const contentData = getSectionRootData('content')
  const headlinks = getSectionData('content')?.headlinks ?? []
  const features = getSectionData('content')?.features ?? []
</script>

<template>
  <div class="tw-min-h-screen tw-bg-gray-50">
    <nav class="tw-bg-white tw-shadow-sm">
      <div class="tw-container tw-mx-auto">
        <div class="tw-flex tw-justify-between tw-items-center tw-px-4 tw-py-4">
          <img
            src="/assets/images/creopse/logo.svg"
            alt="Vue logo"
            class="tw-h-8" />
          <div class="tw-flex tw-space-x-6">
            <a
              v-for="(link, i) in headlinks"
              :key="i"
              :href="link.url"
              target="_blank"
              class="tw-text-gray-600 hover:tw-text-[#1E9CD7]">
              <div class="tw-flex tw-items-center">
                <Icon icon="mdi:open-in-new" class="tw-mr-1" />
                {{ tr(link.title) }}
              </div>
            </a>
          </div>
        </div>
      </div>
    </nav>

    <main class="tw-container tw-mx-auto tw-px-4 tw-py-16">
      <div class="tw-text-center">
        <h1 class="tw-text-4xl tw-font-bold tw-text-gray-900 tw-mb-8">
          {{ tr(contentData?.title) }}
        </h1>

        <p
          class="tw-text-xl tw-text-gray-600 tw-mb-12 tw-max-w-2xl tw-mx-auto ck-content">
          {{ tr(contentData?.text) }}
        </p>

        <div
          class="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-3 tw-gap-8 tw-max-w-5xl tw-mx-auto">
          <div
            v-for="(feature, i) in features"
            :key="i"
            class="tw-bg-white tw-rounded-lg tw-shadow-md tw-p-6 hover:tw-shadow-lg tw-transition-shadow">
            <i class="tw-text-[#1E9CD7]" v-html="feature.icon"></i>
            <h2 class="tw-text-xl tw-font-semibold tw-mb-4 tw-text-gray-900">
              {{ tr(feature.title) }}
            </h2>
            <p
              class="tw-text-gray-600 tw-mb-4"
              v-html="rHtml(feature.text)"></p>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
  :deep(i > svg) {
    height: 48px;
  }
</style>
