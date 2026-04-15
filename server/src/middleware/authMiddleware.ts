import type { Request, Response, NextFunction } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user?:
        | JwtPayload
        | {
            _id: string;
            firstName: string;
            lastName: string;
            email: string;
            password: string;
          };
    }
  }
}

const authMiddleware = (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const token = request.cookies.token; // read JWT from cookie
  console.log("Cookies:", request.cookies);
  console.log("Token:", request.cookies.token);

  if (!token) {
    return response.status(401).json({ error: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string);
    console.log(decoded);
    request.user = decoded as JwtPayload; // attach user to request
    next(); // ✅ valid, proceed to route
  } catch (err) {
    return response.status(401).json({ error: "Invalid or expired token" });
  }
};

export { authMiddleware };
