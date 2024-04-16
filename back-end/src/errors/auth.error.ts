import { HTTPStatusEnum } from '../enums/http-status.enum'

export class AuthError extends Error {
  status: HTTPStatusEnum

  constructor(status: HTTPStatusEnum) {
    let message = ''
    switch (status) {
      case HTTPStatusEnum.UNAUTHORIZED:
        message = 'Unauthorized'
        break
      default:
        message = 'Unauthorized'
        break
    }
    super(message)
    this.name = 'AuthError'
    this.status = status
  }
}
