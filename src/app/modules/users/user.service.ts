import { loginUser } from "./user.instance";
import { PrismaClient, User } from '@prisma/client'

const prisma = new PrismaClient()

const login =async (data:loginUser):Promise<User | null> => {
    const result = await prisma.user.findUnique({
        where:{
            email:data.email
        }
    })
    return result;
}

const register = async (data: User): Promise<User | null> =>
{
    const result = await prisma.user.create({
        data
    })
    return result;
}

export const userService = {
    login,register
}