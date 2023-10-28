import { PrismaClient, User, Comment } from "@prisma/client"
import { AddComment, DeleteComment, GetCommentBody } from "./comments.interface";
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

    if (comment.length == 0)
    {
        throw new Error("Comments is not found.");
    }
    return comment;
}

const updateComments = async (data: AddComment):Promise<Comment> =>
{
    const findComments = await prisma.comment.findUnique({
        where: {
            id: data.commentId
        }
    })
    let updateComment;
    if (findComments)
    {
        const updateData={
            description:data.description
        }
        updateComment = await prisma.comment.update({
            where: {
                id: data.commentId
            },
            data: updateData
        })
    }
    else{
        throw new Error("Comments not found.");
    }

    if(!updateComment)
    {
        throw new Error("Comments update failed.");
    }
    return updateComment;
}


const deleteComment = async (data: DeleteComment):Promise<Comment> => {
    const findComments = await prisma.comment.findUnique({
        where:{
            id:data.commentId
        }
    })
    let deleteComment;
    if(findComments)
    {
        deleteComment = await prisma.comment.delete({
            where:{
                id:data.commentId
            }
        })
    }
    else{
        throw new Error("Comments not found.");
    }

    if(!deleteComment)
    {
        throw new Error("Comments deletation failed.");
    }
    return deleteComment;
}

export const commentService = {
    add,
    getAllComment,
    updateComments,
    deleteComment
}