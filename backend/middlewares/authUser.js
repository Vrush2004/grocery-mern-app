import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No token", success: false });
    }

    // Verify token using your secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token:", decoded);

    // Attach userId for future use
    if (decoded?.id) {
      req.userId = decoded.id;  // better than putting inside req.body
      next();
    } else {
      return res.status(403).json({ success: false, message: "Not authorized" });
    }

  } catch (error) {
    console.error("Error in authUser middleware:", error.message);
    return res.status(401).json({ message: "Invalid token", success: false });
  }
};

export default authUser;
