const { reset } = require("nodemon");
const admin = require("../firebase");

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
