const multer = require("multer");
const path = require("path");
const createError = require("http-errors");

const tempDirnameAvatar = path.join(__dirname, "../", "temp");

const multerConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tempDirnameAvatar);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
  limits: { fileSize: 2048 },
});

const upload = multer({
  storage: multerConfig,
  fileFilter: function fileFilter(req, file, cb) {
    if (file.mimetype.includes("image")) {
      cb(null, true);
    } else {
      cb(createError(400, "Wrong format"));
    }
  },
  limits: {
    fieldNameSize: 100,
    fileSize: 2000000,
  },
});

module.exports = upload;