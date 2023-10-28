import { Post, User } from "@prisma/client";
import { PrismaClient } from '@prisma/client'
import { Body } from "./post.instance";

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
    let updateUser;
    const postdata: Post = { ...data, userId: user.id };
    // data: {
    //     title: data.title,
    //         description: data.description,
    //             userId: user.id
    // }
    if (findUser)
    {
        result = await prisma.post.create({
            data: postdata
        })
        // updateUser = await prisma.user.update({
        //     where: {
        //         id: user.id,
        //     },
        //     data: {
        //         post: {
        //             set: [{ id: result.id }],
        //         },
        //     },
        // })
    }

    if (!result)
    {
        throw new Error("Post not created.");
    }

    return result;
}

const deletePost = async (user: User, data: Body): Promise<Post> =>
{
    const findPost = await prisma.post.findUnique({
        where: {
            id: data.id
        }
    })

    if (!findPost)
    {
        throw new Error(`Post with ID ${data.id} not found.`);
    }

    let removePost;
    if (findPost?.userId === user.id)
    {
        removePost = await prisma.post.delete({
            where: {
                id: data.id,
                userId: "f401075e-12bd-4c8e-8fbb-df937ce999b6"
            }
        })
    } else
    {
        throw new Error(`user with ID ${user.id} not found in post.`);
    }

    return removePost;
}

const likeDislikePost = async (user: User, data: Body): Promise<Post> =>
{
    // Check if the user has already liked the post
    let post = await prisma.post.findUnique({
        where: {
            id: data.id,
        },
    });

    if (!post)
    {
        throw new Error("Post not found");
    }

    const likedByUser = post.like.includes(user.id);

    // If the user has already liked the post, remove the like
    if (likedByUser)
    {
        post = await prisma.post.update({
            where: {
                id: data.id,
            },
            data: {
                like: post.like.filter(likedUserId => likedUserId !== user.id),
            },
        });
    } else
    {
        // If the user hasn't liked the post, add their like
        post = await prisma.post.update({
            where: {
                id: data.id,
            },
            data: {
                like: [...post.like, user.id],
            },
        });
    }
    return post;
};

const updatePost = async (user: User, data: Post): Promise<Post> =>
{
    const findPost = await prisma.post.findUnique({
        where: {
            id: data.id
        }
    })

    if (!findPost)
    {
        throw new Error(`Post with ID ${data.id} not found.`);
    }
    let updatePost;

    if (findPost.userId === user.id)
    {

        updatePost = await prisma.post.update({
            where: {
                id: data.id
            }, data
        })
    }
    else{
        throw new Error(`User with ID ${user.id} not found in post.`);
    }

    return updatePost;
}
export const postService = {
    allpost,
    addpost,
    updatePost,
    deletePost,
    likeDislikePost
}