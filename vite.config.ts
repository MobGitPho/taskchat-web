import vue from '@vitejs/plugin-vue'
import laravel from 'laravel-vite-plugin'
import VueI18n from 'laravel-vue-i18n/vite'
import path from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Icons from 'unplugin-icons/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'
import SvgLoader from 'vite-svg-loader'

export default defineConfig({
  envPrefix: 'APP_',
  resolve: {
    alias: {
      'ziggy-js': path.resolve('vendor/tightenco/ziggy/dist/index.esm.js'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            const modulePath = id.split('node_modules/')[1]
            const topLevelFolder = modulePath.split('/')[0]
            if (topLevelFolder !== '.pnpm') {
              return topLevelFolder
            }
            const scopedPackageName = modulePath.split('/')[1]
            const chunkName =
              scopedPackageName.split('@')[
                scopedPackageName.startsWith('@') ? 1 : 0
              ]
            return chunkName
          }
        },
      },
      onwarn(warning, warn) {
        if (warning.code === 'EMPTY_BUNDLE') return // Ignore empty bundle warnings
        warn(warning)
      },
    },
    chunkSizeWarningLimit: 500,
  },
  plugins: [
    vue({
      template: {
        transformAssetUrls: {
          // The Vue plugin will re-write asset URLs, when referenced
          // in Single File Components, to point to the Laravel web
          // server. Setting this to `null` allows the Laravel plugin
          // to instead re-write asset URLs to point to the Vite
          // server instead.
          base: null,

          // The Vue plugin will parse absolute URLs and treat them
          // as absolute paths to files on disk. Setting this to
          // `false` will leave absolute URLs un-touched so they can
          // reference assets in the public directory as expected.
          includeAbsolute: false,
        },
      },
    }),
    laravel({
      input: ['resources/css/app.css', 'resources/js/app.ts'],
      refresh: true,
    }),
    VueI18n(),
    SvgLoader({
      defaultImport: 'url', // or 'raw'
    }),
    Components({
      dts: true,
      extensions: ['vue', 'md'],
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      resolvers: [
        NaiveUiResolver(),
        IconsResolver(),
        (name) => {
          if (name === 'Icon') {
            return { name: 'Icon', from: '@iconify/vue' }
          }
        },
      ],
      dirs: [
        'resources/js/components/sections',
        'resources/js/components/widgets',
        'resources/js/layouts',
      ],
    }),
    AutoImport({
      // targets to transform
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/, // .vue
        /\.md$/, // .md
      ],

      // global imports to register
      imports: [
        // presets
        'vue',
        'pinia',
        // custom
        {
          '@vueuse/core': [
            // named imports
            'useMouse', // import { useMouse } from '@vueuse/core',
            'useOnline',
            'useFavicon',
            'usePageLeave',
            'useClipboard',
            'useFileDialog',
            'useMediaQuery',
            'useWindowSize',
            'computedAsync',
            'onClickOutside',
            'useGeolocation',
            'useElementSize',
            'useElementVisibility',
            'useInfiniteScroll',
            // alias
            ['useFetch', 'useMyFetch'], // import { useFetch as useMyFetch } from '@vueuse/core',
          ],
          'naive-ui': [
            'useModal',
            'useDialog',
            'useMessage',
            ['useNotification', 'useNaiveNotification'],
            'useLoadingBar',
          ],
          'laravel-vue-i18n': [
            'trans',
            'wTrans',
            'transChoice',
            'wTransChoice',
            'loadLanguageAsync',
            'getActiveLanguage',
            'isLoaded',
          ],
          '@inertiajs/vue3': ['useForm', 'usePage', 'router'],
          slugify: [['default', 'slugify']],
          validator: [['default', '_v']],
          lodash: [['default', '_']],
          axios: [['default', 'axios']],
          uuid: [['v4', 'uuidv4']],
        },
      ],

      // Auto import for module exports under directories
      // by default it only scan one level of modules under the directory
      dirs: ['./resources/js/stores/**', './resources/js/composables/**'],
      // Auto import inside Vue template
      // see https://github.com/unjs/unimport/pull/15 and https://github.com/unjs/unimport/pull/72
      vueTemplate: true,

      eslintrc: {
        enabled: true, // Default `false`
        filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
        globalsPropValue: true, // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
      },
    }),
    Icons({ compiler: 'vue3', autoInstall: true }),
  ],
})
