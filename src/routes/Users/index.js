const verifyToken = require('../../middlewares/verifyToken')
const verifyAdmin = require('../../middlewares/verifyAdmin')
const Users = require('../../modal/Users')


const router = require('express').Router();



// Check User Exist or not ---------------------------------------

router.put('/users/:email', async (req, res) => {
    try {
        const { email } = req.params;
        const userData = req.body;

        // Check if a user with the provided email already exists
        const existingUser = await Users.findOne({ email });

        if (existingUser) {
            // If user exists, send the existing user data
            return res.send(existingUser);
        }

        // If user doesn't exist, create a new user
        const newUser = new Users({ email, ...userData, timestamp: Date.now() });
        const result = await newUser.save();
        res.status(201).send(result);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});


///// Find the pet by ID and delete it---------------------------------

router.delete('/users/:id', verifyToken, async (req, res) => {
    try {
        const id = req.params.id;
        // console.log(id);

        const deleteUser = await Users.findByIdAndDelete(id);

        if (!deleteUser) {
            return res.status(404).send({ message: 'User not found' });
        }

        res.status(200).send({ message: 'user deleted successfully' });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});


// Verified  Admin or not-------------------------------------------------
router.get('/users/admin', verifyToken, async (req, res) => {
    try {
        // const email = req.query.email
        const email = req.decoded.email;

        const user = await Users.findOne({ email });

        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }

        const admin = user.role === 'admin';
        res.status(200).send({ admin });

    } catch (error) {
        res.status(500).send({ message: error.message });
    }

})



//  make admin by admin user --------------------------------------------------
router.patch("/users/:id", verifyToken, verifyAdmin, async (req, res) => {
    try {
        const id = req.params.id;
        const { role } = req.body;
        // Find the user by ID and update the role
        const updatedUser = await Users.findByIdAndUpdate(id, { role }, { new: true });
        if (!updatedUser) {
            return res.status(404).send({ message: 'User not found' });
        }
        res.send(updatedUser);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
})


//Find All User by admin ------------------------------------
router.get('/users', verifyToken, verifyAdmin, async (req, res) => {
    try {
        const userInfo = await Users.find();
        res.status(201).send(userInfo)
    } catch (error) {
        res.status(500).send({ message: error.message })
    }

})






module.exports = router;


