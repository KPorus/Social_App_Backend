import { addComment } from './comments.interface';
import { Request, Response } from "express";
import { commentService } from "./comments.service";

const addComment =async (req:Request,res:Response) => {
    try {
        const addComment = await commentService.add(req.user,req.body);
        res.status(200).json({status:"success",message:"comments added succesfully",addComment})
    } catch (err) {
        res.status(500).json({ status: "Fail", message: `Internal server error. Error: ${err}` })
    }
}

const getAllComment = async (req: Request, res: Response) =>
{
    try
    {
        const getComment = await commentService.getAllComment(req.body);
        res.status(200).json({ status: "success", getComment })
    } catch (err)
    {
        res.status(500).json({ status: "Fail", message: `Internal server error. Error: ${err}` })
    }
}

export const commentsController = {
    addComment, getAllComment
}