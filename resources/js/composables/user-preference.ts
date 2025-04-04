import type { UserPrefs } from '@/utils/types'

import { Bool } from '@/enums/bool'

/**
 * A composable that exposes the default user preferences.
 *
 * @returns An object containing the `defaultPrefs` property, which is a reactive
 * ref to the default user preferences.
 *
 * The `defaultPrefs` object contains the following properties:
 *
 * - `inAppNotifEnabled`: A boolean indicating whether in-app notifications are
 * enabled by default.
 * - `emailNotifEnabled`: A boolean indicating whether email notifications are
 * enabled by default.
 * - `locale`: The user's preferred locale.
 */
export const useUserPreference = () => {
  const lang = getActiveLanguage()

  const defaultPrefs = ref<UserPrefs>({
    inAppNotifEnabled: Bool.TRUE,
    emailNotifEnabled: Bool.TRUE,
    locale: lang,
  })

  return {
    defaultPrefs,
  }
}
