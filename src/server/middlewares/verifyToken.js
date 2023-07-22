const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({error: "Unauthorized"});
    }

    jwt.verify(token, process.env.SECRET, (error, decoded) => {
        if (error) {
            return res.status(401).json({error: "Unauthorized"});
        } else {
            req.decoded = decoded;
            next();
        }
    });
};

module.exports = verifyToken;