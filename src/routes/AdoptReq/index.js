const UserAdoptReq = require('../../modal/AdoptReq')
const verifyToken = require('../../middlewares/verifyToken')

const router = require('express').Router();

router.post('/adoptReq', verifyToken, async (req, res) => {
    try {
        const reqData = req.body
        const newAdoptReq = new UserAdoptReq(reqData);
        const result = await newAdoptReq.save();
        res.status(201).send(result);
    } catch (error) {
        res.status(500).send({ message: error.message })
    }

})

module.exports = router;