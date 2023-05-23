const express = require("express");
const route = express.Router();
const teacherModel = require("../models/teacherModel");
const { sendRes } = require("../helper/helper");

route.get("/", async (req, res) => {
  try {
    const result = await teacherModel.find();
    if (!result) {
      res.send(sendRes(false, null, "no data found")).status(400);
    } else {
      res.send(sendRes(true, result, "data found")).status(200);
    }
  } catch (e) {
    console.log(e);
    res.send(sendRes(false, null, "internal server error")).status(400);
  }
});
route.get("/:id", (req, res) => {
  res.send("Get single teacher data");
});
route.post("/", async (req, res) => {
  try {
    let { name, contact, course } = req.body;
    let errArr = [];

    if (!name) {
      errArr.push("Required: Name");
    }
    if (!contact) {
      errArr.push("Required : Contact");
    }
    if (!course) {
      errArr.push("Required : Course");
    }
    if (errArr.lenth > 0) {
      res.send(sendRes(false, null, "no data found")).status(400);
      return;
    } else {
      let obj = { name, contact, course };
      let teacher = new teacherModel(obj);
      await teacher.save();
      if (!teacher) {
        res.send(sendRes(false, null, "no data found")).status(400);
      } else {
        res.send(sendRes(true, teacher, "data found")).status(200);
      }
    }
  } catch (e) {
    console.log(e);
    res.send(sendRes(false, null, "internal server error")).status(400);
  }
});
route.put("/:id", (req, res) => {
  res.send("Edit teachers data");
});
route.delete("/:id", (req, res) => {
  res.send("delete teachers");
});

module.exports = route;
