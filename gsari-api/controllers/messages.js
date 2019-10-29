const { Message, validateMessage } = require('../models/message');
const { Topic } = require('../models/topic');

exports.all = async (req, res) => {
  try {
    const { id } = req.params;
    const topic = await Topic.findById(id);
    const currentPage = req.query.page || 1;
    const perPage = 2;
    if (!topic) return res.status(404).json({ message: 'Invalid Id' });
    const messages = await Message.find({ topic_id: id }, { sort: '-updated_at' })
      .skip((currentPage - 1) * perPage)
      .select('topic_id message created_at updated_at created_by updated_by')
      .limit(perPage);
    return res.status(200).json({ data: messages });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

exports.create = async (req, res) => {
  try {
    const { error } = validateMessage(req.body);
    const { message } = req.body;
    const { id } = req.params;
    const topic = await Topic.findById(id);
    if (!topic) return res.status(404).json({ message: 'Invalid Id' });
    if (error) return res.status(400).json({ message: error.details[0].message });
    const newMessage = new Message({
      message,
      topic_id: id,
      created_by: res.user.id,
      updated_by: res.user.id
    });
    await newMessage.save();
    return res.status(201).json({
      topic_id: id,
      id: newMessage._id,
      message: newMessage.message,
      created_by: newMessage.created_by,
      updated_by: newMessage.updated_by,
      created_at: newMessage.created_at,
      updated_at: newMessage.updated_at,
    });
  } catch (error) {
    return res.status(500).json({ error });
  }
};
