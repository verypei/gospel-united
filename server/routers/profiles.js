const express = require("express");
const router = express.Router();
const authentication = require("../middleware/authentication");
const profileControllers = require("../controllers/profileControllers.js");
// const authorization = require("../middleware/Authorization");
const multer = require("multer");
const storage = require("../helper/multer");
const upload = multer({ storage: storage });

router.get("/",authentication,profileControllers.getProfiles);

router.get("/:id",authentication,profileControllers.getOtherProfiles);

router.put("/",authentication,profileControllers.updateProfile);

router.put("/image", authentication,upload.single("avatar"),profileControllers.image);

module.exports=router;