import { ContentModelModel } from './content-model'

export class ContentModelItemModel {
  id?: number
  contentModelId?: number
  title: string
  contentModelData: any | null
  data?: { [key: string]: any } | null
  isActive: boolean
  createdAt?: string
  updatedAt?: string

  contentModel?: ContentModelModel
  relatedItems?: ContentModelItemModel[]
  relatedTo?: ContentModelItemModel[]

  constructor(
    title: string,
    contentModelData: any | null,
    isActive: boolean,
    data?: any | null,
    contentModelId?: number,
    id?: number,
    createdAt?: string,
    updatedAt?: string
  ) {
    this.id = id
    this.contentModelId = contentModelId
    this.title = title
    this.data = data
    this.contentModelData = contentModelData
    this.isActive = isActive
    this.createdAt = createdAt
    this.updatedAt = updatedAt
  }
}
