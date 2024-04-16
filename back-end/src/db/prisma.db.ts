import { PrismaClient } from '@prisma/client'

export const prismaClient = new PrismaClient()

export async function initDBConnection() {
  try {
    await prismaClient.$connect()
    console.log('Connected to the database')
  } catch (error) {
    console.error('Error connecting to the database', error)
    throw error
  }
}
