
const jwt = require('jsonwebtoken');
require("dotenv").config();

const generateToken = (user) => {
return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "12h" })
}

module.exports = generateToken;