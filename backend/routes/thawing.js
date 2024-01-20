const express = require("express");
const bodyParser = require("body-parser");

const Pull = require("../models/Pull");
const User = require("../models/Users");
const Food = require("../models/Food");
const { authUser } = require("../authorization");

const router = express.Router();

const jsonParser = bodyParser.json();

// login page
router
  .route("/login")
  .get((req, res) => {
    console.log("made it to login");
    res.send("this is the login page");
  })
  .post((req, res) => {
    const { name, password } = req.body;
    const user = {
      name: name,
      password: "hashedValue",
      id: 1,
    };

    if (user && user.password === password) {
      req.session.user = user;
      res.redirect("/");
    } else {
      res.json({ mssg: "invalid login data" });
    }
  });

router
  .route("/thawed-boh")
  .get((req, res) => {
    // if thawed-boh count already complete, redirect to next
    res.json({
      mssg: "begin a pull, clearing any old ones, and then count thawed food in boh",
    });
  })
  .post(jsonParser, async (req, res) => {
    const { foods } = req.body;
    console.log(foods);
    try {
      const pull = await Pull.create({
        whoStarted: "placeholderUser",
        foods: foods,
      });
      res.json(pull);
    } catch (error) {
      console.log("error: ", error);
    }

    // redirect to thawed foh once complete
  });

router.get("/thawed-foh", (req, res) => {
  res.json({ mssg: "count thawed food in foh" });
});

router.get("/pull-frozen", (req, res) => {
  res.json({ mssg: "pull food to thaw from freezer" });
});

router.post("/count-track", (req, res) => {
  res.json({
    mssg: "keep track of totals as each step of the pull is completed",
  });
});

// edit pars

router
  .route("/par-edit")
  .get((req, res) => {
    res.json({ mssg: "view and edit pars, or add new items" });
  })
  // create a new food item or reset the par

  .post(jsonParser, async (req, res) => {
    console.log(req.body);
    const { name, par } = req.body;

    const foodExists = await Food.findOne({ name: name });

    if (!foodExists) {
      try {
        const food = await Food.create({ name, par });
        res.status(200).json(food);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    } else {
      try {
        const updatedPar = { par: par };
        await foodExists.updateOne(updatedPar);
        const updatedFood = await Food.findOne({ name: name });
        res.status(200).json(updatedFood);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    }

    // redirect to home page
  });

// review specific pull
router.get("/review/:id", (req, res) => {
  res.json({ mssg: "heres the results from that one pull" });
});

// show list of last 10 pulls
router.get("/review", (req, res) => {
  res.json({ mssg: "heres the results from that one pull" });
});

// home page, depending on type of user
router.get("/", (req, res) => {
  console.log(req.session.user);
  if (req.session.user) {
    res.send(`Welcome, ${req.session.user.name}`);
  } else {
    return res.redirect("login");
  }
});

module.exports = router;
