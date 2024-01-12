require("dotenv").config();

const express = require("express");
const pullRoutes = require("./routes/thawing");

// express app
const app = express();

// middleware
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Routes

// if user not logged in, redirect to login
// else, allow request to proceed
app.use("/restaurant", pullRoutes);

app.listen(process.env.PORT, () => {
  console.log("listening on port " + process.env.PORT);
});
