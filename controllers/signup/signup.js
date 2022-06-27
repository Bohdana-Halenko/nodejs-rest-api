const { User } = require("../../models");
const createError = require("http-errors");
const gravatar = require("gravatar");

const signup = async (req, res) => {
  const { email, password, subscription = "starter" } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw createError(409, `Email ${email} in use. Conflict`);
  }

  const avatarURL = gravatar.url(email);

  const newUser = new User({ email, password, subscription, avatarURL });
  newUser.setPassword(password);
  newUser.save();

  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      user: {
        email,
        subscription,
        avatarURL,
      },
    },
  });
};

module.exports = signup;