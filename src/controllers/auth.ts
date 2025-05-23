import { NextFunction, Request, Response } from "express";
import { User } from "../models/user";
import { adminAuth } from "../config/firebase";
import responseHandler from "../response/responseHandler";


const checkExistingUser = async (req: Request, res: Response, next: NextFunction) => {
    console.log("\n===========================================\n");
    console.log("checkExistingUser: start\n");

    try {
        const { token } = req.body;

        if (!token) {
            throw new Error("Auth token is required for checking existing user");
        }

        const decodedToken = await adminAuth.verifyIdToken(token);
        const { email } = decodedToken;

        console.log("Checking user with email:", email);

        const user = await User.findOne({ email });
        const message = user !== null ? "\nUser exists: " : "\nUser does not exist";

        console.log(message, user || "");
        console.log("\ncheckExistingUser: end");
        console.log("\n===========================================\n");
        
        responseHandler({ res, data: { user }, message });
    } catch (error) {
        next(error);
    }
}


const saveNewUserInfo = async (req: Request, res: Response, next: NextFunction) => {
    console.log("\n===========================================\n");
    console.log("saveNewUserInfo: start\n");
    
    try {
        const { email, username, avatar_url, about } = req.body;

        await User.create({ email, username, avatar_url, about });

        const message = "User created successfully";
        
        console.log(message);
        console.log("\nsaveNewUserInfo: end");
        console.log("\n===========================================\n");
        
        responseHandler({ res, message });
    } catch (error) {
        next(error);
    }
}


export {
    checkExistingUser,
    saveNewUserInfo
};