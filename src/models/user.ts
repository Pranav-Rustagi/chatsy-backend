import mongoose from "mongoose";

export interface UserInterface {
    email: string;
    username: string;
    displayName?: string;
    avatarUrl: string;
    description?: string;
    createdAt: Date;
}

const UserSchema = new mongoose.Schema<UserInterface>({
    email: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    displayName: {
        type: String,
        required: false,
        default: "Chatsy User",
        index: true
    },
    avatarUrl: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false,
        default: "Hey there! I'm using Chatsy."
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }
});

export const User = mongoose.model<UserInterface>("User", UserSchema);