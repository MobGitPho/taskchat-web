import { NewsArticleModel } from './news-article'
import { UserModel } from './user'

export class NewsCommentModel {
  id?: number
  foreignId?: number | null
  authorId?: number | null
  articleId?: number
  name?: string | null
  content: string
  email?: string | null
  isActive: boolean
  deletedAt?: string | null
  createdAt?: string
  updatedAt?: string

  author?: UserModel
  article?: NewsArticleModel

  constructor(
    content: string,
    isActive: boolean,
    id?: number,
    articleId?: number,
    foreignId?: number | null,
    authorId?: number | null,
    name?: string | null,
    email?: string | null,
    deletedAt?: string | null,
    createdAt?: string,
    updatedAt?: string
  ) {
    this.id = id
    this.foreignId = foreignId
    this.authorId = authorId
    this.articleId = articleId
    this.name = name
    this.content = content
    this.email = email
    this.isActive = isActive
    this.deletedAt = deletedAt
    this.createdAt = createdAt
    this.updatedAt = updatedAt
  }
}
