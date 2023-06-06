const { sendRes } = require("../helper/helper");
const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const AuthController = {
  login: async (req, res) => {
    const { email, password } = req.body;
    const obj = { email, password };

    let result = await userModel.findOne({ email });
    if (result) {
      let isConfirm = await bcrypt.compare(obj.password, result.password);
      if (isConfirm) {
        let token = jwt.sign({ ...result }, process.env.SECURE_KEYS, {
          expiresIn: "1h",
        });
        res.send(sendRes(true, { user: result, token }, "Login Successfully"));
      } else {
        res.send(sendRes(false, null, "Credential Error"));
      }
    } else {
      res.send(sendRes(false, err, "User Doesn't Exist"));
    }
  },

  signup: async (req, res) => {
    const { userName, email, password } = req.body;
    const obj = { userName, email, password };
    let requiredArr = ["userName", "email", "password"];
    let errArr = [];
    requiredArr.forEach((x) => {
      if (!obj[x]) {
        errArr.push(x);
      }
    });
    if (errArr.length > 0) {
      res.send(sendRes(false, null, "Some feilds missing", errArr)).status(400);
    } else {
      let hashPassword = await bcrypt.hash(obj.password, 10);
      obj.password = hashPassword;
      const existingUser = await userModel.findOne({ email: email });
      if (existingUser) {
        res.send(sendRes(false, null, "email is already in use")).status(403);
      } else {
        userModel
          .create(obj)
          .then((result) => {
            res.send(sendRes(true, result, "data saved")).status(200);
          })
          .catch((err) => {
            res
              .send(sendRes(false, null, "internal server errror"))
              .status(400);
          });
      }
    }
  },

  protected: async (req, res, next) => {
    let token = req.headers.authorization;
    if (token) {
      token = token.split(" ")[1];
      jwt.verify(token, process.env.SECURE_KEYS, (err, decoded) => {
        if (err) {
          res.send(sendRes(false, null, "unauthorized")).status(403);
        } else {
          console.log(decoded);
          next();
        }
      });
    } else {
      res.send(sendResponse(false, null, "Unauthorized")).status(403);
    }
  },
};
module.exports = AuthController;
