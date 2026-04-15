import { Router } from "express";
import { post_login, post_signup, get_logout, } from "../controller/userController.js";
export const authRoutes = Router();
authRoutes.post("/auth/login", post_login);
authRoutes.post("/auth/signup", post_signup);
authRoutes.get("/auth/logout", get_logout);
//# sourceMappingURL=authRoutes.js.map