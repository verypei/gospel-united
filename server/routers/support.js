const express = require("express");
const router = express.Router();
const authentication = require("../middleware/authentication");
// const authorization = require("../middleware/Authorization");
const supportControllers = require("../controllers/supportControllers.js");

router.put("/add/:id",authentication,supportControllers.addSupport);

router.put("/less/:id",authentication, supportControllers.lessSupport);


module.exports=router;