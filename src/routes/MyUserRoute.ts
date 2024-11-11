import express from "express";
import MyUserController from "../controllers/MyUserController";
import { jwtCheck, jwtParse } from "../middleware/auth";
import { validateMyUserRequest } from "../middleware/validation";

const router = express.Router();

router.get(
  "/",
  jwtCheck,
  jwtParse as express.Handler,
  MyUserController.getCurrentUser
);
router.post("/", jwtCheck, MyUserController.createCurrentUser);
router.put(
  "/",
  jwtCheck,
  jwtParse as express.Handler,
  validateMyUserRequest as any,
  MyUserController.updateCurrentUser
);

export default router;
