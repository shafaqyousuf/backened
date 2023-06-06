const { sendRes } = require("../helper/helper");
const studentModel = require("../models/studentModel");

const StudentController = {
  get: async (req, res) => {
    try {
      let { page = 1, limit = 2, sort, asc } = req.query;
      const skip = (page - 1) * limit;

      const result = await studentModel.find().skip(skip).limit(limit);
      if (!result) {
        res.send(sendRes(false, null, "No Data")).status(404);
      } else {
        res.send(sendRes(true, result, "Data Found")).status(200);
      }
    } catch (e) {
      res.send(sendRes(false, null, "internal server error", err)).status(400);
    }
  },
  getById: async (req, res) => {
    try {
      let id = req.params.id;
      const result = await studentModel.findById(id);
      if (!result) {
        res.send(sendRes(false, null, "No Data")).status(404);
      } else {
        res.send(sendRes(true, result, "Required Data Found")).status(200);
      }
    } catch (e) {
      res.send(sendRes(false, null, "internal server error", e)).status(400);
    }
  },
  searchStd: async (req, res) => {
    try {
      let { firstName, lastName } = req.body;
      if (firstName && lastName) {
        let result = await studentModel.find({
          firstName: firstName,
          lastName: lastName,
        });
        if (!result) {
          res.send(sendRes(false, null, "No Data Found")).status(404);
        } else {
          res.send(sendRes(true, result, "Search Data Found")).status(200);
        }
      }
    } catch (e) {
      console.log(e);
      res.send(sendRes(false, null, "internal server error", err)).status(400);
    }
  },
  searchWithPagination: async (req, res) => {
    try {
      let { pageNo, pageSize, searchEntity, searchVal } = req.body;
      let result = await studentModel
        .find({ [searchEntity]: searchVal })
        .skip((pageNo - 1) * pageSize)
        .limit(pageSize);
      if (result) {
        let count = await studentModel.countDocuments();
        req.headers.recCount = count;
        res.send({ ...sendRes(true, result), count: count }).status(200);
      } else {
        res.send(sendRes(false, "no data")).status(400);
      }
    } catch (e) {
      res.send(sendRes(false, "internal server error")).status(400);
    }
  },
  post: async (req, res) => {
    try {
      let { firstName, lastName, contact, course } = req.body;
      let errArr = [];

      if (!firstName) {
        errArr.push("Required: First Name");
      }
      if (!lastName) {
        errArr.push("Required: Last Name");
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
          res.send(sendRes(false, null, "no data posted")).status(400);
        } else {
          res
            .send(sendRes(true, student, "Data saved successfully"))
            .status(200);
        }
      }
    } catch (e) {
      res.send(sendRes(false, null, "internal server error")).status(400);
    }
  },
  put: async (req, res) => {
    try {
      let id = req.params.id;
      let result = await studentModel.findById(id);
      if (!result) {
        res.send(sendRes(false, null, "no data found")).status(400);
      } else {
        let updateResult = await studentModel.findByIdAndUpdate(id, req.body, {
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
  },
  del: async (req, res) => {
    try {
      let id = req.params.id;
      let result = await studentModel.findById(id);
      if (!result) {
        res.send(sendRes(false, null, "no data found on this id")).status(404);
      } else {
        let delResult = await studentModel.findByIdAndDelete(id);
        if (!delResult) {
          res.send(sendRes(false, null, "error")).status(400);
        }
        res.send(sendRes(true, [], "DATA DELETED")).status(200);
      }
    } catch (e) {
      res.send(sendRes(false, null, "internal server error")).status(400);
    }
  },
};

module.exports = StudentController;
