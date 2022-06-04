const express = require("express");
const Joi = require("joi");
const { newError } = require("additionals");



const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

const router = express.Router();

const contacts = require("./models/contacts");

router.get("/", async (req, res, next) => {
  try {
    const result = await contacts.listContacts();
    res.json({
      status: "success",
      code: 200,
      data: {
        result: result
      }
    });
  } catch(error) {
    next(error);
  }
})

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.getContactById(contactId);
    if (!result) {
      throw newError(404, "Not found");
    }
    res.json({
      status: "success",
      code: 200,
      data: {
        result
      }
    });
  } catch (error) {
    next(error);
  }
})

router.post("/", async(req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      error.status = 400;
throw error;
    }
    const { name, email, phone } = req.body;
    const result = await contacts.addContact(name, email, phone);
    res.status(201).json({
      status: "success",
      code: 201,
      data: {
         result
      }
    });
  } catch (error) {
    next(error);
  }
})

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.removeContactById(contactId);
    if (!result) {
      throw newError(404, "Not found");
    }
    res.json({
      status: "success",
      code: 200,
      message: "contact deleted",
      data: {
        result
      }
    });
  } catch (error) {
    next(error);
  }
})

router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
//       throw newError(400, "missing fields");
    }
    const { contactId } = req.params;
    const { name, email, phone } = req.body;
    const result = await contacts.updateById(contactId, name, email, phone);
    if (!result) {
      throw newError(404);
    }
    res.json({
      status: "success",
      code: 200,
      data: {
        result
      }
    });
  } catch (error) {
    next(error);
  }
})

module.exports = router