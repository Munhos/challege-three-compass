import { Router } from "express";
import { signUpController } from "../../controllers/signUpController";
const router = Router();



router.post("/users/sign-up", signUpController);

export { router };