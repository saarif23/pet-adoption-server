const Pets = require('../../modal/Pets');


const router = require('express').Router();

router.get('/pets', async (req, res) => {
    try {
        const petData = await Pets.find().sort({ createdAt: -1 });
        res.status(201).send(petData)
    } catch (error) {
        res.status(500).send({ message: error.message })
    }

})

router.get('/pets/:id', async (req, res) => {
    try {
        const id = req.params.id
        const pet = await Pets.findById(id);
        res.status(201).send(pet)
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
})



module.exports = router;