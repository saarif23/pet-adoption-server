const Donations = require("../../modal/DonationCampaigns");
const verifyToken = require('../../middlewares/verifyToken')

const router = require('express').Router();

router.get('/donationCampaigns', async (req, res) => {
    try {
        const campaignsData = await Donations.find().sort({ createdAt: -1 });
        res.status(201).send(campaignsData)
    } catch (error) {
        res.status(500).send({ message: error.message })
    }

})


router.patch('/donationCampaigns/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const newDonation = parseInt(req.body.donated_amount);

        console.log("new donate amoutn", newDonation);
        const donationCampaign = await Donations.findById(id);
        if (!donationCampaign) {
            return res.status(404).send({ message: 'Donation campaign not found' });
        }

        let currentDonatedAmount = donationCampaign.donated_amount || 0;
        const totalDonation = currentDonatedAmount + newDonation;

        const updatedAmout = await Donations.findByIdAndUpdate(
            id,
            { donated_amount: totalDonation },
        );
        console.log('amout ktoo', updatedAmout);
        if (!updatedAmout) {
            return res.status(404).send({ message: 'Failed to update donation amount' });
        }

        res.status(200).send({ message: 'Donation amount updated successfully' });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});





router.get('/donationCampaigns/:id', async (req, res) => {
    try {
        const id = req.params.id
        const donations = await Donations.findById(id);
        res.status(201).send(donations)
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
})


router.post('/donationCampaigns', verifyToken, async (req, res) => {
    try {
        const campaignData = req.body
        const newCampaignData = new Donations(campaignData);
        const result = await newCampaignData.save();
        res.status(201).send(result);
    } catch (error) {
        res.status(500).send({ message: error.message })
    }

})




module.exports = router;