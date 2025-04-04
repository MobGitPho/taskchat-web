export class NewsletterPhoneModel {
  id?: number
  phone: string
  createdAt?: string
  updatedAt?: string

  constructor(
    phone: string,
    id?: number,
    createdAt?: string,
    updatedAt?: string
  ) {
    this.phone = phone
    this.id = id
    this.createdAt = createdAt
    this.updatedAt = updatedAt
  }
}
