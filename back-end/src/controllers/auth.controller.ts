import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import {
  getGoogleAuthUrl,
  getGoogleTokens,
  getGoogleUserData,
} from '../services/google-auth.service'
import { APIResponseType } from '../types/api-response.type'
import { HTTPStatusEnum } from '../enums/http-status.enum'
import { updateUser } from '../services/user.service'
import { toPrismaJsonObject } from '../utils/json.util'
import { AuthProviderEnum } from '../enums/auth-provider.enum'

export function whoamiController(req: any, res: Response, next: NextFunction) {
  const response: APIResponseType = {
    data: {
      user: {
        name: req.user?.name,
        picture: req.user?.picture,
      },
    },
    message: 'User is authenticated',
    status: HTTPStatusEnum.OK,
  }
  return res.status(response.status!).json(response)
}

export function generateGoogleAuthURLController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const url = getGoogleAuthUrl()
    const response: APIResponseType = {
      data: { url },
      status: HTTPStatusEnum.OK,
    }
    res.json(response)
  } catch (error) {
    next(error)
  }
}

export async function googleAuthCallbackController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const code = req.query.code as string
    const tokens = await getGoogleTokens(code)
    const { tokenInfo, userInfo } = await getGoogleUserData(
      tokens.access_token!
    )
    if (!tokenInfo) throw new Error('error getting user profile from google')
    if (!userInfo.verified_email)
      throw new Error('google account is not verified')
    let dbUser = await updateUser({
      email: userInfo.email!,
      name: userInfo.name!,
      meta: toPrismaJsonObject({ userInfo, tokenInfo }),
      picture: userInfo.picture!,
      provider: AuthProviderEnum.GOOGLE,
    })
    const token = jwt.sign(
      { email: dbUser.email, id: dbUser.id },
      process.env.JWT_SECRET_KEY!,
      { expiresIn: process.env.JWT_EXPIRATION }
    )
    const response: APIResponseType = {
      data: {
        token,
        user: { name: dbUser.name, picture: dbUser.picture },
      },
      status: HTTPStatusEnum.OK,
    }
    res.json(response)
  } catch (error) {
    console.log(error)
    next(error)
  }
}
