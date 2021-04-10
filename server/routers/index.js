const router = require('express').Router()

// const todosRoutes = require('./todoRouter');
const usersRoutes = require('./userRouter');
// const apiROUTES = require("./apiRouter");

router.use('/users', usersRoutes);
// router.use('/weather', apiROUTES);
// router.use('/todos',todosRoutes);


module.exports = router