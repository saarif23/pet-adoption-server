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
// // Search Pets by Name and Category
// router.get('/allPets/search', async (req, res) => {
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

router.delete('/allPets/:id', verifyToken,verifyAdmin, async (req, res) => {
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