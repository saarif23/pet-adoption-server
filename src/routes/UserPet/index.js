const Pets = require('../../modal/Pets');
const verifyToken = require('../../middlewares/verifyToken')
const router = require('express').Router();





// Find all pet by user email ----------------------------------------------------
// router.get('/userAddPet', verifyToken, async (req, res) => {
//     try {
//        const userEmail = req.query.email;
//         const userAddedPet = await Pets.find({ email: userEmail, })

//         res.status(200).send(userAddedPet);
//     } catch (error) {
//         res.status(500).send({ message: error.message });
//     }
// });




router.get('/userAddedPet', verifyToken, async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 0;
        const size = parseInt(req.query.size) || 5;
        const userEmail = req.query.email;

        if (!userEmail) {
            return res.status(400).send({ message: 'Email is required.' });
        }

        const userAddedPet = await Pets.find({ email: userEmail })
            .skip(page * size)
            .limit(size);

        res.status(200).send(userAddedPet);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});




// Find single pet -----------------------------------------------------------
router.get('/userAddedPet/:id', async (req, res) => {
    try {
        const id = req.params.id
        const userAddedPet = await Pets.findById(id);
        res.status(201).send(userAddedPet)
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});



// Find the pet by ID and update its information-----------------------------------
router.put('/userAddedPet/:id', verifyToken, async (req, res) => {
    try {
        const id = req.params.id;
        const updateData = req.body;
        // console.log('object', id);
        // console.log('object', updateData);
        const updatedPet = await Pets.findByIdAndUpdate(id, updateData, { new: true });

        if (!updatedPet) {
            return res.status(404).send({ message: 'Pet not found' });
        }

        res.status(200).send(updatedPet);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});


///// Find the pet by ID and delete it---------------------------------

router.delete('/userAddedPet/:id', verifyToken, async (req, res) => {
    try {
        const id = req.params.id;

        console.log(id, "this is my id");
        const deletedPet = await Pets.findByIdAndDelete(id);

        if (!deletedPet) {
            return res.status(404).send({ message: 'Pet not found' });
        }

        res.status(200).send({ message: 'Pet deleted successfully' });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});


//update user added pet---------------------------------------------------
router.patch('/userAddedPet/:id', verifyToken, async (req, res) => {
    try {
        const id = req.params.id;
        const updateData = { adopted: true };
        const updatedPet = await Pets.findByIdAndUpdate(id, updateData, { new: true });

        if (!updatedPet) {
            return res.status(404).send({ message: 'Pet not found' });
        }
        res.status(200).send({ message: 'Pet adopted successfully' });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});




module.exports = router;






