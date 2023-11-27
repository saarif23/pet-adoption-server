const Donations = require("../../modal/DonationCampaigns");

const router = require('express').Router();

router.get('/donationCampaigns', async (req, res) => {
    try {
        const campaignsData = await Donations.find().sort({ createdAt: -1 });
        res.status(201).send(campaignsData)
    } catch (error) {
        res.status(500).send({ message: error.message })
    }

})
router.get('/donationCampaigns/:id', async (req, res) => {
    try {
        const id = req.params.id
        const donations = await Donations.findById(id);
        res.status(201).send(donations)
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
})

module.exports = router;