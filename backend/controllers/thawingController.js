const Pull = require("../models/Pull");
const User = require("../models/Users");
const Food = require("../models/Food");

// go to home page if logged in

async function getHomePage(req, res) {
  console.log(req.session.user);
  if (req.session.user) {
    res.send(`Welcome, ${req.session.user.username}`);
  } else {
    return res.redirect("login");
  }
}

// edit pars

async function editPar(req, res) {
  console.log(req.body);
  const { name, par } = req.body;

  const foodExists = await Food.findOne({ name: name });
  // create a new food if it doesn't already exist, or update the existing food
  if (!foodExists) {
    try {
      const food = await Food.create({ name, par });
      console.log(food);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  } else {
    try {
      const updatedPar = { par: par };
      await foodExists.updateOne(updatedPar);
      const updatedFood = await Food.findOne({ name: name });
      console.log(updatedFood);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
  res.redirect("/");
}

async function trackPull(req, res) {
  const { step, foodUpdates } = req.body;
  // foodUpdates is an object containing the name of each food and the number to change it to
  const foods = await Food.find({});
  if (!foods) {
    res.send("cant perform pull with no food to pull!");
  }
  let currentPull = await Pull.findOne({ pullComplete: false });

  if (!currentPull && step == "thawed-boh") {
    // create the foods array to add to the pull
    foodHolder = foods.map((food) => {
      const updatedFood = { ...food };
      updatedFood._doc.boh = foodUpdates[food.name];
      return updatedFood;
    });
    try {
      currentPull = await Pull.create({
        whoStarted: req.session.user.username,
        foods: foodHolder,
        bohComplete: true,
      });
      console.log(currentPull);
    } catch (error) {
      console.log("error: ", error);
    }
  } else if (currentPull && (step == "thawed-foh" || step == "pull-frozen")) {
    // find each food in the pull, and update it according to the number given for said food.
    let tempFoodsArray = [...currentPull.foods];

    // if the step is already complete, give an error
    if (
      (step == "thawed-foh" && currentPull.fohComplete == true) ||
      (step == "pull-frozen" && currentPull.pullComplete == true)
    ) {
      res.send("error: this step was already completed");
      return;
    }
    // update each food with the number submitted by user depending on the step
    tempFoodsArray.forEach((food) => {
      let name = food.name;
      if (step == "thawed-foh") {
        food.foh = foodUpdates[name];
        currentPull.fohComplete = true;
      } else if (step == "pull-frozen") {
        food.howManyPulled = foodUpdates[name];
        currentPull.pullComplete = true;
        currentPull.whoFinished = req.session.user.username;
      }
    });
    try {
      const finalUpdate = await Pull.findOneAndUpdate(
        { _id: currentPull._id },
        { ...currentPull }
      );
      res.send(finalUpdate);
    } catch (error) {
      console.log(error);
    }
  } else {
    res.send("strange error");
  }
  // for subsequent pulls, need to find a way to save id of specific pull so as to specify which pull to change the data of
}

module.exports = {
  editPar,
  getHomePage,
  trackPull,
};
