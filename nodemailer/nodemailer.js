const nodemailer = require("nodemailer");
require("dotenv").config();

const { META_PASSWORD } = process.env;

const nodemailerConfig = {
    host: "smtp.meta.ua",
    port: 465,
    secure: true,
    auth: {
        user: "bohdana.halenko@meta.ua",
        pass: META_PASSWORD,
    },
};

const sendMail = async (data) => {
  const transporter = nodemailer.createTransport(nodemailerConfig);
  const email = { ...data, from: "bohdana.halenko@meta.ua" };
  try {
    transporter.sendMail(email);
    return true;
  } catch (error) {
  }
};

module.exports = sendMail;
