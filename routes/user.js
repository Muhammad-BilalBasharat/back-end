import express from "express";
import  {
  getUsers,
  getUser,
  signupUser,
  userLogin
} from "../controller/users.js";
import validateId from "../middleware/validateId.js";


const router = express.Router();
router.get("/users", getUsers);
router.get("/users:id", validateId, getUser);
router.post("/register", signupUser);
router.post("/login", userLogin);

export default router;