import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";
const createToken = (_id: ObjectId) =>
  jwt.sign({ _id }, process.env.JWT_SECRET_KEY as string, { expiresIn: "3d" });

export { createToken };
