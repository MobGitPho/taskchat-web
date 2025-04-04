import { SectionModel } from './section'

export class PageModel {
  name: string
  title: string
  slug: string
  content: string | null
  sectionsData?: any | null
  sectionsOrder?: string[] | null
  sectionsDisabled?: string[] | null
  sections?: SectionModel[]
  id?: number
  createdAt?: string
  updatedAt?: string

  constructor(
    name: string,
    title: string,
    slug: string,
    content: string | null,
    sectionsData?: any | null,
    sectionsOrder?: string[] | null,
    sectionsDisabled?: string[] | null,
    sections?: SectionModel[],
    id?: number,
    createdAt?: string,
    updatedAt?: string
  ) {
    this.id = id
    this.name = name
    this.title = title
    this.slug = slug
    this.content = content
    this.sectionsData = sectionsData
    this.sectionsOrder = sectionsOrder
    this.sectionsDisabled = sectionsDisabled
    this.sections = sections
    this.createdAt = createdAt
    this.updatedAt = updatedAt
  }
}
