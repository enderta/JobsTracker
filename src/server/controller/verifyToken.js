const jwt = require("jsonwebtoken");
const secret = "secret";

const verifyToken = (req, res, next) => {
    jwt.verify(req.headers.authorization, secret, (error, decoded) => {
        if(error) {
            res.status(401).json({error: "Unauthorized"});
        } else {
            req.decoded = decoded;
            next();
        }
    });
};

module.exports = verifyToken;