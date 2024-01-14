require("dotenv").config();
const { connectToDb, getDb } = require("./db");

const express = require("express");
const mongoose = require("mongoose");
const pullRoutes = require("./routes/thawing");

// express app
const app = express();

// middleware
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("connected to db and listening on port " + process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });

// let db;
// connectToDb((err) => {
//   if (!err) {
//     app.listen(process.env.PORT, () => {
//       console.log("connected to db and listening on port " + process.env.PORT);
//     });
//     db = getDb();
//   }
// });

// Routes

// if user not logged in, redirect to login
// else, allow request to proceed
app.use("/restaurant", pullRoutes);
