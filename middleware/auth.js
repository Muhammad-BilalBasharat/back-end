import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  try {
    const token = req.headers["authorization"]?.split(" ")[1]; // Extract token from the Authorization header
    if (!token) {
        return res.status(401).json({
            message: "Unauthorized",
            data: null,
            error: "No token provided",
        });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({
                message: "Forbidden",
                data: null,
                error: "Invalid token",
            });
        }
        req.userId = decoded.id; // Store user ID in request object for later use
        next(); // Proceed to the next middleware or route handler
    });
  } catch (error) {
    return res.status(401).json({
      message: "internal server error",
      data: null,
      error: error.message,
    });
  }
}
export default verifyToken;