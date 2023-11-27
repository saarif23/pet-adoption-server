
const clearCookieToken = async (req, res) => {
    // const user = req.body;
    // console.log('delete post ', user)
    res.clearCookie('token', { maxAge: 0 }).send({ success: true })
}

module.exports = clearCookieToken;


