import { AdIdentifierModel } from './ad-identifier'

export class AdModel {
  pid: string
  title: string
  display: boolean
  data: { [key: string]: any }
  description: string | null
  content: string | null
  contentUrl?: string | null
  broadcastStart?: string | null
  broadcastEnd?: string | null
  id?: number
  createdAt?: string
  updatedAt?: string

  adIdentifier?: AdIdentifierModel

  constructor(
    pid: string,
    title: string,
    display: boolean,
    data: { [key: string]: any },
    description: string | null,
    content: string | null,
    contentUrl?: string | null,
    broadcastStart?: string | null,
    broadcastEnd?: string | null,
    id?: number,
    createdAt?: string,
    updatedAt?: string
  ) {
    this.id = id
    this.pid = pid
    this.title = title
    this.display = display
    this.content = content
    this.contentUrl = contentUrl
    this.description = description
    this.data = data
    this.broadcastStart = broadcastStart
    this.broadcastEnd = broadcastEnd
    this.createdAt = createdAt
    this.updatedAt = updatedAt
  }
}
