import { Router } from "express";
import { checkExistingUser, saveNewUserInfo } from "../controllers";

const authRouter = Router();

authRouter.post("/check-existing-user", checkExistingUser);
authRouter.post("/save-new-user-info", saveNewUserInfo);

export default authRouter;