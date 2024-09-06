/** @format */

import Joi from "joi";
import { validation_options } from "../../utils/validation.options";
import { RequestValidationError } from "../../errors";
import { Request, Response, NextFunction } from "express";

export const createChannelValidation = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const schema = Joi.object().keys({
    phone: Joi.string()
      .pattern(/^\+\d{1,3}\s?\d{4,14}$/)
      .messages({
        "string.pattern.base":
          "Phone must include the country dial code and follow the format: +<country code> <number>",
      }),
    name: Joi.string().required(),
  });

  const { error } = schema.validate(req.body, validation_options);

  if (error) throw new RequestValidationError(error.details);

  next();
};
