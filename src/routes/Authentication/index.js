
const jwt = require('jsonwebtoken');
require("dotenv").config();
const router = require('express').Router()

router.post('/jwt', async (req, res) => {
    try {
        const user = req.body
        console.log(user);
        const token = await jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '12h' })
        res.status(201).send(token);
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
});



module.exports = router;
