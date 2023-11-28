const Pets = require('../../modal/Pets');
const verifyToken = require('../../middlewares/verifyToken')

const router = require('express').Router();

router.get('/pets', async (req, res) => {
    try {
        const petData = await Pets.find({ adopted: false }).sort({ createdAt: -1 });
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


router.post('/pets', verifyToken, async (req, res) => {
    try {
        const petData = req.body
        const newPetData = new Pets(petData);
        const result = await newPetData.save();
        res.status(201).send(result);
    } catch (error) {
        res.status(500).send({ message: error.message })
    }

})







// router.post("/pets", async (req, res) => {
//     try {
//         const result = await Pets.insertMany(

//         )
//         res.status(201).send(result);
//     } catch (error) {
//         res.status(500).send({ message: error.message })
//     }

// })




module.exports = router;