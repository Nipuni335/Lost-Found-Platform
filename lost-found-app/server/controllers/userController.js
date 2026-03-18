const User = require("../models/User");

// ------------------- REGISTER -------------------
exports.register = async (req, res) => {
  const { name, email, phone, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const newUser = new User({
      name,
      email,
      phone,
      password,
      role: "student"
    });

    await newUser.save();

    res.json({
      msg: "Registration successful",
      user: newUser
    });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

// ------------------- LOGIN -------------------
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email, password });

    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role
    });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

// ------------------- GET ALL USERS -------------------
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching users" });
  }
};

// ------------------- CREATE ADMIN -------------------
exports.createAdmin = async (req, res) => {
  try {
    const existingAdmin = await User.findOne({ email: "admin@gmail.com" });

    if (existingAdmin) {
      return res.json({ msg: "Admin already exists" });
    }

    const admin = new User({
      name: "Admin",
      email: "admin@gmail.com",
      phone: "0771234567",
      password: "123456",
      role: "admin"
    });

    await admin.save();

    res.json({
      msg: "Admin created successfully",
      admin
    });
  } catch (err) {
    res.status(500).json({ msg: "Error creating admin" });
  }
};

// ------------------- UPDATE PROFILE -------------------
exports.updateProfile = async (req, res) => {
  const { id } = req.params;
  const { name, email, phone } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        name,
        email,
        phone
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ msg: "Error updating profile" });
  }
};