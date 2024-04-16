import express from 'express'
import authRoutesV1 from './auth.routes'
import postRoutsV1 from './post.routes'

const v1Routes = express.Router()

v1Routes.use('/auth', authRoutesV1)
v1Routes.use('/posts', postRoutsV1)

export default v1Routes
