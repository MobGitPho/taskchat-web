import { MenuItemModel } from './menu-item'
import { MenuLocationModel } from './menu-location'

export class MenuModel {
  id?: number
  menuLocationId?: number
  name: string
  title: string
  description?: string | null
  createdAt?: string
  updatedAt?: string

  items?: MenuItemModel[]
  itemsCount?: number
  location?: MenuLocationModel

  constructor(
    name: string,
    title: string,
    menuLocationId?: number,
    description?: string | null,
    id?: number,
    createdAt?: string,
    updatedAt?: string
  ) {
    this.id = id
    this.name = name
    this.title = title
    this.menuLocationId = menuLocationId
    this.description = description
    this.createdAt = createdAt
    this.updatedAt = updatedAt
  }
}
