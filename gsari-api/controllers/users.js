const bcrypt = require('bcrypt');
const {
  User,
  validateLogin,
  validateRegister,
  generateAuthToken,
} = require('../models/user');

exports.userRegister = async (req, res) => {
  const { error } = validateRegister(req.body);
  if (error) {
    return res.status(401).json({ message: error.details[0].message });
  }
  const { email, name, password } = req.body;
  try {
    const isExist = await User.findOne({ email });
    if (isExist) {
      return res.status(400).json({ message: 'User already exists.' });
    }

    const user = new User({ email, name, password });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();

    return res
      .status(201)
      .json({
        id: user._id,
        name: user.name,
        email: user.email,
        created_at: user.created_at,
        updated_at: user.updated_at,
      });
  } catch (e) {
    return res.status(500).json({ error: e });
  }
};

exports.userLogin = async (req, res) => {
  const { error } = validateLogin(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(401).json({ message: 'Invalid email/password.' });
    }
    const token = generateAuthToken(user);
    return res
      .status(200)
      .json({ token });
  } catch (e) {
    return res.status(500).json({ error: e });
  }
};
