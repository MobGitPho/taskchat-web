import { VideoDisplayType } from '@/enums/video-display-type'
import { VideoItemSource } from '@/enums/video-item-source'

import { UserModel } from './user'

export class VideoItemModel {
  id?: number
  foreignId?: string | null
  publisherId?: number
  title: string
  slug?: string
  description?: string | null
  thumbnail?: string | null
  thumbnailUrl?: string | null
  path: string
  url?: string
  displayType: VideoDisplayType
  source: VideoItemSource
  visible: boolean
  publishedAt?: string | null
  createdAt?: string
  updatedAt?: string

  publisher?: UserModel

  constructor(
    title: string,
    path: string,
    source: VideoItemSource = VideoItemSource.SELF_HOSTED,
    displayType: VideoDisplayType = VideoDisplayType.HORIZONTAL,
    visible: boolean,
    id?: number,
    url?: string,
    slug?: string,
    publisherId?: number,
    foreignId?: string | null,
    description?: string | null,
    thumbnail?: string | null,
    thumbnailUrl?: string | null,
    publishedAt?: string | null,
    createdAt?: string,
    updatedAt?: string
  ) {
    this.id = id
    this.foreignId = foreignId
    this.publisherId = publisherId
    this.title = title
    this.slug = slug
    this.description = description
    this.thumbnail = thumbnail
    this.thumbnailUrl = thumbnailUrl
    this.path = path
    this.url = url
    this.source = source
    this.visible = visible
    this.displayType = displayType
    this.publishedAt = publishedAt
    this.createdAt = createdAt
    this.updatedAt = updatedAt
  }
}
