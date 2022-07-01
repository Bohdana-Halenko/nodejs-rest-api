const { User } = require("../../models");
const createError = require("http-errors");
const gravatar = require("gravatar");
const { sendMail } = require("../../nodemailer");
const { v4: uuidv4 } = require("uuid");

const signup = async (req, res) => {
  const { email, password, subscription = "starter" } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw createError(409, `Email ${email} in use. Conflict`);
  }

  const verificationToken = uuidv4();

  const avatarURL = gravatar.url(email);

  const newUser = new User({
    email,
    password,
    subscription,
    avatarURL,
    verificationToken,
  });
  newUser.setPassword(password);
  newUser.save();

  const verifyEmail = {
    to: email,
    subject: "Confirm email",
    html: `<a target="_blank" href="http://localhost:3000/api/users/verify/:verificationToken">Confirm email<a>`,
  };

  await sendMail(verifyEmail);

  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      user: {
        email,
        subscription,
        avatarURL,
        verificationToken,
      },
    },
  });
};

module.exports = signup;