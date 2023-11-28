
const jwt = require('jsonwebtoken');
require("dotenv").config();

const verifyToken = (req, res, next) => {

    // console.log(req.headers.authorization.split(" ")[1]);
    if (!req.headers.authorization) {
        // console.log("hello ");
        return res.status(401).send({ message: "unauthorized access" })
    }
    const token = req.headers.authorization.split(" ")[1]
    // console.log("token", token);
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, decoded) => {
        if (error) {
            // console.log('object');
            return res.status(401).send({ message: "unauthorized access" })
        }
        req.decoded = decoded
        next();
    })
}


module.exports = verifyToken;



// const token = req?.cookies?.token;
// console.log("token number is" , token);
// if (!token) {
//     return res.status(401).send({ message: "unauthorized access status code 401" })
// }
// jwt.verify(token, process.env.ACCESS_USER_TOKEN, (error, decoded) => {
//     if (error) {
//         return res.status(401).send({ message: "unauthorized access status code 403 " })
//     }
//     req.user = decoded;
//     next();
// })