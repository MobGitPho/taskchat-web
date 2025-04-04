import { UserModel } from './user'

interface LocationData {
  ip: string
  iso?: string
  city?: string
  region?: string
  source?: string
  country?: string
  currency?: string
  latitude?: string
  timezone?: string
  continent?: string
  longitude?: string
}

export class UserSessionModel {
  id?: number
  userId?: number
  ipAddress: string
  userAgent: string
  locationData?: LocationData
  lastActivity: string
  createdAt?: string
  updatedAt?: string

  user?: UserModel

  constructor(
    ipAddress: string,
    userAgent: string,
    lastActivity: string,
    id?: number,
    userId?: number,
    locationData?: LocationData,
    createdAt?: string,
    updatedAt?: string
  ) {
    this.id = id
    this.userId = userId
    this.locationData = locationData
    this.ipAddress = ipAddress
    this.userAgent = userAgent
    this.lastActivity = lastActivity
    this.createdAt = createdAt
    this.updatedAt = updatedAt
  }
}
