import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import { noteRouter } from "./routes/noteRouter.js";
import { authRoutes } from "./routes/authRoutes.js";
import { authMiddleware } from "./middleware/authMiddleware.js";
import cookieParser from "cookie-parser";
const env = process.env.NODE_ENV || "development";
dotenv.config({
    path: `.env.${env}`,
});
const mongoDBURL = process.env.DB_URL;
const VERCEL_URL = process.env.VITE_VERCEL;
console.log(mongoDBURL);
const app = express();
app.use(cors({
    origin: ["http://localhost:5173", VERCEL_URL],
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(authRoutes);
// check auth for all note routes
app.use(authMiddleware);
app.use(noteRouter);
mongoose
    .connect(mongoDBURL)
    .then(() => {
    console.log("Sucessfully connected to the Database.");
    app.listen(process.env.PORT, () => console.log("Listening at PORT", process.env.PORT));
})
    .catch((err) => {
    console.log("Error connecting to the Database: ", err);
});
//# sourceMappingURL=server.js.map