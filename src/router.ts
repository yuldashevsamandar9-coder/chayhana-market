import express, { Request, Response } from "express";
const router = express.Router();
import memberController from "./controllers/member.controller";

/** REACT uchun foydalanamiz */
router.post("/login", memberController.login);
router.post("/signup", memberController.signup);

/** Member */

/** Product */

/** Order */
export default router;
