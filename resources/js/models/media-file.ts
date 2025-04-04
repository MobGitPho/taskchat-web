import { MediaFileType } from '@/enums/media-file-type'

import { UserModel } from './user'

export class MediaFileModel {
  id?: number
  foreignId?: number | null
  senderId?: number | null
  foreignUrl?: string | null
  url?: string
  name: string
  path: string
  size: number
  type: MediaFileType
  extension?: string | null
  mimeType?: string | null
  title?: string | null
  description?: string | null
  additionalMetadata?: object | null
  deletedAt?: string | null
  createdAt?: string
  updatedAt?: string

  sender?: UserModel | null

  constructor(
    name: string,
    path: string,
    size: number,
    type: MediaFileType = MediaFileType.OTHER,
    id?: number,
    url?: string,
    foreignId?: number | null,
    senderId?: number | null,
    foreignUrl?: string | null,
    extension?: string | null,
    mimeType?: string | null,
    title?: string | null,
    description?: string | null,
    additionalMetadata?: object | null,
    deletedAt?: string | null,
    createdAt?: string,
    updatedAt?: string
  ) {
    this.id = id
    this.url = url
    this.foreignId = foreignId
    this.senderId = senderId
    this.foreignUrl = foreignUrl
    this.name = name
    this.path = path
    this.size = size
    this.type = type
    this.extension = extension
    this.mimeType = mimeType
    this.title = title
    this.description = description
    this.additionalMetadata = additionalMetadata
    this.deletedAt = deletedAt
    this.createdAt = createdAt
    this.updatedAt = updatedAt
  }
}
