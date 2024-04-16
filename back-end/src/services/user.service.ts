import { User } from '@prisma/client'
import { prismaClient } from '../db/prisma.db'

export async function updateUser(data: Partial<User>) {
  let user = await prismaClient.user.findUnique({
    where: { email: data.email },
  })
  if (user) {
    user = await prismaClient.user.update({
      where: { id: user.id },
      data: { ...data, meta: data.meta! },
    })
  } else {
    user = await prismaClient.user.create({
      data: {
        ...data,
        meta: data.meta!,
        name: data.name!,
        email: data.email!,
      },
    })
  }
  return user
}
