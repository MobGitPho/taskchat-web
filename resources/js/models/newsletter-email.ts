export class NewsletterEmailModel {
  id?: number
  email: string
  createdAt?: string
  updatedAt?: string

  constructor(
    email: string,
    id?: number,
    createdAt?: string,
    updatedAt?: string
  ) {
    this.email = email
    this.id = id
    this.createdAt = createdAt
    this.updatedAt = updatedAt
  }
}
