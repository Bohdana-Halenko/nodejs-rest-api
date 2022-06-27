const { User } = require("../../models");
const path = require("path");
const fs = require("fs/promises");
const sharp = require("sharp");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res) => {
  const { path: tempUpload, originalname } = req.file;
  const { _id: id } = req.user;
  const imageName = `${id}_${originalname}`;
  const resultUpload = path.join(avatarsDir, imageName);
  const avatarURL = path.join("public", "avatars", imageName);

  try {
    await sharp(tempUpload)
      .resize({ width: 250, height: 250 })
      .toFile(resultUpload);
    await User.findByIdAndUpdate(req.user._id, { avatarURL }, { new: true}
    );
    res.json({ avatarURL });
  } catch (error) {
  } finally {
    await fs.unlink(tempUpload);
  }
};

module.exports = updateAvatar;