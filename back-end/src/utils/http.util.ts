import { NextFunction, Request, Response } from 'express'
import { APIResponseType } from '../types/api-response.type'
import { AuthError } from '../errors/auth.error'
import { ValidationError } from '../errors/validation.error'
import { HTTPStatusEnum } from '../enums/http-status.enum'

export async function errorHandlerMiddleware(
  error: any,
  request: Request,
  response: Response,
  next: NextFunction
) {
  let apiResponse: APIResponseType = {}
  if (error instanceof AuthError) {
    apiResponse.status = error.status
    apiResponse.error = error.message
  } else if (error instanceof ValidationError) {
    apiResponse.status = HTTPStatusEnum.BAD_REQUEST
    apiResponse.error = error.message
  } else {
    apiResponse.status = 500
    apiResponse.error = 'Server Error'
  }
  return response.status(apiResponse.status!).json(apiResponse)
}
