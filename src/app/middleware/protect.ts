import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"
import { PrismaClient, User } from '@prisma/client'

const prisma = new PrismaClient()
module.exports = async (req: Request, res: Response, next: NextFunction) =>
{
    try
    {
        // Check if the authorization header is present in the request
        if (!req.headers["authorization"])
        {
            return res.status(401).json({ message: "Not logged in" });
        }

        // Extract the token from the authorization header
        const authHeader = req.headers["authorization"];
        const bearerToken = authHeader.split(" ");
        const token = authHeader; //bearerToken[1];

        // Verify the token using the JWT_SECRET from environment variables
        jwt.verify(token, process.env.JWT_SECRET, async (err, payload:User) =>
        {
            if (err)
            {
                return res.status(401).json({ message: "Unauthorized" });
            }

            // Fetch the user details from the database based on the payload
            req.user = await prisma.user.findUnique({ where:{
                id:payload.id
            }});

            // Check if the user exists
            if (!req.user)
            {
                return next("user not found");
            }

            next(); // Continue to the next middleware
        })
    } catch (err)
    {
        next(err);
    }
}