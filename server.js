// // import fs from fs

// const fs = require("fs");
// const http = require("http");

// fs.readdir("./", (err, file) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(file);
//   }
// });

// fs.readFile("./abc.txt", "utf8", (err, file) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(file);
//   }
// });

// fs.writeFile("./abc.txt", "shafaq yousuf", (err) => {
//  err? err : console.log('file added')
// });

// fs.appendFile("./abc.txt", "family", (err) => {
//   if (!err) {
//     console.log("file append");
//   }
// });

// let courses = [
//   {
//     id: 1,
//     name: "eng",
//   },
//   {
//     id: 2,
//     name: "urdu",
//   },
//   {
//     id: 3,
//     name: "maths",
//   },
//   {
//     id: 4,
//     name: "science",
//   },
// ];

// custom server making

// const server = http.createServer((req, res) => {
//   if (req.url == "/courses") {
//     if(req.method == 'GET'){
//         res.write(JSON.stringify(courses));
//     }
//     if(req.method == 'POST'){
//         res.body
//         res.write("course route added");
//     }
//     res.end();
//   }
//   if (req.url == "/users") {
//     res.write("user route added");
//     res.end();
//   }

// });

// server.listen(4000);

// by express server making

// const express = require("express");
// const { json } = require("body-parser");
// const app = express();

// app.get("/courses", (req, res) => {
//   res.json(courses);
// });

// app.get("/courses/:id", (req, res) => {
//   let id = req.params.id;
//   let obj = courses.find((x) => x.id == id);
//   if (obj) {
//     res.send(obj).status(200);
//   } else {
//     res.send("NO DAFA FOUND").status(404);
//   }
// });

// app.post("/post", (req, res) => {
//   // let data = req.body
//   let obj = courses.map((x) => x);
//   res.send("DATA : " + JSON.stringify(obj));
// });

// app.put("/courses/:id", (req, res) => {});

// app.delete("/delete/:id", (req, res) => {
//     let id = req.params.id;
//   const obj = courses.find((x) => x.id == id);
//   courses.splice(obj, 1);
//   return res.send({});
// });

// app.listen(4000);
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const studentRouter = require("./routes/studentRouter");
const instituteRouter = require("./routes/instituteRouter");
const teacherRouter = require("./routes/teacherRouter");
const UserRouter = require("./routes/userRouter");
const QuizRouter = require("./routes/quizRouter");
require("dotenv").config();
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/student", studentRouter);
app.use("/api/teacher", teacherRouter);
app.use("/api/institute", instituteRouter);
app.use("/api/user", UserRouter);
app.use("/api/quiz", QuizRouter);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Database connected successfully");
    app.listen(process.env.PORT, () => {
      console.log("routes accessed");
    });
  })
  .catch((err) => {
    console.log(err);
  });
