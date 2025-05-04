import { NextFunction, Request, Response } from "express";
import { adminAuth } from "../../config/firebase";
import { User } from "../../models/user";

const isUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Authorization header is missing or invalid" });
        }

        const token = authHeader.split("Bearer ")[1];

        if (!token) {
            return res.status(401).json({ message: "Authorization token is missing" });
        }

        const decodedToken = await adminAuth.verifyIdToken(token);
        const userUid = decodedToken.uid;

        const user = await User.findById(userUid);

        if (!user) {
            return res.status(401).json({ message: "User could not be identified" });
        }

        next();
    } catch (error) {
        next(error);
    }
}

export {
    isUser
};