const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();


const authMiddleware = (req, res, next) => {
    try {
        
        const token =
            req.cookies?.token ||
            req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                message: "Token missing"
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_TOKEN);

        req.user = {
            id: decoded.id,
            role: decoded.role
        };

        next();

    } catch (error) {
        console.error("JWT ERROR:", error.message);
        return res.status(401).json({
            message: "Invalid or expired token"
        });
    }
};

module.exports = authMiddleware;
