import fr from '@/assets/images/flags/fr.svg'
import gb from '@/assets/images/flags/gb.svg'

import { API_BASE_URL, LANG_COOKIE } from '@/utils/constants'
import { removeLeadingSlash } from '@/utils/functions'
import type { SharedProps, UserPrefs } from '@/utils/types'

// @ts-ignore
import { Ziggy } from '@/ziggy.js'
import type { RouteParams } from 'ziggy-js'

/**
 * Returns a collection of helper functions and values.
 *
 * @returns {Object}
 */
export const useHelper = () => {
  const page = usePage<SharedProps>()
  const lang = getActiveLanguage()
  const uiStore = useUserInterfaceStore()

  const { request } = useApi()
  const { defaultPrefs } = useUserPreference()

  const routes = Ziggy.routes
  const webRoutes = Object.fromEntries(
    Object.entries(Ziggy.routes).filter(
      ([name, route]: [name: string, route: any]) =>
        name && !route.uri.startsWith('api/')
    )
  )
  const apiRoutes = Object.fromEntries(
    Object.entries(Ziggy.routes).filter(
      ([name, route]: [name: string, route: any]) =>
        name && route.uri.startsWith('api/')
    )
  )

  const currentRoutePath = computed<string>(() => page.url)
  const currentRouteName = computed<string>(() => route().current() || '')

  /**
   * Navigates to a route by name, with optional parameters.
   *
   * @param {string} name - The name of the route to navigate to.
   * @param {object} [params] - Optional parameters to pass to the route.
   * @param {boolean} [absolute] - Whether to generate an absolute URL.
   * @returns {void}
   */
  const pushRoute = (
    name: string,
    params: RouteParams<string> = {},
    absolute = false
  ): void => {
    router.get(route(name, params, absolute))
  }

  /**
   * Replaces the current route with a new one, with optional parameters.
   *
   * @param {string} name - The name of the route to replace with.
   * @param {object} [params] - Optional parameters to pass to the route.
   * @param {boolean} [absolute] - Whether to generate an absolute URL.
   * @returns {void}
   */
  const replaceRoute = (
    name: string,
    params: RouteParams<string> = {},
    absolute = false
  ): void => {
    router.replace(route(name, params, absolute))
  }

  /**
   * Resolves a URL, whether it's a full URL or a path, into a full URL.
   *
   * If the given path is a full URL, it is returned as is. Otherwise, the
   * path is prepended with the API base URL and any leading slash is
   * removed.
   *
   * @param {string} path - The path or URL to resolve.
   * @returns {string} The resolved URL.
   */
  const resolveUrl = (path: string): string => {
    if (_v.isURL(path)) return path
    else return `${API_BASE_URL}/${removeLeadingSlash(path)}`
  }

  /**
   * Resolves a file URL, whether it's a full URL or a path, into a full URL.
   *
   * If the given path is a full URL, it is returned as is. Otherwise, the
   * path is prepended with the API base URL, a leading slash is removed,
   * and the path is assumed to be a file in the storage directory.
   *
   * @param {string} path - The path or URL to resolve.
   * @returns {string} The resolved URL.
   */
  const fileUrl = (path: string): string => {
    if (path) {
      if (_v.isURL(path)) return path
      else return `${API_BASE_URL}/storage/${path}`
    }

    return ''
  }

  /**
   * Retrieves an image URL based on the specified path and size.
   *
   * This function attempts to construct a URL for a thumbnail image of the
   * specified size ('small', 'medium', 'large'). If the thumbnail exists,
   * the URL is returned. If the thumbnail does not exist or an error occurs,
   * the original image URL is returned.
   *
   * @param {string} path - The path to the image file.
   * @param {'small' | 'medium' | 'large' | 'original'} [size='original'] - The desired size of the image. Defaults to 'original'.
   * @returns {Promise<string>} A promise that resolves to the URL of the image.
   */
  const getImage = async (
    path: string,
    size: 'small' | 'medium' | 'large' | 'original' = 'original'
  ): Promise<string> => {
    const checkableSizes = ['small', 'medium', 'large']
    const imageName = path.split('/').pop()
    let canUseIt = false

    for (let i = 0; i < checkableSizes.length; i++) {
      if (checkableSizes[i] === size) canUseIt = true

      if (canUseIt) {
        try {
          const url = fileUrl(`thumbnails/${checkableSizes[i]}/${imageName}`)
          const response = await axios.head(url)
          if (response.status === 200) {
            return url
          }
        } catch (error) {
          // If an error occurs (e.g., 404 Not Found), continue to the next link
        }
      }
    }

    return fileUrl(path)
  }

  /**
   * Retrieves a specific application information value based on the provided key and type.
   *
   * This function searches for a setting in the application's information using the given key.
   * It returns the setting's value converted to the specified type. If the setting is not found
   * or cannot be converted, a default value is returned based on the type.
   *
   * @param {AppInformationKey} key - The key for the desired application information.
   * @param {SettingType} [type='string'] - The expected type of the setting's value.
   *                                        Possible types are 'string', 'number', 'boolean', 'object', or 'array'.
   * @returns {any} The value of the application information key, converted to the specified type.
   */

  /**
   * @param {any} data
   * @returns {string}
   *
   * Returns the translation for the current language.
   * If the translation is not found, returns the translation for the french language.
   * If the translation for the french language is not found, returns an empty string.
   */
  const getTranslation = (data: any): string => {
    let parsedData: { [x: string]: any }

    try {
      parsedData = JSON.parse(data)
    } catch (e) {
      parsedData = {}
    }

    return parsedData
      ? parsedData[lang.toUpperCase()] ||
          parsedData[lang] ||
          parsedData['fr'] ||
          ''
      : ''
  }

  /**
   * Translates the provided data based on the current language settings.
   *
   * The function attempts to retrieve the translation for the active language.
   * If the translation for the active language is not found, it defaults to the
   * French translation. If neither is available, it returns an empty string.
   *
   * @param {any} data - The data containing translations in various languages.
   * @returns {string} - The translated string based on the current language or
   *                     the default fallback.
   */
  const tr = (data: any): string => {
    return getTranslation(data)
  }

  /**
   * Picks a value based on the current theme.
   *
   * @param {string|number|null} lightVal - The value to return if the theme is light.
   * @param {string|number|null} darkVal - The value to return if the theme is dark.
   * @returns {string|number|null} The picked value.
   */
  const pickByTheme = (
    lightVal: string | number | null,
    darkVal: string | number | null
  ): string | number | null => {
    return uiStore.isLightTheme ? lightVal : darkVal
  }

  /**
   * Replaces placeholders in a string with HTML elements containing links.
   *
   * Replaces `{{BASE_URL}}article` with the URL of the article API endpoint,
   * and `{{BASE_URL}}` with the URL of the storage API endpoint.
   *
   * Replaces `[audio]` and `[video]` with HTML elements containing links to
   * the corresponding files. The links are resolved using the `fileUrl` function.
   *
   * @param {string | null | undefined} data - The string to process.
   * @returns {string} - The processed string.
   */
  const resolveHtmlLinks = (data: string | null | undefined): string => {
    if (!data) return ''
    let str = getTranslation(data)
      .replace(
        new RegExp('{{BASE_URL}}article', 'g'),
        `${API_BASE_URL}/article`
      )
      .replace(new RegExp('{{BASE_URL}}', 'g'), `${API_BASE_URL}/storage`)
    const audioList = str.match(/\[audio\](.*?)\[\/?audio\]/g)
    const videoList = str.match(/\[video\](.*?)\[\/?video\]/g)
    audioList?.forEach((item) => {
      const url = item.replace(/\[\/?audio\]/g, '')
      str = str.replace(
        item,
        `<br><p><audio preload="all" controls style="width: 100%"><source src="${fileUrl(
          url
        )}"></audio></p><br>`
      )
    })
    videoList?.forEach((item) => {
      const url = item.replace(/\[\/?video\]/g, '')
      str = str.replace(
        item,
        `<br><p><video controls style="width: 100%"><source src="${fileUrl(
          url
        )}"></video></p><br>`
      )
    })
    return str
  }

  /**
   * Resolves HTML links in a given string.
   *
   * Replaces `{{BASE_URL}}article` with the URL of the article API endpoint,
   * and `{{BASE_URL}}` with the URL of the storage API endpoint.
   *
   * Replaces `[audio]` and `[video]` with HTML elements containing links to
   * the corresponding files. The links are resolved using the `fileUrl` function.
   *
   * @param {string | null | undefined} data - The string to process.
   * @returns {string} - The processed string.
   */
  const rHtml = (data: string | null | undefined): string => {
    return resolveHtmlLinks(data)
  }

  const is2XlScreen = useMediaQuery('(min-width: 1536px)')
  const isXlScreen = useMediaQuery(
    '(min-width: 1280px) and (max-width: 1535px)'
  )
  const isLgScreen = useMediaQuery(
    '(min-width: 1024px) and (max-width: 1279px)'
  )
  const isMdScreen = useMediaQuery('(min-width: 768px) and (max-width: 1023px)')
  const isSmScreen = useMediaQuery('(max-width: 767px)')

  interface Language {
    label: string
    value: string
    flag: string
  }

  const languages: Language[] = [
    {
      label: 'French',
      value: 'fr',
      flag: fr,
    },
    {
      label: 'English',
      value: 'en',
      flag: gb,
    },
  ]

  /**
   * Retrieves the label of the given language value.
   *
   * @param {string} value - The language value to search for.
   * @returns {string | undefined} The label of the given language value or undefined if not found.
   */
  const getLangageLabel = (value: string) =>
    languages.find((l) => l.value == value)?.label

  /**
   * Retrieves the value of the given language label.
   *
   * @param {string} label - The language label to search for.
   * @returns {string | undefined} The value of the given language label or undefined if not found.
   */
  const getLanguageValue = (label: string) =>
    languages.find((l) => l.label == label)?.value

  /**
   * Updates the language setting for the application.
   *
   * @param {string} val - The new language value to set.
   * @param {boolean} [reload=true] - Whether to reload the page after updating the language.
   * @param {boolean} [updateUserPrefs=true] - Whether to update the user's preferences with the new language.
   *
   * Stores the new language in local storage. If the user is logged in and updateUserPrefs is true,
   * it updates the user's preferences with the new language. Optionally reloads the page if reload is true.
   */
  const updateLang = async (
    val: string,
    reload = true,
    updateUserPrefs = true
  ) => {
    localStorage.setItem(LANG_COOKIE, val)

    if (page.props.isUserLoggedIn && updateUserPrefs) {
      const userPrefs = (page.props.userData?.preferences ||
        defaultPrefs.value) as UserPrefs
      userPrefs.locale = val

      await request({
        url: `/users/self/${page.props.userData?.id}`,
        method: 'put',
        data: {
          preferences: userPrefs,
        },
      })
    }

    if (reload) location.reload()
  }

  /**
   * Displays form errors as a series of error messages using the window.$message plugin.
   *
   * @param {Record<string, string[]>} errors - The errors to display, where the keys are the field names and the values are arrays of error strings.
   */
  const displayFormErrors = (errors: any) => {
    if (errors) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      for (const [key, value] of Object.entries(errors)) {
        for (const error of value as string[]) {
          window.$message.error(error)
        }
      }
    }
  }

  /**
   * Returns the Tailwind CSS class name for the cursor to display for a link
   * element depending on whether the link has a valid URL or not.
   *
   * If the link has no URL or its URL is '#', the function returns
   * 'tw-cursor-default'. Otherwise, it returns 'tw-cursor-pointer'.
   *
   * @param {string} url - The URL of the link element.
   * @returns {string} The Tailwind CSS class name for the cursor.
   */
  const getLinkCursorClass = (url: string) => {
    return !url || url === '#' ? 'tw-cursor-default' : 'tw-cursor-pointer'
  }

  const ckEditorToolbarItems = [
    'fullScreen',
    '|',
    'heading',
    '|',
    'uploadImage',
    '|',
    'bold',
    'italic',
    'underline',
    'strikethrough',
    'code',
    'subscript',
    'superscript',
    'selectAll',
    '|',
    'fontSize',
    'fontFamily',
    'fontColor',
    'fontBackgroundColor',
    '|',
    'horizontalLine',
    'blockQuote',
    'bulletedList',
    'numberedList',
    'alignment',
    '|',
    'outdent',
    'indent',
    '|',
    'link',
    'insertTable',
    'mediaEmbed',
    '|',
    'undo',
    'redo',
  ]

  return {
    is2XlScreen,
    isXlScreen,
    isLgScreen,
    isMdScreen,
    isSmScreen,
    getTranslation,
    getLangageLabel,
    getLanguageValue,
    getLinkCursorClass,
    ckEditorToolbarItems,
    displayFormErrors,
    resolveHtmlLinks,
    pickByTheme,
    resolveUrl,
    updateLang,
    languages,
    getImage,
    fileUrl,
    currentRoutePath,
    currentRouteName,
    replaceRoute,
    pushRoute,
    webRoutes,
    apiRoutes,
    routes,
    rHtml,
    tr,
  }
}
