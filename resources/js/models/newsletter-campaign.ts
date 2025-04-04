export interface NewsletterCampaignHistory {
  id: string
  date: string
  report: string
}

export class NewsletterCampaignModel {
  id?: number
  title: string
  subject: string
  content: string
  rawContent: string
  recipients: string[]
  history?: NewsletterCampaignHistory[] | null
  createdAt?: string
  updatedAt?: string

  constructor(
    title: string,
    subject: string,
    content: string,
    rawContent: string,
    recipients: string[],
    history?: NewsletterCampaignHistory[] | null,
    id?: number,
    createdAt?: string,
    updatedAt?: string
  ) {
    this.title = title
    this.subject = subject
    this.content = content
    this.rawContent = rawContent
    this.recipients = recipients
    this.history = history
    this.id = id
    this.createdAt = createdAt
    this.updatedAt = updatedAt
  }
}
