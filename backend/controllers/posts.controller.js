import { Post } from "./../models/post.model.js";

export const getPosts = async (req, res, next) => {
  try {
    const posts = await Post.find();

    res.status(201).send({
      status: true,
      posts,
    });
  } catch (error) {
    next(error);
  }
};

export const getUserPosts = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      const error = new Error("Invalid ID");
      error.statusCode = 404;
      throw error;
    }
    const posts = await Post.find({ author: id });

    res.status(201).send({
      status: true,
      posts,
    });
  } catch (error) {
    next(error);
  }
};

export const getSinglePost = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      const error = new Error("Invalid ID");
      error.statusCode = 404;
      throw error;
    }

    const post = await Post.findById(id);

    if (!post) {
      const error = new Error("Post not found");
      error.statusCode = 404;
      throw error;
    }

    res.status(201).send({
      status: true,
      post,
    });
  } catch (error) {
    next(error);
  }
};

export const createPost = async (req, res, next) => {
  try {
    const { content, image } = req.body;

    const newPost = await Post.create({
      author: req.user._id,
      content,
      image,
    });

    res.status(201).send({
      status: true,
      message: "Post Created Successfully!",
      post: newPost,
    });
  } catch (error) {
    next(error);
  }
};

export const updatePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { content, image } = req.body;

    if (!id) {
      const error = new Error("Invalid ID");
      error.statusCode = 404;
      throw error;
    }

    const updatedPost = await Post.findByIdAndUpdate(id, {
      content,
      image,
    });

    if (!updatedPost) {
      const error = new Error("Post not found");
      error.statusCode = 404;
      throw error;
    }

    res.status(201).send({
      status: true,
      message: "Post updated successfully!",
    });
  } catch (error) {
    next(error);
  }
};

export const deletePost = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      const error = new Error("Invalid ID");
      error.statusCode = 404;
      throw error;
    }

    const deletedPost = await Post.findByIdAndDelete(id);

    if (!deletedPost) {
      const error = new Error("Post not found");
      error.statusCode = 404;
      throw error;
    }

    res.status(201).send({
      status: true,
      message: "Post deleted successfully!",
    });
  } catch (error) {
    next(error);
  }
};
