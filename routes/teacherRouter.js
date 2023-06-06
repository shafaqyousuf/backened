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
    res.send(sendRes(false, null, "internal server error")).status(400);
  }
});

route.get("/search", async (req, res) => {
  try {
    let { name } = req.body;
    if (name) {
      let result = await teacherModel.find({
        name: name,
      });
    }
    if (!result) {
      res.send(sendRes(false, null, "no data found")).status(400);
    } else {
      res.send(sendRes(true, result, "data found")).status(200);
    }
  } catch (e) {
    res.send(sendRes(false, null, "internal server error")).status(400);
  }
});

route.get("/:id", async (req, res) => {
  try {
    let id = req.params.id;
    const result = await teacherModel.findById(id);
    if (!result) {
      res.send(sendRes(false, null, "required data not found")).status(400);
    } else {
      res.send(sendRes(true, result, "required data found")).status(200);
    }
  } catch (e) {
    console.log(e);
    res.send(sendRes(false, null, "internal server error")).status(400);
  }
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
      res.send(sendRes(false, null, "Required all feilds")).status(400);
      return;
    } else {
      let obj = { name, contact, course };
      let teacher = new teacherModel(obj);
      await teacher.save();
      if (!teacher) {
        res.send(sendRes(false, null, "no data found")).status(400);
      } else {
        res
          .send(sendRes(true, teacher, "data posted successfully"))
          .status(200);
      }
    }
  } catch (e) {
    res.send(sendRes(false, null, "internal server error")).status(400);
  }
});

route.put("/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let result = await teacherModel.findById(id);
    if (!result) {
      res.send(sendRes(false, null, "no data found")).status(400);
    } else {
      let updatedResult = await teacherModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      if (!updatedResult) {
        res.send(sendRes(false, null, "no data posted")).status(400);
      } else {
        res
          .send(sendRes(true, updatedResult, "Data posted successfully"))
          .status(200);
      }
    }
  } catch (e) {
    res.send(sendRes(false, null, "internal server error")).status(400);
  }
});

route.delete("/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let result = await teacherModel.findById(id);
    if (!result) {
      res.send(sendRes(false, null, "no data found")).status(400);
      return;
    } else {
      let delResult = await teacherModel.findByIdAndDelete(id);
      if (!delResult) {
        res.send(sendRes(false, null, "no data found")).status(400);
      } else {
        res.send(sendRes(true, [], "data deleted successfully")).status(200);
      }
    }
  } catch (e) {
    res.send(sendRes(false, null, "internal server error")).status(400);
  }
});

module.exports = route;
