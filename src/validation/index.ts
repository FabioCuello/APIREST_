import Joi from 'joi';

const first_name = Joi.string().max(128).trim();
const last_name = Joi.string().max(128).trim();
const email = Joi.string().email().max(64).lowercase().trim();
const password = Joi.string();
const age = Joi.number().max(100);
const image = Joi.string();
const description = Joi.string().max(255);

export const usersSchemaWithRequired = Joi.object({
  first_name: first_name.required(),
  last_name: last_name.required(),
  email: email.required(),
  password: password.required(),
  age: age.required(),
  image,
  description,
});

export const usersSchema = Joi.object({
  first_name,
  last_name,
  email,
  password,
  age,
  image,
  description,
});
