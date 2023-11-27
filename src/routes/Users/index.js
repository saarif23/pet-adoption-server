const Users = require('../../modal/Users');


const router = require('express').Router();

router.get('/users', async (req, res) => {
    const cursor = await Users.find();
    console.log(cursor);
    res.send(cursor)
})

module.exports = router;