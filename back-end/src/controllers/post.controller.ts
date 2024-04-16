import { NextFunction, Response } from 'express'
import { createPost, getPagedPostsWhere } from '../services/post.service'
import { APIResponseType } from '../types/api-response.type'
import { HTTPStatusEnum } from '../enums/http-status.enum'
import { validatePostData } from '../validation/post.validation'

export async function getPaginatedPostsController(
  req: any,
  res: Response,
  next: NextFunction
) {
  try {
    let { page, per_page, filter } = req.query
    const { posts, count } = await getPagedPostsWhere({
      page,
      per_page,
      filter,
    })

    const response: APIResponseType = {
      data: posts,
      status: HTTPStatusEnum.OK,
      message: 'Posts fetched successfully',
      meta: {
        total: count,
        page: +page,
        per_page: +per_page,
      },
    }
    res.status(response.status!).json(response)
  } catch (error) {
    console.log(error)
    next(error)
  }
}

export async function createPostController(
  req: any,
  res: Response,
  next: NextFunction
) {
  try {
    const data = req.body
    validatePostData(data)
    const post = await createPost({ authorId: req.user!.id, ...data })
    const response: APIResponseType = {
      data: post,
      message: 'Post created successfully',
      status: HTTPStatusEnum.CREATED,
    }
    res.status(response.status!).json(response)
  } catch (error) {
    next(error)
  }
}
