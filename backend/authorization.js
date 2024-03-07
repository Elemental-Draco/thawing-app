function authUser(req, res, next) {
  if (req.session.user) {
    console.log("user is logged in");
    next();
  } else {
    console.log("user is not logged in", req.session.user);
    throw new Error("user not logged in");
    // res.status(401).redirect("/login");
  }
}

function isSupervisor(req, res, next) {
  if (
    req.session.user.role === "supervisor" ||
    req.session.user.role === "manager"
  ) {
    console.log("user is a supervisor");
    next();
  } else {
    console.log("User does not have permission");
    throw new Error("user does not have permission");
    // res.status(401).redirect("/");
  }
}

module.exports = {
  authUser,
  isSupervisor,
};
