import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { JWT_EXPIRES_IN, JWT_SECRET } from "../config/env.js";

export const signUp = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const error = new Error("User already exists");
      error.statusCode = 409;
      throw error;
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    const user = await User.findOne({ email }).select("-password");
    res.status(201).send({
      status: true,
      message: "User Created Successfully!",
      user,
    });
  } catch (error) {
    next(error);
  }
};

export const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordValid) {
      const error = new Error("Invalid Credentials");
      error.statusCode = 401;
      throw error;
    }

    const token = jwt.sign({ userId: existingUser._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    const user = await User.findOne({ email }).select("-password");

    res.status(200).send({
      status: true,
      message: "Signed in Successfully!",
      token: `Bearer ${token}`,
      user,
    });
  } catch (error) {
    next(error);
  }
};
