export class SubscriberProfileModel {
  id?: number
  userId: number
  createdAt?: string
  updatedAt?: string

  constructor(
    userId: number,
    id?: number,
    createdAt?: string,
    updatedAt?: string
  ) {
    this.id = id
    this.userId = userId
    this.createdAt = createdAt
    this.updatedAt = updatedAt
  }
}
