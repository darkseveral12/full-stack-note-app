import type { Request, Response, NextFunction } from "express";
import { type JwtPayload } from "jsonwebtoken";
declare global {
    namespace Express {
        interface Request {
            user?: JwtPayload | {
                _id: string;
                firstName: string;
                lastName: string;
                email: string;
                password: string;
            };
        }
    }
}
declare const authMiddleware: (request: Request, response: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
export { authMiddleware };
//# sourceMappingURL=authMiddleware.d.ts.map