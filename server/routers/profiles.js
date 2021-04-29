const express = require("express");
const router = express.Router();
const authentication = require("../middleware/authentication");
const profileControllers = require("../controllers/profileControllers.js");
const authorization = require("../middleware/Authorization");

router.get("/",authentication,profileControllers.getProfiles);

// router.post("/",authentication,profileControllers.setProfileId);

router.put("/",authentication,profileControllers.updateProfile);


module.exports=router;