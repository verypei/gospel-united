const express = require("express");
const router = express.Router();
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/Authorization");
const prayControllers = require("../controllers/prayController.js");


router.get("/",authentication,prayControllers.getPrays);

router.get("/:id",authentication,prayControllers.getPrayById);

router.post("/",authentication,prayControllers.addPray);

router.put("/:id",authentication,authorization,prayControllers.updatePray);

router.delete("/:id",authentication,authorization,prayControllers.deletePray);

module.exports=router;