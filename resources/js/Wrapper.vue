<script setup lang="ts">
  window.$notification = useNaiveNotification()
  window.$loadingBar = useLoadingBar()
  window.$message = useMessage()
  window.$dialog = useDialog()
  window.$modal = useModal()
</script>

<template>
  <div class="body-wrapper">
    <slot></slot>
  </div>
</template>

<style scoped></style>
