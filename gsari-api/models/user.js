const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const crypto = require('crypto');
const uuidv1 = require('uuid/v1');
const config = require('config');

const userSchema = new mongoose.Schema(
  {
    _id: { type: String, default: () => uuidv1() },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    created_at: { type: String, default: new Date().toISOString() },
    updated_at: { type: String, default: new Date().toISOString() },
  },
);

exports.generateAuthToken = (user) => jwt.sign({ id: user.id, name: user.name, email: user.email }, config.get('jwtKey'));

exports.hashPassword = (password) => {
  if (!password) return '';
  return crypto.createHmac('sha1', uuidv1()).update(password).digest('hex');
};

exports.validateRegister = (user) => {
  const schema = {
    email: Joi.string()
      .min(4)
      .max(50)
      .email()
      .required(),
    password: Joi.string()
      .min(2)
      .max(50)
      .required(),
    name: Joi.string()
      .min(2)
      .max(50)
      .required(),
  };
  return Joi.validate(user, schema);
};

exports.validateLogin = (user) => {
  const schema = {
    email: Joi.string()
      .min(4)
      .max(50)
      .email()
      .required(),
    password: Joi.string()
      .min(4)
      .max(50)
      .required()
  };
  return Joi.validate(user, schema);
};

const User = mongoose.model('User', userSchema);

exports.User = User;
