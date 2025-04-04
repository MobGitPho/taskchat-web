import { NotificationSource } from '@/enums/notification-source'
import { NotificationType } from '@/enums/notification-type'

export interface NotificationData {
  title: string
  content: string
  params: any[]
  triggeredBy: string
  source: NotificationSource
  target: string
  removable: boolean
}

export class NotificationModel {
  id?: string
  type: NotificationType
  notifiableId: number
  notifiableType: string
  data: NotificationData
  readAt?: string
  createdAt?: string
  updatedAt?: string

  constructor(
    type: NotificationType,
    notifiableId: number,
    notifiableType: string,
    data: NotificationData,
    id?: string,
    readAt?: string,
    createdAt?: string,
    updatedAt?: string
  ) {
    this.id = id
    this.type = type
    this.notifiableId = notifiableId
    this.notifiableType = notifiableType
    this.data = data
    this.readAt = readAt
    this.createdAt = createdAt
    this.updatedAt = updatedAt
  }
}
