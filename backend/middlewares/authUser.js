import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const authUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; // "Bearer <token>"
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id; // ✅ store userId here
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
};

export default authUser;
