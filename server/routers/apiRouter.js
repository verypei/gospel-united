const express = require("express");
const router = express.Router();
const apiRouter = require("../controllers/apiControllers");

router.get("/",apiRouter.weather);

module.exports=router;