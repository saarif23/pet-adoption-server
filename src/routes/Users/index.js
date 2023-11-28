const Users = require('../../modal/Users')
const verifyToken = require('../../middlewares/verifyToken')

const router = require('express').Router();

router.post('/users',  async (req, res) => {
    try {
        const userData = req.body
        const newUser = new Users(userData);
        const result = await newUser.save();
        res.status(201).send(result);
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
})




//get admin 
router.get('/users/admin', verifyToken, async (req, res) => {
    try {
        const email = req.query.email

        // Todo ----------------------------
        // if (email !== req.decoded.email) {
        //     return res.status(403).send({ message: 'Forbidden access' });
        // }
        console.log(email);
        const user = await Users.findOne({ email: email });
        let admin = false;

        if (user) {
            admin = user.role === 'admin';
        }
        res.status(201).send({ admin });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }

})




module.exports = router;


