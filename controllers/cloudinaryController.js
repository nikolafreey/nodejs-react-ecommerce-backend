const cloudinary = require("cloudinary").v2;

//config
cloudinary.config = {
  cloud_name: "dvwqfftqw",
  api_key: "923359614497992",
  api_secret: "71P1MOOz0fgPbUidY_e5qIUQ8yk",
};

exports.upload = async (req, res) => {
  console.log("req controller");
  console.log("cloudinary.config", cloudinary.config);
  try {
    let result = await cloudinary.uploader.upload(req.body.image, {
      public_id: `${Date.now()}`,
      resource_type: "auto",
    });
    console.log("result controller");
    res.json({
      public_id: result.public_id,
      url: result.secure_url,
    });
  } catch (e) {
    console.log(e);
  }
};

exports.remove = (req, res) => {
  let image_id = req.body.public_id;

  cloudinary.uploader.destroy(image_id, (err, result) => {
    if (err) return res.status(400).json("Error: " + err.message);
    res.send("Deleted image with image_id: " + image_id);
  });
};
