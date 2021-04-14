const router = require('express').Router()

const usersRoutes = require('./userRouter');
const prayRoutes = require('./prayRouter');
// const apiROUTES = require("./apiRouter");

router.use('/users', usersRoutes);
router.use('/prays',prayRoutes);
// router.use('/weather', apiROUTES);


module.exports = router