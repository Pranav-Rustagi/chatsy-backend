import { NextFunction, Request, Response } from "express";

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    console.error("\nerrorHandler: start");
    
    const statusCode = err?.code || 500;
    const message = err?.message || "Something went wrong";
    
    console.error("Error message:", message, "\n");

    res.status(statusCode).send({ error: message });
}

export default errorHandler;