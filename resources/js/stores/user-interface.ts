export interface UserInterfaceState {
  isLightTheme: boolean
  mobileMenuOpened: boolean
  newsletterModalOpened: boolean
}

export const useUserInterfaceStore = defineStore('user-interface', {
  state: (): UserInterfaceState => ({
    isLightTheme: true,
    mobileMenuOpened: false,
    newsletterModalOpened: false,
  }),
  getters: {},
  actions: {},
})
