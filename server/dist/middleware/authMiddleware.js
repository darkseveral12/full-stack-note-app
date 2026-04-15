import jwt, {} from "jsonwebtoken";
const authMiddleware = (request, response, next) => {
    const token = request.cookies.token; // read JWT from cookie
    console.log("Cookies:", request.cookies);
    console.log("Token:", request.cookies.token);
    if (!token) {
        return response.status(401).json({ error: "Unauthorized" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        console.log(decoded);
        request.user = decoded; // attach user to request
        next(); // ✅ valid, proceed to route
    }
    catch (err) {
        return response.status(401).json({ error: "Invalid or expired token" });
    }
};
export { authMiddleware };
//# sourceMappingURL=authMiddleware.js.map