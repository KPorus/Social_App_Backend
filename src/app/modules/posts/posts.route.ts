import express from "express";
import { postController } from "./posts.controller";
import { protect } from "../../middleware/protect";
const router = express.Router();

router.get('/', protect, postController.getAllPost);
router.post('/addpost', protect, postController.createPost);

export const postRouter = router