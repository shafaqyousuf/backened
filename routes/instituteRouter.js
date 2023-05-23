const express = require("express");
const { sendRes } = require("../helper/helper");
const instituteModel = require("../models/instituteModels");
const route = express.Router();

route.get("/", async (req, res) => {
  try {
    let institute = await instituteModel.find();
    if (!institute) {
      res.send(sendRes(false, null, "no data found")).status(400);
    } else {
      res.send(sendRes(true, institute, "data found")).status(200);
    }
  } catch (e) {
    res.send(sendRes(false, null, "internal server error")).status(400);
  }
});
route.get("/:id", (req, res) => {
  res.send("Get single institute data");
});
route.post("/", async (req, res) => {
  try {
    let { name, adress, shortName, telephone } = req.body;
    let errArr = [];
    if (!name) {
      errArr.push("Required : Name");
    }
    if (!adress) {
      errArr.push("Required : Adress");
    }
    if (!shortName) {
      errArr.push("Required : Short Name");
    }
    if (!telephone) {
      errArr.push("Required : Telephone");
    }
    if (errArr.length > 0) {
      res.send(sendRes(false, errArr, "required all feilds")).status(400);
      return;
    } else {
      let obj = { name, adress, shortName, telephone };
      let institute = new instituteModel(obj);
      await institute.save();
      if (!institute) {
        res.send(sendRes(false, null, "no data found")).status(400);
      } else {
        res.send(sendRes(true, institute, "data posted")).status(200);
      }
    }
  } catch (e) {
    res.send(sendRes(false, null, "internal server error")).status(400);
  }
});
route.put("/:id", (req, res) => {
  res.send("Edit institute data");
});
route.delete("/:id", (req, res) => {
  res.send("delete institute");
});

module.exports = route;
