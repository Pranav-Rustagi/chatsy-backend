import { Router } from "express";
import { searchUsername } from "../controllers";

const searchRouter = Router();

searchRouter.get("/search-username", searchUsername);

export default searchRouter;