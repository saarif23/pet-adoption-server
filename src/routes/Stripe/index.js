const router = require('express').Router();
require("dotenv").config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

router.post('/create-payment-intent', async (req, res) => {
    try {
        const {donate} = req.body
        const amount = parseInt(donate * 100)
        console.log(amount);
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: "usd",
            payment_method_types: ['card']
        });
        res.status(201).send({
            clientSecret: paymentIntent.client_secret
        });
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
});



module.exports = router;
