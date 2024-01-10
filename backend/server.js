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
app.use("/restaurant", pullRoutes);

app.listen(process.env.PORT, () => {
  console.log("listening on port 4000");
});
