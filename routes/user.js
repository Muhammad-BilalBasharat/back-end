import express from "express";
import  {
  getUsers,
  getUser,
  signupUser,
  userLogin,
  changePassword
} from "../controller/users.js";
import validateId from "../middleware/validateId.js";
import verifyToken from "../middleware/auth.js";

const router = express.Router();
router.get("/users", getUsers);
router.get("/users:id", validateId, getUser);
router.post("/register", signupUser);
router.post("/login", userLogin);
router.put("/change-password/:id", validateId,verifyToken , changePassword);

export default router;