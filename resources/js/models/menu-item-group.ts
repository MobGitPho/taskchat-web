export class MenuItemGroupModel {
  id?: number
  name: string
  description?: string | null
  createdAt?: string
  updatedAt?: string

  constructor(
    name: string,
    description?: string | null,
    id?: number,
    createdAt?: string,
    updatedAt?: string
  ) {
    this.id = id
    this.name = name
    this.description = description
    this.createdAt = createdAt
    this.updatedAt = updatedAt
  }
}
