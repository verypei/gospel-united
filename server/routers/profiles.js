const express = require("express");
const router = express.Router();
const authentication = require("../middleware/authentication");
const profileControllers = require("../controllers/profileControllers.js");
const upload = require("../helper/multer.js");

router.get("/",authentication,profileControllers.getProfiles);

router.get("/:id",authentication,profileControllers.getOtherProfiles);

router.put("/",authentication,(req,res,next)=>{
    console.log(req.body); 
    next()
},profileControllers.updateProfile);

module.exports=router;