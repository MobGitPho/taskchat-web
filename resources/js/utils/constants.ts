import { getBaseUrl, removeTrailingSlash } from '@/utils/functions'

// Server
export var API_BASE_URL = removeTrailingSlash(
  import.meta.env.APP_URL || getBaseUrl()
)

export var API_URL = `${API_BASE_URL}/api`

export const API_REQUEST_HEADERS = {
  'X-API-Key': import.meta.env.APP_X_API_KEY,
}

// Cookie KeyNames
export const LANG_COOKIE = 'Lang'

// Crypto JS
export const ENCRYPTION_KEY = 'fb8c9dd4-fef4-4b88-a9b8-fe5725f9e0c1'
