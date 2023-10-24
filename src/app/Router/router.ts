import express from 'express'
import { userRouter } from '../modules/users/user.route';

const router = express.Router();

const moduleRoute = [
    {
        path:'/user',
        router:userRouter
    }
]

moduleRoute.forEach((route)=>router.use(route.path,route.router));

export default router;