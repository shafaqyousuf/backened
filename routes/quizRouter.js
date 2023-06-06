const express = require("express");
const route = express.Router();
const quizModel = require("../models/quizModel");
const { sendRes } = require("../helper/helper");

route.get("/", async (req, res) => {
  try {
    const result = await quizModel.find();
    if (!result) {
      res.send(sendRes(false, null, "No Data")).status(404);
    } else {
      res.send(sendRes(true, result, "Data Found")).status(200);
    }
  } catch (e) {
    res.send(sendRes(false, null, "internal server error", err)).status(400);
  }
});

route.post("/", async (req, res) => {
    try {
    let { question, answer, opt1, opt2, opt3, opt4 } = req.body;
      let errArr = [];
  
      if (!question) {
        errArr.push("Required: Question");
      }
      if (!answer) {
        errArr.push("Required: Answer");
      }
      if (!opt1) {
        errArr.push("Required: Option 1");
      }
      if (!opt2) {
        errArr.push("Required: Option 2");
      }
      if (!opt3) {
        errArr.push("Required: Option 3");
      }
      if (!opt4) {
        errArr.push("Required: Option 4");
      }
      if (errArr.length > 0) {
        res.send(sendRes(false, errArr, "Requird all feilds")).status(400);
        return;
      } else{
        let obj = { question, answer, opt1, opt2, opt3, opt4 };
        let quiz = new quizModel(obj);
        await quiz.save();
        if (!quiz) {
          res.send(sendRes(false, null, "no data posted")).status(400);
        } else {
          res.send(sendRes(true, quiz, "Data saved successfully")).status(200);
        }
    }
    } catch (e) {
      // console.log(e)
      res.send(sendRes(false, null, "internal server error")).status(400);
    }
  });

module.exports = route;
