import type { Request, Response } from "express";
import { userModel } from "../model/userModel.js";
import { createToken } from "./utils/jwt-utils.js";
import type { userSchema } from "../shared/user.js";
import { ObjectId } from "mongodb";

export const post_login = async function (
  request: Request,
  response: Response,
) {
  const { email, password }: { email: string; password: string } = request.body;

  try {
    const user: userSchema = await userModel.login(email, password);

    //create a token
    if (user._id) {
      const token = createToken(user._id as ObjectId);

      response.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days
      });

      response.status(200).json({ user });
    }
  } catch (err) {
    if (err instanceof Error) {
      response.status(400).json({ error: err.message });
    } else {
      response.status(400).json({ error: "something error has occured" });
    }
  }
};

export const post_signup = async function (
  request: Request,
  response: Response,
) {
  const { firstName, lastName, email, password }: userSchema = request.body;
  console.log(firstName, lastName, email, password);
  try {
    const user: userSchema = await userModel.signup(
      firstName,
      lastName,
      email,
      password,
    );

    //create a token
    if (user._id) {
      const token = createToken(user._id as ObjectId);
      response.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days
      });
      response.status(200).json({ user });
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      response.status(400).json({ error: error.message });
    } else {
      response.status(400).json({ error: "something error has occured" });
    }
  }
};

export const get_logout = async function (
  request: Request,
  response: Response,
) {
  try {
    response.clearCookie("token");
    response.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    if (err instanceof Error) {
      response.status(400).json({ error: err.message });
    } else {
      response.status(400).json({ error: "something error has occured" });
    }
  }
};
