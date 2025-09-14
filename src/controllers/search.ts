import { NextFunction, Request, Response } from "express";
import { User } from "../models";
import { responseHandler } from "../response";
import { logFunctionEnd, logFunctionStart } from "../utilities";

const searchUsername = async (req: Request, res: Response, next: NextFunction) => {
    logFunctionStart("searchUsername");

    try {
        const searchedTerm:string = req.query.searchedTerm as string;

        console.log("Checking users with similar usernames: ", searchedTerm);

        const users = await User.find({
            username: { $regex: new RegExp(searchedTerm, "i") }
        }).limit(10);

        const message = users.length ? "Users found matching the searched term" : "No users found matching the searched term";

        console.log(message);

        logFunctionEnd("searchUsername");

        responseHandler({ res, data: { users }, message });
    } catch (error) {
        next(error);
    }
}

export {
    searchUsername
}