import { Request, Response } from "express";
import { postService } from "./posts.service";

const getAllPost = async (req: Request, res: Response) =>
{
    try
    {
        const post = await postService.allpost();
        if (post?.length == 0)
        {
            return res.status(400).json({ status: "fail", message: "No post available" })
        }
        return res.status(200).json({ status: "succes", data: post, count: post?.length })
    } catch (err)
    {
        res.status(500).json({ status: "Fail", message: `Internal server error. Error: ${err}` })
    }
}

const createPost = async (req: Request, res: Response) => {
    try {
        const addPost = await postService.addpost(req.user,req.body);
        res.status(200).json({status:"Succes",message:"Post created.",post:addPost})
    } catch (err) {
        res.status(500).json({ status: "Fail", message: `Internal server error. Error: ${err}` })
    }
}

const deletePost =async (req:Request, res:Response) => {
    try {
        const deleteUserPost = await postService.deletePost(req.user,req.body);
        res.status(200).json({ status:"Succes",message:`Post ${req.body.id} deleted succesfully`,deleteUserPost})
    } catch (err) {
        res.status(500).json({ status: "Fail", message: `Internal server error. Error: ${err}` })
    }
}

const likeDislikePost = async(req:Request,res:Response)=>{
    try
    {
        const likeDislikePost = await postService.likeDislikePost(req.user, req.body);
        res.status(200).json({ status: "succes", message: `Post ${req.body.id} liked `,likeDislikePost })
    } catch (err)
    {
        res.status(500).json({ status: "Fail", message: `Internal server error. Error: ${err}` })
    }
}

const updatePost = async (req: Request, res: Response) => {
    try {
        const postUpdate = await postService.updatePost(req.user,req.body);
        res.status(200).json({ status: "succes", message: `Post ${req.body.id} updated `, postUpdate })
    } catch (err) {
        res.status(500).json({ status: "Fail", message: `Internal server error. Error: ${err}` })
    }
}

export const postController = {
    getAllPost,
    createPost,
    deletePost,
    updatePost,
    likeDislikePost
}