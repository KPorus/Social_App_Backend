import { PrismaClient, User, Comment } from "@prisma/client"
import { GetCommentBody } from "./comments.interface";
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
        const commentData = {
            description: data.description, // Make sure the field name matches your schema
            userId: user.id,
            postId: data.postId
        };

        addComment = await prisma.comment.create({
            data: commentData
        })

    }
    else
    {
        throw new Error("Comment added failed");
    }

    return addComment;
}

const getAllComment = async (data: GetCommentBody): Promise<Comment[]> =>
{
    const findPost = await prisma.post.findUnique({
        where:
        {
            id: data.postId
        }
    })
    let comment;
    if (findPost)
    {
        comment = await prisma.comment.findMany({
            where: {
                postId: findPost.id // Filter comments by postId
            }
        });
    }
    else
    {
        throw new Error("Post is not found.");
    }

    if(comment.length == 0)
    {
        throw new Error("Comments is not found.");
    }
    return comment;
}

export const commentService = {
    add,
    getAllComment
}