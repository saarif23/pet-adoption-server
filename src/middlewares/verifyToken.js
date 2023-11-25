
const jwt = require('jsonwebtoken');
require("dotenv").config();
const verifyToken = (req, res, next) => {

    const token = req?.cookies?.token;
    if (!token) {
        return res.status(401).send({ message: "unauthorized access" })
    }
    jwt.verify(token, process.env.ACCESS_USER_TOKEN, (error, decoded) => {
        if (error) {
            return res.status(401).send({ message: "unauthorized access" })
        }
        req.user = decoded;
        next();
    })

}
module.exports = verifyToken;