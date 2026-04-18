import { userModel } from "../model/userModel.js";
import { createToken } from "./utils/jwt-utils.js";
import { ObjectId } from "mongodb";
export const post_login = async function (request, response) {
    const { email, password } = request.body;
    try {
        const user = await userModel.login(email, password);
        //create a token
        if (user._id) {
            const token = createToken(user._id);
            response.cookie("token", token, {
                httpOnly: true,
                secure: true,
                sameSite: "none",
                maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days
            });
            response.status(200).json({ user });
        }
    }
    catch (err) {
        if (err instanceof Error) {
            response.status(400).json({ error: err.message });
        }
        else {
            response.status(400).json({ error: "something error has occured" });
        }
    }
};
export const post_signup = async function (request, response) {
    const { firstName, lastName, email, password } = request.body;
    console.log(firstName, lastName, email, password);
    try {
        const user = await userModel.signup(firstName, lastName, email, password);
        //create a token
        if (user._id) {
            const token = createToken(user._id);
            response.cookie("token", token, {
                httpOnly: true,
                secure: true,
                sameSite: "none",
                maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days
            });
            response.status(200).json({ user });
        }
    }
    catch (error) {
        if (error instanceof Error) {
            response.status(400).json({ error: error.message });
        }
        else {
            response.status(400).json({ error: "something error has occured" });
        }
    }
};
export const get_logout = async function (request, response) {
    try {
        response.clearCookie("token");
        response.status(200).json({ message: "Logged out successfully" });
    }
    catch (err) {
        if (err instanceof Error) {
            response.status(400).json({ error: err.message });
        }
        else {
            response.status(400).json({ error: "something error has occured" });
        }
    }
};
//# sourceMappingURL=userController.js.map