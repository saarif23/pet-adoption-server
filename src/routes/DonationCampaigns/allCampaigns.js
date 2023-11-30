const Donations = require("../../modal/DonationCampaigns");
const router = require('express').Router();
const verifyToken = require('../../middlewares/verifyToken')
const verifyAdmin = require('../../middlewares/verifyAdmin')


//Find All Pets by admin ------------------------------------
router.get('/allCampaigns', verifyToken, verifyAdmin, async (req, res) => {
    try {
        const allCampaigns = await Donations.find();
        console.log(allCampaigns);
        res.status(201).send(allCampaigns)
    } catch (error) {
        res.status(500).send({ message: error.message })
    }

})

//  Change Adopt Status by admin or user --------------------------------------------------
router.patch("/allCampaigns/:id", verifyToken, async (req, res) => {
    try {
        const id = req.params.id;
        const { status } = req.body;
        // Find the user by ID and update the role
        const updateCampaignStatus = await Donations.findByIdAndUpdate(id, { status }, { new: true });
        if (!updateCampaignStatus) {
            return res.status(404).send({ message: 'User not found' });
        }
        res.send(updateCampaignStatus);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
})

router.delete('/allCampaigns/:id', verifyToken, verifyAdmin, async (req, res) => {
    try {
        const id = req.params.id;
        // console.log(id);

        const deleteCampaign = await Donations.findByIdAndDelete(id);

        if (!deleteCampaign) {
            return res.status(404).send({ message: 'Campaign not found' });
        }

        res.status(200).send({ message: 'Donation Campaign  deleted successfully' });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});






module.exports = router;