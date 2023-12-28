import { Router } from "express";
import { teste01 } from "../../controllers/teste01";
const router = Router();

router.get("/", teste01);

export { router };