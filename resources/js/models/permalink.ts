import type { PermalinkContentType } from '@/enums/permalink-content-type'

import type { PageModel } from './page'

export class PermalinkModel {
  id?: number
  pathPrefix: string
  contentType?: PermalinkContentType | null
  contentParam?: string | null
  contentId?: number | null
  pageId?: number | null
  createdAt?: string
  updatedAt?: string

  page?: PageModel

  constructor(
    pathPrefix: string,
    contentType?: PermalinkContentType | null,
    contentParam?: string | null,
    contentId?: number | null,
    pageId?: number | null,
    id?: number,
    createdAt?: string,
    updatedAt?: string
  ) {
    this.id = id
    this.pathPrefix = pathPrefix
    this.contentType = contentType
    this.contentParam = contentParam
    this.contentId = contentId
    this.pageId = pageId
    this.createdAt = createdAt
    this.updatedAt = updatedAt
  }
}
