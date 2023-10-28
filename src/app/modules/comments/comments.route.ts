import express from "express";
import { protect } from "../../middleware/protect";
import { commentsController } from "./comments.controller";
const router = express.Router();

router.post("/add",protect,commentsController.addComment);
router.get("/getAll",protect,commentsController.getAllComment);

export const commentsRouter = router