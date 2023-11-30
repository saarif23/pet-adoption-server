const UserAdoptReq = require('../../modal/AdoptReq')
const Pets = require('../../modal/Pets');
const verifyToken = require('../../middlewares/verifyToken')

const router = require('express').Router();

router.post('/adoptReq', async (req, res) => {
    try {
        const reqData = req.body
        const newAdoptReq = new UserAdoptReq(reqData);
        const result = await newAdoptReq.save();
        res.status(201).send(result);
    } catch (error) {
        res.status(500).send({ message: error.message })
    }

})


//  my donation page data 
router.get('/adoptReq', verifyToken, async (req, res) => {
    try {
        const userEmail = req.query.email;
        const reqDonations = await UserAdoptReq.find({ email: userEmail });
        res.status(200).send(reqDonations);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});


// delete adopt request by user and admin
router.delete('/adoptReq/:id', verifyToken, async (req, res) => {
    try {
        const id = req.params.id;
        const deleteUserReq = await UserAdoptReq.findByIdAndDelete(id);
        if (!deleteUserReq) {
            return res.status(404).send({ message: 'User not found' });
        }
        res.status(200).send({ message: 'user deleted successfully' });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

//  Change Adopt Status by admin --------------------------------------------------
router.patch("/adoptReq/:id", verifyToken, async (req, res) => {
    try {
        const id = req.params.id;
        const { accepted } = req.body;
        // Find the user by ID and update the role
        const updateUserReq = await UserAdoptReq.findByIdAndUpdate(id, { accepted }, { new: true });
        if (!updateUserReq) {
            return res.status(404).send({ message: 'User not found' });
        }
        res.status(200).send({ message: 'user request accepted' });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
})


router.get('/userAddedAdoptionRequests', verifyToken, async (req, res) => {
    try {
        const loggedInUserEmail = req.query.email;
        const userAddedPets = await Pets.find({ email: loggedInUserEmail });
        // console.log(userAddedPetIds);
        const userAddedPetIds = userAddedPets.map(pet => pet._id);
        // console.log(userAddedPetIds);

        const adoptionRequests = await UserAdoptReq.find({ petId: { $in: userAddedPetIds } });

        res.status(200).json(adoptionRequests);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});




module.exports = router;