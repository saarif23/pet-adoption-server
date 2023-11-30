const Pets = require('../../modal/Pets');
const verifyToken = require('../../middlewares/verifyToken')
const verifyAdmin = require('../../middlewares/verifyAdmin')

const router = require('express').Router();

//Find All Pets by admin ------------------------------------
router.get('/allPets', verifyToken, verifyAdmin, async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 0;
        const size = parseInt(req.query.size) || 5;

        const allPets = await Pets.find()
            .skip(page * size)
            .limit(size);

        res.status(200).send(allPets);

        // const allPets = await Pets.find();
        // console.log(allPets);
        // res.status(201).send(allPets)
    } catch (error) {
        res.status(500).send({ message: error.message })
    }

})




//  Change Adopt Status by admin --------------------------------------------------
router.patch("/allPets/:id", verifyToken, verifyAdmin, async (req, res) => {
    try {
        const id = req.params.id;
        const { adopted } = req.body;
        // Find the user by ID and update the role
        const updatedPetStatus = await Pets.findByIdAndUpdate(id, { adopted }, { new: true });
        if (!updatedPetStatus) {
            return res.status(404).send({ message: 'User not found' });
        }
        res.send(updatedPetStatus);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
})

router.delete('/allPets/:id', verifyToken, verifyAdmin, async (req, res) => {
    try {
        const id = req.params.id;
        // console.log(id);

        const deletePet = await Pets.findByIdAndDelete(id);

        if (!deletePet) {
            return res.status(404).send({ message: 'User not found' });
        }

        res.status(200).send({ message: 'Pet deleted successfully' });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});







module.exports = router;