const Pets = require('../../modal/Pets');
const router = require('express').Router();



router.get('/search', async (req, res) => {
    try {
        const { pet_name, pet_category } = req.query;
        const query = {};

        if (pet_name && !pet_category) {
            query.pet_name = { $regex: new RegExp(pet_name, 'i') };
        } else if (pet_category && !pet_name) {
            query.pet_category = { $regex: new RegExp(pet_category, 'i') };
        } else if (pet_name && pet_category) {
            query.$or = [
                { pet_name: { $regex: new RegExp(pet_name, 'i') } },
                { pet_category: { $regex: new RegExp(pet_category, 'i') } }
            ];
        }

        const petData = await Pets.find(query).sort({ createdAt: -1 });
        res.status(200).send(petData);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});





module.exports = router