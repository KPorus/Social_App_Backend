import express from "express";
import { postController } from "./posts.controller";
const router = express.Router();

router.get('/',postController.getAllPost);

export const postRouter = router