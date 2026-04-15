import mongoose, { Model } from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";
import { noteSchema } from "./noteModel.js";
import type { NoteSchema } from "./noteModel.js";
const Schema = mongoose.Schema;

interface UserSchema {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  notes: mongoose.Types.DocumentArray<NoteSchema>;
}

interface UserModel extends Model<UserSchema> {
  signup(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
  ): Promise<UserSchema>;
  login(email: string, password: string): Promise<UserSchema>;
}

const userSchema = new Schema<UserSchema>(
  {
    firstName: { required: true, type: String },
    lastName: { required: true, type: String },
    email: { required: true, type: String, unique: true },
    password: { required: true, type: String },
    notes: [noteSchema],
  },
  { timestamps: true },
);

userSchema.statics.signup = async function (
  firstName,
  lastName,
  email,
  password,
) {
  if (!validator.isEmail(email)) throw Error("The email is valid");

  if (!validator.isStrongPassword(password))
    throw Error("The password is not strong enough");

  const exist = await this.findOne({ email });
  const SALT_FACTOR = 10;

  if (exist) throw Error("Email Already in use.");

  const salt = await bcrypt.genSalt(SALT_FACTOR);
  const hash = await bcrypt.hash(password, salt);

  const user = this.create({
    firstName,
    lastName,
    email,
    password: hash,
  });

  return user;
};

userSchema.statics.login = async function (email: string, password: string) {
  if (!email || !password) throw Error("All fields must be filled");

  const user = await this.findOne({ email });
  if (!user) throw Error("Incorrect email");

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw Error("Incorrect password");

  return user;
};

export const userModel = mongoose.model<UserSchema, UserModel>(
  "users",
  userSchema,
);
