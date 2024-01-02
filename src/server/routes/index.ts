/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from "express";
import { signUpController } from "../../controllers/signUpController";
import { signInController } from "../../controllers/signInController";
import { createEventsController } from "../../controllers/createEventsController";
import { checkToken } from "../../middleware/checkToken";
import { getAllEventsController } from "../../controllers/getAllEventsController";
import { getEspecificEventController } from "../../controllers/getEspecificEventController";
const router = Router();

router.post("/users/sign-up", signUpController);
router.post("/users/sign-in", signInController);

router.post("/events", checkToken, createEventsController);
router.get("/events", checkToken, getAllEventsController);

router.get("/events/:id",checkToken, getEspecificEventController);

export { router };