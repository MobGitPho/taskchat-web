import { PageModel } from './page'

export class SectionModel {
  id?: number
  name: string
  title: string
  slug: string
  content?: string | null
  dataStructure?: any | null
  createdAt?: string
  updatedAt?: string

  pages?: PageModel[]
  pagesCount?: number
  dataSourcePageId?: number | null
  dataSourcePageTitle?: string | null
  dataSourcePageSectionsData?: any

  constructor(
    name: string,
    slug: string,
    title: string,
    content?: string | null,
    dataStructure?: any | null,
    id?: number,
    createdAt?: string,
    updatedAt?: string
  ) {
    this.id = id
    this.name = name
    this.slug = slug
    this.title = title
    this.content = content
    this.dataStructure = dataStructure
    this.createdAt = createdAt
    this.updatedAt = updatedAt
  }
}
