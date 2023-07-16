const jwt = require("jsonwebtoken");

const dotenv = require("dotenv");

dotenv.config();

const verifyToken = (req, res, next) => {
    jwt.verify(req.headers.authorization, process.env.SECRET, (error, decoded) => {
        if(error) {
            res.status(401).json({error: "Unauthorized"});
        } else {
            req.decoded = decoded;
            next();
        }
    });
};

module.exports = verifyToken;