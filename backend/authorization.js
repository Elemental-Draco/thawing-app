function authUser(req, res, next) {
  console.log(req.session);
  if (!req.session || !req.session.user) {
    res.status(403);
    return res.send("you need to be logged in to use this app");
  }
  next();
}

module.exports = {
  authUser,
};
