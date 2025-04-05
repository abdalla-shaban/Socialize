import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.js";
import { User } from "../models/user.model.js";

const authorize = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers["authorization" || "Authorization"] &&
      req.headers["authorization" || "Authorization"].startsWith("Bearer")
    ) {
      token = req.headers["authorization" || "Authorization"].split(" ")[1];
    }

    if (!token) {
      return res.status(401).send({ message: "Unauthorized" });
    }

    const decoded = jwt.decode(token, JWT_SECRET);

    if (!decoded) {
      return res.status(401).send({ message: "Unauthorized" });
    }

    const uesr = await User.findById(decoded.userId);
    if (!uesr) {
      return res.status(401).send({ message: "Unauthorized" });
    }
    req.user = uesr;

    next();
  } catch (error) {
    res.status(401).send({ message: "Unauthorized", message: error.message });
  }
};

export default authorize;
