import { PrismaClient, User,Comment } from "@prisma/client"
const prisma = new PrismaClient()

const add = async (user: User, data: Comment): Promise<Comment> =>
{
    const findPost = await prisma.post.findUnique({
        where: {
            id: data.postId
        }
    })
    let addComment;
    if (findPost)
    {
        const commentData: Comment = {...data,userId:user.id};
        addComment = await prisma.comment.create({
            data: commentData
        })
    }
    else{
        throw new Error("Comment added failed");
    }

    return addComment;
}

export const commentService={
    add
}