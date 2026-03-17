const User = require("../models/User");

exports.register = async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.json(user);
};

exports.login = async (req, res) => {
  const user = await User.findOne(req.body);
  if (!user) return res.status(404).json("User not found");
  res.json(user);
};