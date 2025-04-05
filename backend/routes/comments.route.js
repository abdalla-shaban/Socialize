import { Router } from "express";

import authorize from "./../middlewares/auth.middleware.js";
import {
  addComment,
  deleteComment,
  updateComment,
} from "../controllers/comments.controller.js";

const commentsRoutes = Router();

commentsRoutes.post("/:postId", authorize, addComment);
commentsRoutes
  .route("/:postId/:commentId")
  .patch(authorize, updateComment)
  .delete(authorize, deleteComment);

export default commentsRoutes;
