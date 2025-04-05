import { Post } from "../models/post.model.js";

export const addComment = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const { _id } = req.user;
    const { text } = req.body;

    if (!postId) {
      const error = new Error("Invaild ID");
      error.statusCode = 401;
      throw error;
    }

    if (!_id) {
      const error = new Error("Invaild User ID");
      error.statusCode = 401;
      throw error;
    }

    const comment = {
      user: _id,
      text,
    };

    const post = await Post.findById(postId);

    if (!post) {
      const error = new Error("Post not found");
      error.statusCode = 404;
      throw error;
    }

    post.comments.push(comment);

    await post.save();

    res
      .status(201)
      .send({ status: true, message: "Comment Added Successfully!", post });
  } catch (error) {
    next(error);
  }
};

export const updateComment = async (req, res, next) => {
  try {
    const { postId, commentId } = req.params;
    const { _id } = req.user;
    const { text } = req.body;

    if (!postId || !commentId) {
      const error = new Error("Invaild ID");
      error.statusCode = 403;
      throw error;
    }

    if (!_id) {
      const error = new Error("Invaild User ID");
      error.statusCode = 403;
      throw error;
    }

    const post = await Post.findById(postId);

    if (!post) {
      const error = new Error("Post not found");
      error.statusCode = 404;
      throw error;
    }

    const comment = post.comments.id(commentId);

    if (!comment) {
      const error = new Error("Comment not found");
      error.statusCode = 404;
      throw error;
    }

    if (comment.user.toString() !== _id.toString()) {
      const error = new Error("Unauthorized");
      error.statusCode = 200;
      throw error;
    }

    comment.set("text", text);
    await post.save();

    res
      .status(200)
      .send({ status: true, message: "Comment Updated Successfully!" });
  } catch (error) {
    next(error);
  }
};

export const deleteComment = async (req, res, next) => {
  try {
    const { postId, commentId } = req.params;
    const { _id } = req.user;

    if (!postId || !commentId) {
      const error = new Error("Invaild ID");
      error.statusCode = 403;
      throw error;
    }

    if (!_id) {
      const error = new Error("Invaild User ID");
      error.statusCode = 403;
      throw error;
    }

    const post = await Post.findById(postId);

    if (!post) {
      const error = new Error("Post not found");
      error.statusCode = 404;
      throw error;
    }

    const comment = post.comments.id(commentId);

    if (!comment) {
      const error = new Error("Comment not found");
      error.statusCode = 404;
      throw error;
    }

    if (
      comment.user.toString() !== _id.toString() ||
      post.author.toString() !== _id.toString()
    ) {
      const error = new Error("Unauthorized");
      error.statusCode = 200;
      throw error;
    }

    await comment.deleteOne();
    await post.save();

    res
      .status(200)
      .send({ status: true, message: "Comment deleted successfully!" });
  } catch (error) {
    next(error);
  }
};
