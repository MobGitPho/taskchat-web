export class PermissionModel {
  id?: number
  name: string
  displayName: string
  description: string
  createdAt?: string
  updatedAt?: string

  constructor(
    name: string,
    displayName: string,
    description: string,
    id?: number,
    createdAt?: string,
    updatedAt?: string
  ) {
    this.name = name
    this.displayName = displayName
    this.description = description
    this.id = id
    this.createdAt = createdAt
    this.updatedAt = updatedAt
  }
}
