/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from "express";
import { signUpController } from "../../controllers/signUpController";
import { signInController } from "../../controllers/signInController";
const router = Router();

router.post("/users/sign-up", signUpController);
router.post("/users/sign-in", signInController);

export { router };