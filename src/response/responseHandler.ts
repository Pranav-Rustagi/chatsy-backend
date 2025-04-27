import { Response } from "express";

interface responseHandlerProps {
    res: Response,
    data?: any,
    status?: number,
    message?: string
}

const responseHandler = ({ res, data = null, status = 200, message = "Success" }: responseHandlerProps) => {
    res.status(status).send({ data, message });
}

export default responseHandler;