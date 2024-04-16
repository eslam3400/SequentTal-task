import { z } from 'zod'
import { ValidationError } from '../errors/validation.error'

const postSchema = z.object({
  title: z.string().min(1).max(255),
  content: z.string().min(1).max(1000),
})

export function validatePostData(data: any): any {
  try {
    return postSchema.parse(data)
  } catch (error) {
    throw new ValidationError(error.message)
  }
}
