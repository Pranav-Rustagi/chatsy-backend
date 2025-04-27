import { NextFunction, Request, Response } from "express";
import { User } from "../models/user";
import responseHandler from "../response/responseHandler";
import { adminAuth } from "../config/firebase";


const checkGoogleUser = async (req: Request, res: Response, next: NextFunction) => {
    console.log("\ncheckGoogleUser: start");

    try {
        const idToken = req.body.token;

        if (!idToken) {
            throw new Error("idToken is required for Google authentication");
        }
        
        const decodedToken = await adminAuth.verifyIdToken(idToken);

        const { email } = decodedToken;
        
        const user = await User.findOne({ email });
        const message = user !== null ? "User exists" : "User does not exist";

        console.log(message);
        console.log("checkGoogleUser: end");
        
        responseHandler({ res, data: { user }, message });
    } catch (error) {
        next(error);
    }
}


export {
    checkGoogleUser
};