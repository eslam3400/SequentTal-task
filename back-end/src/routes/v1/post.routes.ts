import express from 'express'
import { authMiddleware } from '../../middleware/auth.middleware'
import {
  createPostController,
  getPaginatedPostsController,
} from '../../controllers/post.controller'

const postRoutsV1 = express.Router()

postRoutsV1.get('/', authMiddleware, getPaginatedPostsController)
postRoutsV1.post('/', authMiddleware, createPostController)

export default postRoutsV1
