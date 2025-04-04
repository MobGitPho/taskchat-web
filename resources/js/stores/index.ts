import { ENCRYPTION_KEY } from '@/utils/constants'

import CryptoJS from 'crypto-js'
import { createPinia } from 'pinia'
import { persistencePlugin } from 'pinia-persistence-plugin'

declare module 'pinia' {
  export interface PiniaCustomProperties {
    router: any
  }
}

export default createPinia().use(
  persistencePlugin({
    storeKeysPrefix: 'creopse-app',
    persistenceDefault: true,
    ensureAsyncStorageUpdateOrder: false,
    storageItemsDefault: [
      {
        storage: {
          getItem: (key: string) => {
            try {
              const encrypted = localStorage.getItem(key)
              if (encrypted)
                return CryptoJS.AES.decrypt(encrypted, ENCRYPTION_KEY).toString(
                  CryptoJS.enc.Utf8
                )
              else return encrypted
            } catch (error) {
              console.log(error)
            }
          },
          setItem: (key: string, value: any) => {
            try {
              const encrypted = CryptoJS.AES.encrypt(
                value,
                ENCRYPTION_KEY
              ).toString()
              return localStorage.setItem(key, encrypted)
            } catch (error) {
              console.log(error)
            }
          },
          removeItem: (key: string) => {
            try {
              return localStorage.removeItem(key)
            } catch (error) {
              console.log(error)
            }
          },
        },
      },
    ],
  })
)
