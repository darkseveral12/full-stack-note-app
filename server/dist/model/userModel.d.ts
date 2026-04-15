import mongoose, { Model } from "mongoose";
import type { NoteSchema } from "./noteModel.js";
interface UserSchema {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    notes: mongoose.Types.DocumentArray<NoteSchema>;
}
interface UserModel extends Model<UserSchema> {
    signup(firstName: string, lastName: string, email: string, password: string): Promise<UserSchema>;
    login(email: string, password: string): Promise<UserSchema>;
}
export declare const userModel: UserModel;
export {};
//# sourceMappingURL=userModel.d.ts.map