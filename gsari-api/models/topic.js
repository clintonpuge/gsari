const mongoose = require('mongoose');
const uuidv1 = require('uuid/v1');
const Joi = require('joi');

const topicSchema = mongoose.Schema({
  _id: { type: String, default: () => uuidv1() },
  subject: { type: String, required: true },
  description: { type: String, required: true },
  created_by: { type: String, ref: 'User' },
  updated_by: { type: String, ref: 'User' },
  deleted_at: { type: Boolean, default: false },
  created_at: { type: String, default: new Date().toISOString() },
  updated_at: { type: String, default: new Date().toISOString() },
});
exports.validateTopic = (topic) => {
  const schema = {
    subject: Joi.string().min(4).max(50).required(),
    token: Joi.string().required(),
    description: Joi.string().min(4).max(100).required(),
  };
  return Joi.validate(topic, schema);
};

const Topic = mongoose.model('Topic', topicSchema);
exports.Topic = Topic;
