import { Post} from "@prisma/client";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const allpost =async ():Promise<Post[]|null> => {
    const result = await prisma.post.findMany({ })
    return result;
}

export const postService= {
    allpost
}