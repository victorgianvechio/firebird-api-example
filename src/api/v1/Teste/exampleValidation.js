import Joi from 'joi';

const exampleValidation = (req, res, next) => {
  const { error } = Joi.validate(
    req.body,
    Joi.object().keys({
      name: Joi.string().required(),
      keywords: Joi.array().items(Joi.string()),
      age: Joi.number(),
      address: Joi.object().keys({
        address1: Joi.string(),
        address2: Joi.string(),
      }),
      newUser: Joi.boolean().required(),
    })
  );

  if (error) return res.status(400).json(error.details);

  return next();
};

export default exampleValidation;
