import { UserModel } from '@/models/user'

export interface AuthState {
  userData: UserModel | null
  rememberMe: boolean
  accessToken: string | null
  accessTokenDate: number | null
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    userData: null,
    rememberMe: false,
    accessToken: null,
    accessTokenDate: null,
  }),
  getters: {
    isUserConnected(state: AuthState): boolean {
      return state.accessToken !== null && state.userData !== null
    },
    getUserData(state: AuthState) {
      if (!state.userData) return null

      return state.userData
    },
  },
  actions: {
    resetAuthData() {
      this.userData = null
      this.rememberMe = false
      this.accessToken = null
      this.accessTokenDate = null
    },
    async reloadUserData() {
      const { request } = useApi()
      const { updateLang } = useHelper()

      if (this.isUserConnected) {
        const task = await request({
          url: `/users/${this.userData?.id}`,
        })

        if (task.success && task.result.data) {
          this.userData = task.result.data

          if (this.userData?.preferences && this.userData.preferences.locale) {
            updateLang(this.userData.preferences.locale, false, false)
          }
        }
      }
    },
    async logout() {
      const { request } = useApi()

      const logoutDialog = window.$dialog.warning({
        title: trans('Confirmation'),
        content: trans('Are you sure you want to sign out?'),
        positiveText: trans('Yes'),
        negativeText: trans('No'),
        onPositiveClick: async () => {
          logoutDialog.loading = true

          const task = await request({
            url: '/auth/logout',
          })

          logoutDialog.loading = false

          if (task.success) {
            this.resetAuthData()

            router.replace('/login')
          }
        },
      })
    },
  },
})
