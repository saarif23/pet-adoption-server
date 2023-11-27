const Categories = require('../../modal/Categories');


const router = require('express').Router();

router.get('/categories', async (req, res) => {
    try {
        const categoriesData = await Categories.find()
        res.status(201).send(categoriesData)
    } catch (error) {
        res.status(500).send({ message: error.message })
    }

})



module.exports = router;