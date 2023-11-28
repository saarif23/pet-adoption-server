
const Donations = require("../../modal/DonationCampaigns");
const router = require('express').Router();

router.get('/userAddedDonations', async (req, res) => {
    try {
        const userEmail = req.query.email;
        const userAddedDonations = await Donations.find({ email: userEmail });
        res.status(200).send(userAddedDonations);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});


router.get('/userAddedDonations/:id', async (req, res) => {
    try {
        const id = req.params.id
        const userAddedDonation = await Donations.findById(id);
        res.status(201).send(userAddedDonation)
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});



module.exports = router;