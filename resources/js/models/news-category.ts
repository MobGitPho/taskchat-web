import { NewsArticleModel } from './news-article'

export class NewsCategoryModel {
  id?: number
  foreignId?: number | null
  name: string
  slug?: string
  color?: string
  description?: string | null
  parentId?: number | null
  position?: number | null
  isActive: boolean
  image?: string | null
  imageUrl?: string | null
  deletedAt?: string | null
  createdAt?: string
  updatedAt?: string

  articles?: NewsArticleModel[]
  articlesCount?: number

  constructor(
    name: string,
    isActive: boolean,
    id?: number,
    slug?: string,
    foreignId?: number | null,
    color?: string,
    description?: string | null,
    parentId?: number | null,
    position?: number | null,
    image?: string | null,
    deletedAt?: string | null,
    createdAt?: string,
    updatedAt?: string
  ) {
    this.id = id
    this.foreignId = foreignId
    this.name = name
    this.slug = slug
    this.color = color
    this.description = description
    this.parentId = parentId
    this.position = position
    this.isActive = isActive
    this.image = image
    this.deletedAt = deletedAt
    this.createdAt = createdAt
    this.updatedAt = updatedAt
  }
}
