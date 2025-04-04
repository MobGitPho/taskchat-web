import { Bool } from '@/enums/bool'
import type { AdModel } from '@/models/ad'
import type { AdIdentifierModel } from '@/models/ad-identifier'
import type { ContentModelModel } from '@/models/content-model'
import type { ContentModelItemModel } from '@/models/content-model-item'
import type { MenuModel } from '@/models/menu'
import type { MenuItemGroupModel } from '@/models/menu-item-group'
import type { MenuLocationModel } from '@/models/menu-location'
import type { NewsArticleModel } from '@/models/news-article'
import type { NewsCategoryModel } from '@/models/news-category'
import type { NewsTagModel } from '@/models/news-tag'
import type { PageModel } from '@/models/page'
import type { SectionModel } from '@/models/section'
import type { Page } from '@inertiajs/core'

export interface AppInformationModel {
  id?: number
  key: string
  value: string
  createdAt?: string
  updatedAt?: string
}

export interface AppInformationObject {
  name: string
  icon: string
  logo: string
  phone: string
  email: string
  address: string
  postalCode: string
  description: string
  primaryColor: string
  secondaryColor: string
  accentColor: string

  facebook: string
  twitter: string
  instagram: string
  whatsapp: string
  linkedin: string
  youtube: string
  pinterest: string
  snapchat: string
  tiktok: string
  telegram: string
  discord: string
  reddit: string
  tumblr: string
  vimeo: string
  twitch: string
  github: string
  dribbble: string
  behance: string
  medium: string
  stackOverflow: string
  threads: string
  messenger: string
  playstore: string
  appstore: string

  additionalInfo: string
}

export type AppInformationKey = keyof AppInformationObject

export type SettingType = 'string' | 'number' | 'boolean' | 'object' | 'array'

export interface UserPrefs {
  inAppNotifEnabled?: Bool
  emailNotifEnabled?: Bool
  locale?: string
}

export interface PaginationMeta {
  current_page: number
  from: number
  last_page: number
  links: {
    url: string
    label: string
    active: boolean
  }[]
  path: string
  per_page: number
  to: number
  total: number
}

export interface PaginationLinks {
  first: string
  last: string
  prev: string
  next: string
}

export interface PaginatedArticles {
  data: NewsArticleModel[]
  meta: PaginationMeta
  links: PaginationLinks
}
export interface SharedProps extends Page {
  appLocale: string
  appFallbackLocale: string
  userData: any
  isUserLoggedIn: boolean
  pageData: PageModel | null
  sectionData: SectionModel | null
  articles?: NewsArticleModel[]
  paginatedArticles?: PaginatedArticles
  categories?: NewsCategoryModel[]
  tags?: NewsTagModel[]
  article?: NewsArticleModel
  category?: NewsCategoryModel
  tag?: NewsTagModel
  contentModelItem?: ContentModelItemModel
  appInformation: AppInformationModel[]
  adIdentifiers?: AdIdentifierModel[]
  contentModels?: ContentModelModel[]
  menus?: MenuModel[]
  menuLocations?: MenuLocationModel[]
  menuItemGroups?: MenuItemGroupModel[]
  ads?: AdModel[]
  query?: string
  data?: any
  youtubeChannelId?: string
}

export interface Coords {
  lat: number
  lng: number
}
