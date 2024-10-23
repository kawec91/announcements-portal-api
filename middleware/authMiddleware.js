//import jwt from "jsonwebtoken";
const jwt = require("jsonwebtoken");

// Middleware to authenticate user using JWT
const authMiddleware = (req, res, next) => {
  // Get token from the Authorization header (Bearer token)
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "No token provided, authorization denied" });
  }

  const token = authHeader.split(" ")[1]; // Extract token from "Bearer <token>"

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user info to the request object
    req.user = decoded;

    // Proceed to the next middleware or route
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token is not valid" });
  }
};

//export default authMiddleware;
module.exports = authMiddleware;
