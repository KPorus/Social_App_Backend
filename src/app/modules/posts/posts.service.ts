import { Post, User } from "@prisma/client";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const allpost = async (): Promise<Post[]> =>
{
    const result = await prisma.post.findMany({})
    return result;
}
const addpost = async (user: User, data: Post): Promise<Post> =>
{
    const findUser = await prisma.user.findUnique({
        where: {
            id: user.id
        }
    })
    let result;
    const postdata: Post = { ...data, userId: user.id };
    // data: {
    //     title: data.title,
    //         description: data.description,
    //             userId: user.id
    // }
    if (findUser)
    {
        result = await prisma.post.create({
            data:postdata
        })
    }

    if (!result)
    {
        throw new Error("Post not created.");
    }
    return result;
}

export const postService = {
    allpost,
    addpost
}