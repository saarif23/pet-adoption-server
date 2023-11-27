
const { createCookieToken, clearCookieToken } = require('../../api/Authentication/Controller');

// var router = express.Router()
const router = require('express').Router()

router.post('/jwt', createCookieToken);

router.get('/logout', clearCookieToken);



module.exports = router;