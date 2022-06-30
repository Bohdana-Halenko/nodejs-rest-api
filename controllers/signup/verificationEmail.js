const { User } = require("../../models");
const createError = require("http-errors");
const { sendMail } = require("../../nodemailer");

const verificationEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (user.verify) {
    throw createError(400, "Verification has already been passed. Bad request");
  }

  const verifyEmail = {
    to: email,
    subject: "Confirm email",
    html: `<a target="_blank" href="http://localhost:3000/api/users/verify/:verificationToken">Confirm email<a>`,
  };

  await sendMail(verifyEmail);

  res.json({
    status: "success",
    message: "Verification email sent",
  });
};

module.exports = verificationEmail;