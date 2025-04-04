import { ContentModelItemModel } from './content-model-item'

export class ContentModelModel {
  id?: number
  name: string
  title: string
  slug: string
  image?: string | null
  imageUrl?: string | null
  description?: string | null
  dataStructure?: any | null
  titleFieldName?: string | null
  hasPermalink?: boolean
  createdAt?: string
  updatedAt?: string

  items?: ContentModelItemModel[]
  itemsCount?: number

  constructor(
    name: string,
    slug: string,
    title: string,
    image?: string | null,
    imageUrl?: string | null,
    description?: string | null,
    dataStructure?: any | null,
    titleFieldName?: string | null,
    hasPermalink?: boolean,
    id?: number,
    createdAt?: string,
    updatedAt?: string
  ) {
    this.id = id
    this.slug = slug
    this.name = name
    this.title = title
    this.image = image
    this.imageUrl = imageUrl
    this.description = description
    this.dataStructure = dataStructure
    this.titleFieldName = titleFieldName
    this.hasPermalink = hasPermalink
    this.createdAt = createdAt
    this.updatedAt = updatedAt
  }
}
