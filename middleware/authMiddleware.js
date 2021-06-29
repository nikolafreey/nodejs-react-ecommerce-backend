const { reset } = require("nodemon");
const admin = require("../firebase");
const User = require("../models/userModel");

exports.authCheck = async (req, res, next) => {
  console.log(req.headers);
  try {
    const firebaseUser = await admin
      .auth()
      .verifyIdToken(req.headers.authtoken);

    req.user = firebaseUser;
    next();
  } catch (err) {
    res.status(401).json({
      error: "Invalid or expired token! Error: " + err.message,
    });
  }
};

exports.adminCheck = async (req, res, next) => {
  const { email } = req.user;

  const adminUser = await User.findOne({ email }).exec();

  if (adminUser.role !== "admin") {
    res.status(403).json({
      err: "Admin resource. Access denied!",
    });
  } else {
    next();
  }
};
