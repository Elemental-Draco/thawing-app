const express = require("express");
const bodyParser = require("body-parser");

const User = require("../models/Users");
const Food = require("../models/Food");

const router = express.Router();

const jsonParser = bodyParser.json();

// home page, depending on type of user
router.get("/", (req, res) => {
  res.json({ mssg: "show main page" });
});

// login page
router
  .route("/login")
  .get((req, res) => {
    res.json({ mssg: "this is the login page" });
  })
  .post((req, res) => {
    res.json({ mssg: "User has submitted login data" });
    // redirect to homepage
  });

router.get("/thawed-boh", (req, res) => {
  res.json({
    mssg: "begin a pull, clearing any old ones, and then count thawed food in boh",
  });
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

module.exports = router;
