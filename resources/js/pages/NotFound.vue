<script lang="ts" setup>
  import Error404 from '@/assets/images/404.svg?component'
</script>

<template>
  <Page>
    <AppHead :title="trans('Error 404 - Page not found')" />
    <section
      class="tw-flex tw-flex-col tw-justify-center tw-items-center tw-text-center tw-px-3 tw-h-screen">
      <h1 class="tw-mb-2">{{ trans('Error 404') }}</h1>
      <Error404 class="tw-h-[300px]" />
      <h4 class="tw-mt-6 tw-mb-0">
        {{ trans('Page Not Found!') }}
      </h4>
      <p class="tw-text-gray-800 tw-text-2xl">
        {{
          trans(
            'Oops! The page you are looking for does not exist. It might have been moved or deleted.'
          )
        }}
      </p>
      <n-button type="primary" class="tw-mb-4" @click="router.replace('/')">
        {{ trans('BACK TO HOME') }}
      </n-button>
    </section>
  </Page>
</template>

<style scoped></style>
