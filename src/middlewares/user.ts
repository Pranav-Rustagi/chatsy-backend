import { NextFunction, Request, Response } from "express";
import { adminAuth } from "../config/firebase";
import { User } from "../models";

const isUser = async (req: Request, res: Response, next: NextFunction) => {
    console.log("\n===========================================\n");
    console.log("isUser: start\n");

    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            res.status(401).send({ message: "Authorization header is missing or invalid" });
            return;
        }

        console.log("Authorization header found, extracting token...");

        const token = authHeader.split("Bearer ")[1];

        if (!token) {
            res.status(401).send({ message: "Authorization token is missing" });
            return;
        }
        
        console.log("Token extracted, verifying...");

        const decodedToken = await adminAuth.verifyIdToken(token);
        const userUid = decodedToken.uid;

        const user = await User.findById(userUid);

        if (!user) {
            res.status(401).send({ message: "User could not be identified" });
            return;
        }

        console.log("User identified successfully:", user.username);

        console.log("\searchUsername: end");
        console.log("\n===========================================\n");

        next();
    } catch (error) {
        next(error);
    }
}

export {
    isUser
};