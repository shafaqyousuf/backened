const express = require("express");
const route = express.Router();
const studentModel = require("../models/studentModel");
const {sendRes} = require('../helper/helper')

route.get("/", async (req, res) => {
  try {
    const result = await studentModel.find();
    if (!result) {
      res.send(sendRes(false, null, "No Data")).status(404);
    } else {
      res.send(sendRes(true, result, "found")).status(200);
    }
  } catch (e) {
    console.log(e);
    res.send(sendRes(false, null, "no data", err)).status(400);
  }
});

route.get("/:id", (req, res) => {
  res.send("Get single students data");
});

route.post("/", async (req, res) => {
  let { firstName, lastName, contact, course } = req.body;
  let errArr = [];

  if (!firstName) {
    errArr.push("Required: First Name");
  }
  if (!contact) {
    errArr.push("Required: Contact");
  }
  if (!course) {
    errArr.push("Required: Course");
  }
  if (errArr.length > 0) {
    res.send(sendRes(false, errArr, "Requird all feilds")).status(400);
    return;
  } else {
    let obj = { firstName, lastName, contact, course };
    let student = new studentModel(obj);
    await student.save();
    if (!student) {
      res.send(sendRes(false, null, "internal server error")).status(400);
    } else {
      res.send(sendRes(true, student, "saved successfully")).status(200);
    }
  }
});

route.put("/:id", (req, res) => {
  res.send("Edit students data");
});

route.delete("/:id", (req, res) => {
  res.send("delete students");
});

module.exports = route;
