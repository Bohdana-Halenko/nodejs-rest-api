const express = require("express");

const {
  validation,
  controllerWrapper,
  signupUser,
  upload,
} = require("../../middlewares");
const { signup: controllers } = require("../../controllers");
const {
  userSignupSchemaJoi,
  userSubscriptionSchemaJoi,
} = require("../../models");

const router = express.Router();

router.post(
  "/signup",
  validation(userSignupSchemaJoi),
  controllerWrapper(controllers.signup)
);

router.post(
  "/login",
  validation(userSignupSchemaJoi),
  controllerWrapper(controllers.login)
);

router.get("/logout", signupUser, controllerWrapper(controllers.logout));

router.get("/current", signupUser, controllerWrapper(controllers.getCurrent));

router.patch(
  "/:contactId/subscription",
  signupUser,
  validation(userSubscriptionSchemaJoi),
  controllerWrapper(controllers.updateSubscription)
);

router.patch(
  "/avatars",
  signupUser,
  upload.single("avatar"),
  controllerWrapper(controllers.updateAvatar)
);

module.exports = router;