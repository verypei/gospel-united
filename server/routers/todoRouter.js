const express = require("express");
const router = express.Router();
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/Authorization");
const todoController = require("../controllers/todoController.js");


router.get("/",authentication,todoController.getTodos);

router.get("/:id",authentication,todoController.getTodoId);

router.post("/",authentication,todoController.addTodo);

router.put("/:id",authentication,authorization,todoController.update);

router.delete("/:id",authentication,authorization,todoController.deleteToDo);

module.exports=router;