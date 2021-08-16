const Product = require("../models/productModel");
const User = require("../models/userModel");
const slugify = require("slugify");

exports.create = async (req, res) => {
  try {
    req.body.slug = slugify(req.body.title);
    const newProduct = await new Product(req.body).save();
    res.json(newProduct);
  } catch (e) {
    res.status(400).send("Create product failed with Error: " + e.message);
  }
};

exports.listAll = async (req, res) => {
  let products = await Product.find({})
    .limit(+req.params.count)
    .populate("category")
    .populate("subCategory")
    .sort([["createdAt", "desc"]])
    .exec();
  res.json(products);
};

exports.remove = async (req, res) => {
  try {
    const deleted = await Product.findOneAndRemove({
      slug: req.params.slug,
    }).exec();
    res.json(deleted);
  } catch (e) {
    console.log(e);
    return res.status(400).send("Product delete failed");
  }
};

exports.read = async (req, res) => {
  let product = await Product.findOne({ slug: req.params.slug })
    .populate("category")
    .populate("subCategory")
    .exec();
  res.json(product);
};

exports.update = async (req, res) => {
  try {
    //updating slug along with the updated title
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const updated = await Product.findOneAndUpdate(
      { slug: req.params.slug },
      req.body,
      { new: true } //This is required for MongoDB to return newly updated Product in the response instead of the old Product with values before the update
    ).exec();
    res.json(updated);
  } catch (e) {
    console.log(e);
    toast.error("Error updating product: " + e.message);
    return res.status(400).send("Product update failed");
  }
};

// Without Pagination
// exports.list = async (req, res) => {
//   try {
//     // sort is createdAt/updatedAt    while order is desc/asc and limit will be a number that limits the number
//     const { sort, order, limit } = req.body;
//     const products = await Product.find({})
//       .populate("category")
//       .populate("subCategory")
//       .sort([[sort, order]])
//       .limit(limit)
//       .exec();

//     res.json(products);
//   } catch (e) {
//     console.log(e);
//   }
// };

// With Pagination
exports.list = async (req, res) => {
  try {
    // sort is createdAt/updatedAt    while order is desc/asc and limit will be a number that limits the number
    const { sort, order, page } = req.body;
    const currentPage = page || 1;
    const perPage = 3;

    const products = await Product.find({})
      .skip((currentPage - 1) * perPage)
      .populate("category")
      .populate("subCategory")
      .sort([[sort, order]])
      .limit(3)
      .exec();
    res.json(products);
  } catch (e) {
    console.log(e);
  }
};

exports.productsCount = async (req, res) => {
  let total = await Product.find({}).estimatedDocumentCount().exec();
  res.json(total);
};

exports.productStar = async (req, res) => {
  const product = await Product.findById(req.params.productId).exec();
  const user = await User.findOne({ email: req.user.email }).exec();
  const { star } = req.body;

  //who is updating?
  //check if currently logged in user have already added rating to this product?
  let existingRatingObject = product.ratings.find(
    (element) => element.postedBy.toString() === user._id.toString()
  );

  //if user hasn`t left rating yet, push it to ratings array
  if (existingRatingObject === undefined) {
    let ratingAdded = await Product.findByIdAndUpdate(
      product._id,
      {
        $push: { ratings: { star: star, postedBy: user._id } },
      },
      { new: true }
    ).exec();
    console.log("ratingAdded", ratingAdded);
    res.json(ratingAdded);
  } else {
    //otherwise update the already existing rating by that given user
    const ratingUpdated = await Product.updateOne(
      {
        ratings: { $elemMatch: existingRatingObject },
      },
      { $set: { "ratings.$.star": star } },
      { new: true }
    ).exec();
    console.log("ratingUpdated", ratingUpdated);
    res.json(ratingUpdated);
  }
};

exports.listRelated = async (req, res) => {
  const product = await Product.findById(req.params.productId).exec();

  const related = await Product.find({
    _id: { $ne: product._id },
    category: product.category,
  })
    .limit(3)
    .populate("category")
    .populate("postedBy")
    .populate("subCategory")
    .exec();

  res.json(related);
};
