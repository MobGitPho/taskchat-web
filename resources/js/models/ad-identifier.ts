import { AdContentType } from '@/enums/ad-content-type'

import { AdModel } from './ad'

export class AdIdentifierModel {
  id: string
  reusable: boolean
  contentType: AdContentType
  contentSize?: string
  params?: string[] | null
  createdAt?: string
  updatedAt?: string

  ads?: AdModel[]
  adsCount?: number

  constructor(
    id: string,
    reusable: boolean,
    contentType: AdContentType,
    contentSize?: string,
    params?: string[] | null,
    createdAt?: string,
    updatedAt?: string
  ) {
    this.id = id
    this.contentType = contentType
    this.contentSize = contentSize
    this.reusable = reusable
    this.params = params
    this.createdAt = createdAt
    this.updatedAt = updatedAt
  }
}
