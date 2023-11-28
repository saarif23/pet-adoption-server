
const Donations = require("../../modal/DonationCampaigns");
const router = require('express').Router();
const verifyToken = require('../../middlewares/verifyToken')

router.get('/userAddedDonations', verifyToken, async (req, res) => {
    try {
        const userEmail = req.query.email;
        const userAddedDonations = await Donations.find({ email: userEmail });
        res.status(200).send(userAddedDonations);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});


router.get('/userAddedDonations/:id', verifyToken, async (req, res) => {
    try {
        const id = req.params.id
        const userAddedDonation = await Donations.findById(id);
        res.status(201).send(userAddedDonation)
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

// Find the pet by ID and update its information-----------------------------------
router.put('/userAddedDonations/:id', verifyToken, async (req, res) => {
    try {
        const id = req.params.id;
        const updateData = req.body;

        console.log('object', id);
        console.log('object', updateData);
        const updateCompaign = await Donations.findByIdAndUpdate(id, updateData, { new: true });

        if (!updateCompaign) {
            return res.status(404).send({ message: 'Pet not found' });
        }

        res.status(200).send(updateCompaign);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});






module.exports = router;