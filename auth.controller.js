const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

exports.signup = async (req, res) => {
  try {
    const { name, email, password, address } = req.body;

    // Validations
    if (!name || name.length < 20 || name.length > 60) {
      return res.status(400).json({ message: "Name must be 20-60 characters" });
    }
    if (!password.match(/^(?=.*[A-Z])(?=.*[!@#$%^&*])/)) {
      return res.status(400).json({ message: "Password must have 1 uppercase & 1 special char" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      address,
      role: "USER", // Always USER for self-signup
    });

    res.status(201).json({ message: "User registered successfully", userId: user.id });
  } catch (error) {
    res.status(500).json({ message: "Signup failed", error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: "User not found" });

    console.log(" Incoming email:", email);
    console.log(" Incoming password:", password);
    console.log(" Stored hash from DB:", user.password);


    const isMatch = await bcrypt.compare(password, user.password);
    console.log(" Password match result:", isMatch);

if (!isMatch) {
  return res.status(400).json({ 
    message: "Invalid credentials", 
    debug: { password, hash: user.password } 
  });
}


    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ message: "Login successful", token, role: user.role });
  } catch (error) {
    res.status(500).json({ message: "Login failed", error: error.message });
  }
};
