import { PermissionModel } from './permission'

export class RoleModel {
  id?: number
  name: string
  displayName: string
  description: string
  permissions?: PermissionModel[]
  createdAt?: string
  updatedAt?: string

  constructor(
    name: string,
    displayName: string,
    description: string,
    permissions?: PermissionModel[],
    id?: number,
    createdAt?: string,
    updatedAt?: string
  ) {
    this.name = name
    this.displayName = displayName
    this.description = description
    this.permissions = permissions
    this.id = id
    this.createdAt = createdAt
    this.updatedAt = updatedAt
  }
}
