import express from 'express'
import { userRouter } from '../modules/users/user.route';
import { postRouter } from '../modules/posts/posts.route';

const router = express.Router();

const moduleRoute = [
    {
        path:'/user',
        router:userRouter
    },
    {
        path: '/post',
        router: postRouter
    }
]

moduleRoute.forEach((route)=>router.use(route.path,route.router));

export default router;