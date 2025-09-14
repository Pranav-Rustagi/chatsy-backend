import { NextFunction, Request, Response } from "express";
import { adminAuth } from "../config/firebase";
import { User } from "../models";
import { responseHandler } from "../response";
import { logFunctionEnd, logFunctionStart } from "../utilities";


const checkExistingUser = async (req: Request, res: Response, next: NextFunction) => {
    logFunctionStart("checkExistingUser");

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

        logFunctionEnd("checkExistingUser");
        
        responseHandler({ res, data: { user }, message });
    } catch (error) {
        next(error);
    }
}


const saveNewUserInfo = async (req: Request, res: Response, next: NextFunction) => {
    logFunctionStart("saveNewUserInfo");
    
    try {
        const { email, username, avatarUrl, description } = req.body;

        await User.create({ email, username, avatarUrl, description });

        const message = "User created successfully";
        
        console.log(message);
        
        logFunctionEnd("saveNewUserInfo");
        
        responseHandler({ res, message });
    } catch (error) {
        next(error);
    }
}


export {
    checkExistingUser,
    saveNewUserInfo
};