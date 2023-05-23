const express = require("express");
const route = express.Router();
const { sendRes } = require("../helper/helper");
const courseModel = require("../models/courseModel");

route.get("/", async (req, res) => {
  try {
    let course = await courseModel.find();
    if (!course) {
      res.send(sendRes(false, null, "no data found")).status(400);
    } else {
      res.send(sendRes(true, course, "data found")).status(200);
    }
  } catch (e) {
    res.send(sendRes(false, null, "internal server error")).status(400);
  }
});

route.get("/:id", (req, res) => {});

route.post("/", async (req, res) => {
  try {
    let { name, duration, fees, shortName } = req.body;
    let errArr = [];
    if (!name) {
      errArr.push("Required : Name");
    }
    if (!duration) {
      errArr.push("Required : Duration");
    }
    if (!fees) {
      errArr.push("Required : Fees");
    }
    if (!shortName) {
      errArr.push("Required : Short Name");
    }
    if (errArr.length > 0) {
      res.send(sendRes(false, errArr, "required all feilds")).status(400);
      return;
    } else {
      let obj = { name, duration, fees, shortName };
      let course = new courseModel(obj);
      await course.save();
      if (!course) {
        res.send(sendRes(false, errArr, "no data found")).status(400);
      } else {
        res.send(sendRes(false, course, "data posted")).status(200);
      }
    }
  } catch (e) {
    res.send(sendRes(false, null, "internal server error")).status(400);
  }
});

route.put("/:id", (req, res) => {});
route.delete("/:id", (req, res) => {});
