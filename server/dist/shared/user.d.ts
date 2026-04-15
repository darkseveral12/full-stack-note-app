import { ObjectId } from "mongodb";
interface userSchema {
    _id?: ObjectId;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}
export type { userSchema };
//# sourceMappingURL=user.d.ts.map