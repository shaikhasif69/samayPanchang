import jwt from "jsonwebtoken";
const JWT_SECRET = "IAMCUTE";

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log("Decoded JWT:", decoded);
    req.userId = decoded.id;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

// module.exports = authMiddleware;
