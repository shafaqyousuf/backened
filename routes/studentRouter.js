const express = require("express");
const route = express.Router();
const StudentController = require("../controllers/studentcontroller");

route.get("/", StudentController.get);

route.get("/search", StudentController.searchStd);

route.get("/:id", StudentController.getById);

route.post("/", StudentController.post);

route.post("/searchStd", StudentController.searchWithPagination);

route.put("/:id", StudentController.put);

route.delete("/:id", StudentController.del);

module.exports = route;
