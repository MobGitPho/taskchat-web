export {}

declare global {
  interface Window {
    // Useful for naive-ui
    $notification: any
    $loadingBar: any
    $message: any
    $dialog: any
    $modal: any
  }
}
