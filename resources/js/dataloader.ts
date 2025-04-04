export default async () => {
  const { reloadUserData } = useAuthStore()
  const { loadTags, loadCategories } = useNewsStore()

  // Load data
  loadTags()
  loadCategories()

  reloadUserData()
}
