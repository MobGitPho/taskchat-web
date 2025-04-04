import { defineConfig, mergeConfig, type UserConfigFn } from 'vitest/config'

import viteConfig from './vite.config'

export default defineConfig((configEnv) =>
  mergeConfig(
    (viteConfig as UserConfigFn)(configEnv),
    defineConfig({
      test: {
        environment: 'jsdom',
        globals: true,
      },
    })
  )
)
