import jwt from "jsonwebtoken"
import { Request, Response } from "express";
import { userService } from "./user.service";

const signToken = (id: string) =>
{
    return jwt.sign(
        {
            id,
        },
        process.env.JWT_SECRET as string,
        {
            expiresIn: "30d", // Token expiration period
        }
    );
};

const login = async (req: Request, res: Response) =>
{
    try
    {
        const user = await userService.login(req.body);
        if (user)
        {
            if (user.pass == req.body.pass)
            {
                const token = signToken(user.id);
                return res.status(200).json({ status: "Succes", message: "User login succesfull", token: token })
            }
            else
            {
                return res.status(404).json({ status: "Fail", message: "Password not match" })
            }
        }
        else
        {
            return res.status(404).json({ status: "Fail", message: "user not found" })
        }
    } catch (err)
    {
        res.status(500).json({ status: "Fail", message: `Internal server error. Error: ${err}` })
    }
}

const register = async (req: Request, res: Response) =>
{
    try
    {
        const user = await userService.register(req.body)
        if (user)
        {
            return res.status(200).json({ status: "succes", message: "User registered succesfully" })
        }
        else
        {
            return res.status(404).json({ status: "succes", message: "User not registered" })
        }
    } catch (err)
    {
        res.status(500).json({ status: "Fail", message: `Internal server error. Error: ${err}` })
    }
}
export const userController = {
    login, register
}