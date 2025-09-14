console.clear();

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import errorHandler from "./response/errorHandler";
import authRouter from "./routes/auth";
import searchRouter from "./routes/search";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/search", searchRouter);

app.use(errorHandler);

export default app;