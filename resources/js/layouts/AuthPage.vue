<script lang="ts" setup>
  const { isUserConnected } = storeToRefs(useAuthStore())

  if (!isUserConnected.value) {
    router.replace('/login')
  }
</script>

<template>
  <Page>
    <slot />
  </Page>
</template>
