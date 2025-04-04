import './bootstrap'
import 'flowbite'

import App from './App.vue'

import pinia from '@/stores'

import { LANG_COOKIE } from '@/utils/constants'

import { ZiggyVue } from 'ziggy-js'
import { i18nVue } from 'laravel-vue-i18n'
import { createInertiaApp, Link } from '@inertiajs/vue3'
import { SFacebook, STwitter, SLinkedIn } from 'vue-socials'

import Flicking from '@egjs/vue3-flicking'
import '@egjs/vue3-flicking/dist/flicking.css'

import 'vfonts/Lato.css'
import 'vfonts/Roboto.css'
import 'vfonts/OpenSans.css'

createInertiaApp({
  title: (title) => title ? `${title} - ${import.meta.env.APP_NAME}` : import.meta.env.APP_NAME,
  resolve: (name) =>
  {
    const pages = import.meta.glob('./pages/**/*.vue', { eager: true })
    const page: any = pages[`./pages/${name}.vue`]
    page.default.layout = App
    return page
  },
  progress: {
    // The delay after which the progress bar will appear, in milliseconds...
    delay: 250,

    // The color of the progress bar...
    color: import.meta.env.APP_SECONDARY_COLOR,

    // Whether to include the default NProgress styles...
    includeCSS: true,

    // Whether the NProgress spinner will be shown...
    showSpinner: false,
  },
  setup({ el, App, props, plugin }) {

    // Add naive ui styles meta
    const meta = document.createElement('meta')
    meta.name = 'naive-ui-style'
    document.head.appendChild(meta)

    // Setup language
    const navigatorLanguage =
        // @ts-ignore
        window.navigator.language || window.navigator.userLanguage

    let lang = navigatorLanguage.split('-')[0]

    const userData: any = props.initialPage.props.userData

    if (userData && userData.preferences && userData.preferences.locale) {
        lang = userData.preferences.locale
    }

    // Create vue app instance
    createApp({ render: () => h(App, props) })
      .use(plugin)
      .use(ZiggyVue)
      .use(pinia)
      .use(i18nVue, {
        lang: localStorage.getItem(LANG_COOKIE) || lang || props.initialPage.props.appLocale || 'fr',
        fallbackLang: props.initialPage.props.appFallbackLocale || 'fr',
        resolve: async (lang: string) => {
          const langs: any = import.meta.glob('../../lang/*.json')
          return await langs[`../../lang/${lang}.json`]()
        },
      })
      .component('Flicking', Flicking)
      .component('SLinkedIn', SLinkedIn)
      .component('SFacebook', SFacebook)
      .component('STwitter', STwitter)
      .component('Link', Link)
      .mount(el)
  },
})
