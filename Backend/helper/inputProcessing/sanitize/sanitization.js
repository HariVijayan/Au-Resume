import { body } from "express-validator";

const sanitizingValidators = [
  body("email").trim().normalizeEmail(),
  body("name").trim().escape(), 

  body("registerNumber").trim().escape().isLength({ min: 1, max: 20 }),

  body("phoneNumber")
    .if(body("phoneNumber").exists())
    .matches(/^\d{10}$/)
    .withMessage("Phone number must be 10 digits"),
];