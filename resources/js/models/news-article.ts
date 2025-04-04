import { NewsArticleStatus } from '@/enums/news-article-status'

import { NewsCategoryModel } from './news-category'
import type { NewsCommentModel } from './news-comment'
import { NewsTagModel } from './news-tag'
import { UserModel } from './user'

export class NewsArticleModel {
  id?: number
  foreignId?: number | null
  authorId?: number
  publisherId?: number
  title: string
  slug: string
  summary?: string | null
  content?: string | null
  featuredImage?: string | null
  featuredImageUrl?: string | null
  foreignFeaturedImage?: string | null
  legend?: string | null
  allowComments: boolean
  isHeadline: boolean
  status: NewsArticleStatus
  publishedAt?: string | null
  deletedAt?: string | null
  createdAt?: string
  updatedAt?: string

  author?: UserModel
  publisher?: UserModel
  categories?: NewsCategoryModel[]
  categoriesCount?: number
  tags?: NewsTagModel[]
  tagsCount?: number
  comments?: NewsCommentModel[]
  commentsCount?: number

  constructor(
    title: string,
    slug: string,
    allowComments: boolean,
    isHeadline: boolean,
    status: NewsArticleStatus = NewsArticleStatus.PENDING,
    id?: number,
    foreignId?: number | null,
    authorId?: number,
    publisherId?: number,
    summary?: string | null,
    content?: string | null,
    featuredImage?: string | null,
    foreignFeaturedImage?: string | null,
    legend?: string | null,
    publishedAt?: string | null,
    deletedAt?: string | null,
    createdAt?: string,
    updatedAt?: string
  ) {
    this.id = id
    this.foreignId = foreignId
    this.authorId = authorId
    this.publisherId = publisherId
    this.title = title
    this.slug = slug
    this.summary = summary
    this.content = content
    this.featuredImage = featuredImage
    this.foreignFeaturedImage = foreignFeaturedImage
    this.legend = legend
    this.allowComments = allowComments
    this.isHeadline = isHeadline
    this.status = status
    this.publishedAt = publishedAt
    this.deletedAt = deletedAt
    this.createdAt = createdAt
    this.updatedAt = updatedAt
  }
}
