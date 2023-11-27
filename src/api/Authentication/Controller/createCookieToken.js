const generateToken = require("../../../utils/generateToken");


const createCookieToken = async (req, res) => {
    const user = req.body;
    console.log("user in  post api ", user);
    const token = generateToken(user)
    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production" ? true : false,
        sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",

    })
        .send({ success: true })
}

module.exports = createCookieToken;