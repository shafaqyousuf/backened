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

route.get("/search", async (req, res) => {
  try {
    let { name } = req.body;
    if (name) {
      let result = await instituteModel.find({
        name: name,
      });
      if (!result) {
        res.send(sendRes(false, null, "no data found")).status(400);
      } else {
        res.send(sendRes(true, result, "required data found")).status(200);
      }
    }
  } catch (e) {
    res.send(sendRes(false, null, "internal server error")).status(400);
  }
});

route.get("/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let institute = await instituteModel.findById(id);
    if (!institute) {
      res.send(sendRes(false, null, "no data found")).status(400);
    } else {
      res.send(sendRes(true, institute, "data found")).status(200);
    }
  } catch (e) {
    res.send(sendRes(false, null, "internal server error")).status(400);
  }
});

route.post("/", async (req, res) => {
  try {
    let { name, address, telephone } = req.body;
    let errArr = [];
    if (!name) {
      errArr.push("Required : Name");
    }
    if (!address) {
      errArr.push("Required : Address");
    }
    if (!telephone) {
      errArr.push("Required : Telephone");
    }
    if (errArr.length > 0) {
      res.send(sendRes(false, errArr, "required all feilds")).status(400);
      return;
    } else {
      let obj = { name, address, telephone };
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

route.put("/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let result = await instituteModel.findById(id);
    if (!result) {
      res.send(sendRes(false, null, "no data found")).status(400);
    } else {
      let updateResult = await instituteModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      if (!updateResult) {
        res.send(sendRes(false, null, "no data found")).status(400);
      } else {
        res.send(sendRes(true, updateResult, "data posted")).status(200);
      }
    }
  } catch (e) {
    res.send(sendRes(false, null, "internal server error")).status(400);
  }
});

route.delete("/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let result = await instituteModel.findById(id);
    if (!result) {
      res.send(sendRes(false, null, "no data found")).status(400);
    } else {
      let delResult = await instituteModel.findByIdAndDelete(id);
      if (!delResult) {
        res.send(sendRes(false, null, "no data found")).status(400);
      } else {
        res.send(sendRes(false, [], "data deleted successfully")).status(200);
      }
    }
  } catch (e) {
    res.send(sendRes(false, null, "internal server error")).status(400);
  }
});

module.exports = route;
