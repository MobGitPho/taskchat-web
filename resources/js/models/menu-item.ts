import type { ContentType } from '@/enums/content-type'
import { MenuItemTargetType } from '@/enums/menu-item-target-type'

import type { ContentModelItemModel } from './content-model-item'
import { MenuModel } from './menu'
import { MenuItemGroupModel } from './menu-item-group'
import type { NewsArticleModel } from './news-article'
import type { NewsCategoryModel } from './news-category'
import type { NewsTagModel } from './news-tag'
import { PageModel } from './page'
import { SectionModel } from './section'

export class MenuItemModel {
  id?: number
  menuId?: number
  pageId?: number
  sectionId?: number
  menuItemGroupId?: number
  title: string
  description?: string | null
  path?: string | null
  url?: string | null
  controller?: string | null
  parentId?: number | null
  position: number
  isActive: boolean
  isVisible: boolean
  color?: string
  icon?: string
  targetType: MenuItemTargetType
  contentType?: ContentType
  contentId?: number
  createdAt?: string
  updatedAt?: string

  menu?: MenuModel
  page?: PageModel
  section?: SectionModel
  group?: MenuItemGroupModel
  content?:
    | ContentModelItemModel
    | NewsCategoryModel
    | NewsArticleModel
    | NewsTagModel

  constructor(
    title: string,
    position: number,
    targetType: MenuItemTargetType,
    isActive: boolean,
    isVisible: boolean,
    color?: string,
    icon?: string,
    description?: string | null,
    path?: string | null,
    url?: string | null,
    controller?: string | null,
    parentId?: number | null,
    menuId?: number,
    pageId?: number,
    sectionId?: number,
    menuItemGroupId?: number,
    contentType?: ContentType,
    contentId?: number,
    id?: number,
    createdAt?: string,
    updatedAt?: string
  ) {
    this.id = id
    this.menuItemGroupId = menuItemGroupId
    this.title = title
    this.description = description
    this.url = url
    this.path = path
    this.controller = controller
    this.parentId = parentId
    this.position = position
    this.targetType = targetType
    this.menuId = menuId
    this.pageId = pageId
    this.sectionId = sectionId
    this.isActive = isActive
    this.isVisible = isVisible
    this.color = color
    this.icon = icon
    this.contentType = contentType
    this.contentId = contentId
    this.createdAt = createdAt
    this.updatedAt = updatedAt
  }
}
