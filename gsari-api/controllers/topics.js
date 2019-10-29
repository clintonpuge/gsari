const { Topic, validateTopic } = require('../models/topic');

exports.all = async (req, res) => {
  try {
    const currentPage = req.query.page || 1;
    const perPage = 2;
    const topics = await Topic.find({ deleted_at: false })
      .collation({ locale: 'en', strength: 2 })
      .sort({ subject: 1 })
      .skip((currentPage - 1) * perPage)
      .limit(perPage);
    return res.status(200).json({ data: topics });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

exports.create = async (req, res) => {
  try {
    const { error } = validateTopic(req.body);
    const { subject, description } = req.body;
    if (error) return res.status(400).json({ message: error.details[0].message });
    const topic = new Topic({
      subject,
      description,
      created_by: res.user.id,
      updated_by: res.user.id
    });
    await topic.save();
    return res.status(201).json({
      id: topic._id,
      subject: topic.subject,
      description: topic.description,
      created_by: topic.created_by,
      updated_by: topic.updated_by,
      created_at: topic.created_at,
      updated_at: topic.updated_at,
    });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Topic.findById(id);
    if (result.created_by !== res.user.id) {
      return res.status(401).json({ message: 'Unable to modify' });
    }
    const topic = await Topic.findByIdAndUpdate(id,
      {
        ...req.body,
        updated_by: res.user.id,
        updated_at: new Date().toISOString(),
      },
      { new: true }, () => {

      });
    if (!topic) return res.status(404).json({ message: 'Invalid' });
    return res.status(200).json({
      id: topic._id,
      subject: topic.subject,
      description: topic.description,
      created_by: topic.created_by,
      updated_by: topic.updated_by,
      created_at: topic.created_at,
      updated_at: topic.updated_at,
    });
  } catch (error) {
    return res.status(404).json({ error });
  }
};

exports.remove = async (req, res) => {
  try {
    const { id } = req.params;
    const topic = await Topic.findByIdAndUpdate(id,
      {
        deleted_at: true,
        updated_by: res.user.id,
        updated_at: new Date().toISOString(),
      },
      { new: true });
    if (topic) {
      return res.status(200).json({ success: true });
    }
    return res.status(404).json({ success: false, message: 'Topic not found.' });
  } catch (error) {
    return res.status(500).json({ error });
  }
};
