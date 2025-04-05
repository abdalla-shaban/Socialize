import { Router } from "express";
import authorize from "./../middlewares/auth.middleware.js";
import {
  createPost,
  deletePost,
  getPosts,
  getSinglePost,
  updatePost,
  getUserPosts,
} from "../controllers/posts.controller.js";

const postRoutes = Router();

postRoutes.route("").get(authorize, getPosts).post(authorize, createPost);
postRoutes
  .route("/:id")
  .get(authorize, getSinglePost)
  .patch(authorize, updatePost)
  .delete(deletePost);

postRoutes.get("/user/:id", authorize, getUserPosts);

export default postRoutes;
