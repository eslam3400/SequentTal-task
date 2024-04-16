export interface APIResponseType {
  data?: any
  error?: string
  message?: string
  status?: number
  meta?: {
    total?: number
    page?: number
    per_page?: number
  }
}
