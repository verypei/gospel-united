const router = require('express').Router()

const usersRoutes = require('./userRouter');
const prayRoutes = require('./prayRouter');
const supportRoutes = require("./support");
const profilesRoutes = require("./profiles");

router.use('/users', usersRoutes);
router.use('/prays',prayRoutes);
router.use("/support",supportRoutes);
router.use("/profiles",profilesRoutes);
router.use("/profileImage",profilesRoutes);


module.exports = router