import { Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { prismaClient } from '../db/prisma.db'
import { AuthError } from '../errors/auth.error'
import { HTTPStatusEnum } from '../enums/http-status.enum'

export async function authMiddleware(
  req: any,
  res: Response,
  next: NextFunction
) {
  try {
    const user = await getUserFromToken(req.headers.authorization)
    if (!user) throw new AuthError(HTTPStatusEnum.UNAUTHORIZED)
    req.user = user
    next()
  } catch (error) {
    next(error)
  }
}

async function getUserFromToken(authorizationHeader: string | undefined) {
  if (authorizationHeader) {
    const token = authorizationHeader.split(' ')[1]
    const decodedToken = verifyAndDecodeToken(token)
    if (decodedToken) {
      const { id, email } = decodedToken
      const user = await prismaClient.user.findUnique({
        where: { id, email },
      })
      return user
    }
  }
  return null
}

function verifyAndDecodeToken(token: string): any {
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY!)
    return decodedToken
  } catch (error) {
    return null
  }
}
