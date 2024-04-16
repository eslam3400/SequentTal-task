import express from 'express'
import {
  generateGoogleAuthURLController,
  googleAuthCallbackController,
  whoamiController,
} from '../../controllers/auth.controller'
import { authMiddleware } from '../../middleware/auth.middleware'

const authRoutesV1 = express.Router()

authRoutesV1.get('/whoami', authMiddleware, whoamiController)
authRoutesV1.get('/google', generateGoogleAuthURLController)
authRoutesV1.get('/google/callback', googleAuthCallbackController)

export default authRoutesV1
