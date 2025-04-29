const jwt = require("jsonwebtoken");
const JWT_SECRETKEY = process.env.JWT_SECRETKEY;

const authMiddleware = function (req, res, next) {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(403).send("Access denied");
  
    try {
        const decoded = jwt.verify(token, JWT_SECRETKEY);
        req.user = decoded;
        next();
    } catch {
        res.status(401).send("Invalid token");
    }
};

module.exports = authMiddleware;