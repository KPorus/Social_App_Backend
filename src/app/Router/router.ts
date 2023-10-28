import express from 'express'
import { userRouter } from '../modules/users/user.route';
import { postRouter } from '../modules/posts/posts.route';
import { commentsRouter } from '../modules/comments/comments.route';

const router = express.Router();

const moduleRoute = [
    {
        path:'/user',
        router:userRouter
    },
    {
        path: '/post',
        router: postRouter
    },
    {
        path:'/comments',
        router: commentsRouter
    }
]

moduleRoute.forEach((route)=>router.use(route.path,route.router));

export default router;