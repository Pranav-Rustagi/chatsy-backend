import { Router } from "express";
import { checkGoogleUser } from "../controllers/auth";

const authRouter = Router();

authRouter.post("/check-google-user", checkGoogleUser);

export default authRouter;