import { Post } from '@prisma/client'
import { prismaClient } from '../db/prisma.db'
import { PaginationType } from '../types/pagination.type'

export async function getPagedPostsWhere({
  page,
  filter,
  per_page,
}: PaginationType) {
  if (!page || page < 1) page = 1
  if (!per_page || per_page < 1) per_page = 10
  if (!filter) filter = ''

  const posts = await prismaClient.post.findMany({
    take: +per_page,
    skip: (page - 1) * per_page,
    orderBy: {
      created_at: 'desc',
    },
    where: {
      OR: [{ title: { contains: filter } }, { content: { contains: filter } }],
    },
  })

  const count = await prismaClient.post.count({
    where: {
      OR: [{ title: { contains: filter } }, { content: { contains: filter } }],
    },
  })

  return { posts, count }
}

export async function createPost(data: Partial<Post>) {
  return prismaClient.post.create({
    data: {
      title: data.title!,
      authorId: data.authorId!,
      content: data.content!,
    },
  })
}
