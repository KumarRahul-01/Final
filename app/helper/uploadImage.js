const path = require("path");
const multer = require("multer");

const FILE_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const isValid = FILE_TYPE_MAP[file.mimetype];
    let uploadError = new Error("Invalid image type");

    if (isValid) {
      uploadError = null;
    }
    // Save files in "uploads" folder inside your project root
    cb(uploadError, path.join(__dirname, "../../uploads"));
  },
  filename: function (req, file, cb) {
    // Replace spaces with dashes for better filenames
    const fileName = file.originalname.split(" ").join("-");
    // Get extension from MIME type
    const extension = FILE_TYPE_MAP[file.mimetype];
    // Append timestamp to avoid name conflicts
    cb(null, `${fileName}-${Date.now()}.${extension}`);
  },
});

const uploadImage = multer({ storage: storage });

module.exports = uploadImage;
