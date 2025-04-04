import { NewsArticleModel } from './news-article'

export class NewsTagModel {
  id?: number
  foreignId?: number | null
  name: string
  description?: string | null
  slug?: string
  isActive: boolean
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
    description?: string | null,
    deletedAt?: string | null,
    createdAt?: string,
    updatedAt?: string
  ) {
    this.id = id
    this.foreignId = foreignId
    this.name = name
    this.description = description
    this.slug = slug
    this.isActive = isActive
    this.deletedAt = deletedAt
    this.createdAt = createdAt
    this.updatedAt = updatedAt
  }
}
