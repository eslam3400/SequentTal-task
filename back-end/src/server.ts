import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors'
import router from './routes/router'
import { initDBConnection, prismaClient } from './db/prisma.db'
import { errorHandlerMiddleware } from './utils/http.util'

const server = express()
initDBConnection()

server.use(express.json())
server.use(cors())
server.use(express.urlencoded({ extended: true }))
server.use('/api', router)
server.use(errorHandlerMiddleware)

process.on('uncaughtException', async (err) => {
  console.error('Uncaught Exception:', err)
  await prismaClient.$disconnect()
  process.exit(1)
})

process.on('unhandledRejection', async (reason, promise) => {
  console.error('Unhandled Rejection:', reason)
  await prismaClient.$disconnect()
  process.exit(1)
})

server.listen(process.env.PORT, () =>
  console.log(`Server is running on port ${process.env.PORT}`)
)
