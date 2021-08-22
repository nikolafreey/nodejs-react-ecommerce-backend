const Coupon = require("../models/couponModel");

exports.create = async (req, res) => {
  try {
    const { name, expiry, discount } = req.body.coupon;
    const coupon = await new Coupon({ name, expiry, discount }).save();
    res.json(coupon);
  } catch (err) {
    console.log(err);
  }
};

exports.remove = async (req, res) => {
  try {
    res.json(await Coupon.findByIdAndDelete(req.params.couponId).exec());
  } catch (err) {
    console.log(err);
  }
};

exports.list = async (req, res) => {
  try {
    res.json(await Coupon.find({}).sort({ createdAt: -1 }).exec());
  } catch (err) {
    console.log(err);
  }
};
