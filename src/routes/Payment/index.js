const Payments = require('../../modal/Payment')
const router = require('express').Router();
const verifyToken = require('../../middlewares/verifyToken')

// Insert a new payment by user --------------------------------------------
router.post('/payments', async (req, res) => {
    try {
        const paymentData = req.body
        const data = new Payments(paymentData);
        const result = await data.save();
        console.log(result);
        res.status(201).send(result);
    } catch (error) {
        res.status(500).send({ message: error.message })
    }

})

// Find all payment  by logged user -----------------------------------------------
router.get('/payments', verifyToken, async (req, res) => {
    try {
        const userEmail = req.query.email;
        const userPaymentInfo = await Payments.find({ email: userEmail });
        res.status(200).send(userPaymentInfo);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

module.exports = router;