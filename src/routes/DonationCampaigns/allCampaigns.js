const Donations = require("../../modal/DonationCampaigns");
const router = require('express').Router();

//Find All Pets by admin ------------------------------------
router.get('/allCampaigns', async (req, res) => {
    try {
        const allCampaigns = await Donations.find();
        console.log(allCampaigns);
        res.status(201).send(allCampaigns)
    } catch (error) {
        res.status(500).send({ message: error.message })
    }

})


module.exports = router;