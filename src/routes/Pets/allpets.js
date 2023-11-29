const Pets = require('../../modal/Pets');
const verifyToken = require('../../middlewares/verifyToken')
const verifyAdmin = require('../../middlewares/verifyAdmin')

const router = require('express').Router();

//Find All Pets by admin ------------------------------------
router.get('/allPets', verifyToken, verifyAdmin, async (req, res) => {
    try {
        const allPets = await Pets.find();
        console.log(allPets);
        res.status(201).send(allPets)
    } catch (error) {
        res.status(500).send({ message: error.message })
    }

})


module.exports = router;