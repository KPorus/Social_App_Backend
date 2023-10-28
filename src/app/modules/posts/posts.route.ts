import express from "express";
import { postController } from "./posts.controller";
import { protect } from "../../middleware/protect";
const router = express.Router();

router.get('/', protect, postController.getAllPost);
router.post('/addpost', protect, postController.createPost);
router.delete('/deletePost', protect, postController.deletePost);
router.patch('/updatePost', protect, postController.updatePost);
router.put('/likeDislikePost', protect, postController.likeDislikePost);

export const postRouter = router