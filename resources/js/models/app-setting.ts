export class AppSettingModel {
  id?: number
  key: string
  value: string
  createdAt?: string
  updatedAt?: string

  constructor(
    key: string,
    value: string,
    id?: number,
    createdAt?: string,
    updatedAt?: string
  ) {
    this.id = id
    this.key = key
    this.value = value
    this.createdAt = createdAt
    this.updatedAt = updatedAt
  }
}
