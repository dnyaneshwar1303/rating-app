const bcrypt = require("bcryptjs");
const User = require("../models/user.model");

exports.createUser = async (req, res) => {
  try {
    const { name, email, password, address, role } = req.body;

    // Validate role
    if (!["ADMIN", "USER", "OWNER"].includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    // Validations
    if (!name || name.length < 20 || name.length > 60) {
      return res.status(400).json({ message: "Name must be 20-60 characters" });
    }
    if (!password.match(/^(?=.*[A-Z])(?=.*[!@#$%^&*])/)) {
      return res.status(400).json({ message: "Password must have 1 uppercase & 1 special char" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      address,
      role,
    });

    res.status(201).json({ message: "User created successfully", userId: newUser.id });
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error: error.message });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const { name, email, address, role } = req.query;

    const filters = {};
    if (name) filters.name = name;
    if (email) filters.email = email;
    if (address) filters.address = address;
    if (role) filters.role = role;

    const users = await User.findAll({
      where: filters,
      attributes: ["id", "name", "email", "address", "role"],
    });

    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error: error.message });
  }
};

exports.updatePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const userId = req.user.id;

    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) return res.status(400).json({ message: "Old password is incorrect" });

    if (!newPassword.match(/^(?=.*[A-Z])(?=.*[!@#$%^&*])/)) {
      return res.status(400).json({ message: "New password must have 1 uppercase & 1 special char" });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.json({ message: "Password updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating password", error: error.message });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const { name, email, address, role, sortBy = "name", order = "ASC" } = req.query;

    const filters = {};
    if (name) filters.name = name;
    if (email) filters.email = email;
    if (address) filters.address = address;
    if (role) filters.role = role;

    const users = await User.findAll({
      where: filters,
      attributes: ["id", "name", "email", "address", "role"],
      order: [[sortBy, order.toUpperCase()]], // sorting support
    });

    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error: error.message });
  }
};
