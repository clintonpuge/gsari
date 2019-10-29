const mongoose = require('mongoose');
const uuidv1 = require('uuid/v1');
const Joi = require('joi');

const messageSchema = mongoose.Schema({
  _id: { type: String, default: () => uuidv1() },
  message: { type: String, required: true },
  topic_id: { type: String, ref: 'Topic' },
  created_by: { type: String, ref: 'User' },
  updated_by: { type: String, ref: 'User' },
  deleted_at: { type: Boolean, default: false },
  created_at: { type: String, default: new Date().toISOString() },
  updated_at: { type: String, default: new Date().toISOString() },
});

exports.validateMessage = (message) => {
  const schema = {
    message: Joi.string().min(2).max(100).required(),
    token: Joi.string().required(),
  };
  return Joi.validate(message, schema);
};

const Message = mongoose.model('Message', messageSchema);
exports.Message = Message;
