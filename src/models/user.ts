import mongoose from "mongoose";

export interface UserInterface {
    email: string;
    username: string;
    avatar_url: string;
    about: string;
    onboarded: boolean;
    created_at: Date;
}

const UserSchema = new mongoose.Schema<UserInterface>({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    avatar_url: {
        type: String,
        required: false,
    },
    about: {
        type: String,
        required: false,
    },
    onboarded: {
        type: Boolean,
        required: true,
        default: false,
    },
    created_at: {
        type: Date,
        required: true,
        default: Date.now
    }
});

export const User = mongoose.model<UserInterface>("User", UserSchema);