import { Request, Response } from "express";
import { userService } from "./user.service";

const login =async (req:Request,res:Response) => {
    try {
        const user = await userService.login(req.body);
        if(user)
        {
            if(user.pass == req.body.pass)
            {
                return res.status(200).json({ status: "Succes", message: "User login succesfull" })
            }
            else
            {
                return res.status(404).json({ status: "Fail", message: "Password not match" })
            }
        }
        else
        {
            return res.status(404).json({status:"Fail", message:"user not found"})   
        }
    } catch (err) {
        res.status(500).json({ status: "Fail", message: `Internal server error. Error: ${err}` })
    }
}

const register = async (req: Request, res: Response) => {
    try {
        const user = await userService.register(req.body)
        if(user)
        {
            return res.status(200).json({status:"succes", message:"User registered succesfully"})
        }
        else{
            return res.status(404).json({ status: "succes", message: "User not registered" })
        }
    } catch (err) {
        res.status(500).json({ status: "Fail", message: `Internal server error. Error: ${err}` })
    }
}
export const userController ={
    login,register
}