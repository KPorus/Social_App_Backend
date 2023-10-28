import express from "express";
import { protect } from "../../middleware/protect";
import { commentsController } from "./comments.controller";
const router = express.Router();

router.post("/add",protect,commentsController.addComment);
router.get("/getAll",protect,commentsController.getAllComment);
router.patch("/edit",protect,commentsController.updateComment);
router.delete("/delete",protect,commentsController.deleteComment);

export const commentsRouter = router