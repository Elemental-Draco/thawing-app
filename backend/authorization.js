function authUser(req, res, next) {
  console.log(req.session);
  if (req.session.user) {
    console.log("user is logged in");
    next();
  } else {
    console.log("user is not logged in");
    res.status(401).redirect("/login");
  }
}

module.exports = {
  authUser,
};
