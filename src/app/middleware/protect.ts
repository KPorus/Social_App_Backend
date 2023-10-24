import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"
import { PrismaClient} from '@prisma/client'
type jwtTest = jwt.JwtPayload | {
    id:string
}
const prisma = new PrismaClient()
const middleware = async (req: Request, res: Response, next: NextFunction) =>
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
        const token = bearerToken[1];

        try
        {
            console.log(process.env.JWT_SECRET as string);
            // Verify the token using the JWT_SECRET from environment variables
            let decodedToken = jwt.verify(token, process.env.JWT_SECRET as string);
            const verifyUser = decodedToken as jwtTest;
            if (verifyUser && 'id' in verifyUser)
            {
                // Fetch the user from the database using the decoded token
                const user = await prisma.user.findUnique({ where: { id: verifyUser.id } });
    
                // Attach the user to the request object
                req.user = user;
            }

            next();
        } catch (err)
        {
            // Handle errors from jwt.verify
            return res.status(401).json({ message: "Unauthorized" });
        }
    } catch (err)
    {
        next(err);
    }
}

export const protect = middleware;