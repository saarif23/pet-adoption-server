const Pets = require('../../modal/Pets');
const verifyToken = require('../../middlewares/verifyToken')

const router = require('express').Router();


// Find All Pets  and check pets are not adopted and sort decending -------------
router.get('/pets', async (req, res) => {
    try {
        const petData = await Pets.find({ adopted: false }).sort({ createdAt: -1 });
        res.status(201).send(petData)
    } catch (error) {
        res.status(500).send({ message: error.message })
    }

})


// Find Single Pet------------------------------------------------------
router.get('/pets/:id', async (req, res) => {
    try {
        const id = req.params.id
        const pet = await Pets.findById(id);
        res.status(201).send(pet)
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
})



// Insert a new Pet by user --------------------------------------------
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


// // Search Pets by Name and Category
// router.get('/pets/search', async (req, res) => {
//     try {
//         const { pet_name, pet_category } = req.query;
//         const query = {};

//         if (pet_name) {
//             query.pet_name = { $regex: new RegExp(pet_name, 'i') };
//         }

//         if (pet_category) {
//             query.pet_category = { $regex: new RegExp(pet_category, 'i') };
//         }

//         query.adopted = false;
//         console.log(query);
//         const petData = await Pets.find(query).sort({ createdAt: -1 });
//         res.status(200).send(petData);
//     } catch (error) {
//         res.status(500).send({ message: error.message });
//     }
// });





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