const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");

const Pull = require("../models/Pull");
const User = require("../models/Users");
const Food = require("../models/Food");
const { authUser } = require("../authorization");

const {
  editPar,
  getHomePage,
  trackPull,
  createUser,
} = require("../controllers/thawingController");

const router = express.Router();

const jsonParser = bodyParser.json();

// login page
router
  .route("/login")
  .get((req, res) => {
    res.json({ msg: "this is the login page" });
  })
  .post(async (req, res) => {
    const { name, password } = req.body;
    let passwordMatch = false;
    try {
      const user = await User.findOne({ username: name });
      if (user) {
        passwordMatch = await bcrypt.compare(password, user.password);
      }

      if (user && passwordMatch) {
        req.session.user = user;
        res.json({ user: user });
      } else {
        res.status(500).json({ mssg: "invalid login data" });
      }
    } catch (error) {
      console.error("sign in failure: ", error);
    }
  });

// logout function
router.post("/logout", async (req, res) => {
  req.session.user = null;
  console.log("user logged out, ", req.session.user);
  res.redirect("login");
});

// create a user
router.post("create-user", createUser);

// first step in pull
router.get("/thawed-boh", async (req, res) => {
  // if thawed-boh count already complete, redirect to next
  res.json({
    mssg: "begin a pull, clearing any old ones, and then count thawed food in boh",
  });
  // redirect to thawed foh once complete
});

// second step in the pull
router.get("/thawed-foh", (req, res) => {
  res.json({ mssg: "count thawed food in foh" });
});

// third step of the pull
router.get("/pull-frozen", (req, res) => {
  res.json({ mssg: "pull food to thaw from freezer" });
});

// pull steps will post data here
router.post("/count-track", trackPull);

// edit pars

router
  .route("/par-edit")
  .get((req, res) => {
    res.json({ mssg: "view and edit pars, or add new items" });
  })
  // create a new food item or reset the par
  .post(jsonParser, editPar);

// review specific pull
router.get("/review/:id", (req, res) => {
  res.json({ mssg: "heres the results from that one pull" });
});

// show list of last 10 pulls
router.get("/review", (req, res) => {
  res.json({ mssg: "heres the results from that one pull" });
});

// home page, depending on type of user
router.get("/", authUser, getHomePage);

module.exports = router;
