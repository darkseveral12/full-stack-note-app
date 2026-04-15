import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";
const createToken = (_id) => jwt.sign({ _id }, process.env.JWT_SECRET_KEY, { expiresIn: "3d" });
export { createToken };
//# sourceMappingURL=jwt-utils.js.map