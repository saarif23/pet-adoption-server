const Admin = require('../modal/Users')
const router = require('express').Router();
const verifyAdmin = async (req, res, next) => {
    const email = req.decoded.email;

    try {
        const user = await Admin.findOne({ email });

        if (!user || user.role !== 'admin') {
            return res.status(403).send({ message: 'Forbidden access' });
        }
        next();
    } catch (error) {
        // Handle any potential errors
        res.status(500).send({ message: error.message });
    }
}


module.exports = verifyAdmin;