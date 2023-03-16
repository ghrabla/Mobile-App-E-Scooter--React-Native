const asyncHandler = require("express-async-handler");
const Admin = require("../models/adminModel");
const User = require("../models/userModel");
const Scooter = require("../models/scooterModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// @desc    Register a new admin
// @route   POST /admin/register
// @access  Public

const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  //   check if any of the fields are empty
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please fill in all fields");
  }

  //   check if the admin already exists

  const adminExists = await Admin.findOne({
    email: email.toLowerCase(),
  });
  if (adminExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // create admin
  const admin = await Admin.create({
    name,
    email: email.toLowerCase(),
    password: hashedPassword,
    token: generateToken(),
  });

  //   if admin created send success message
  if (admin) {
    res.status(201).json({
      token: generateToken(admin._id),
    });
  } else {
    res.status(400);
    throw new Error("Incorrect email or password");
  }
});

// @desc    Auth user & get token
// @route   POST /admin/login
// @access  Public
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const admin = await Admin.findOne({
    email: email.toLowerCase(),
  });

  if (!admin) {
    res.status(404);
    throw new Error("Admin not found");
  }

  if (admin && (await bcrypt.compare(password, admin.password))) {
    res.json({
      token: generateToken(admin._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc    Get me
// @route   GET /admin/me
// @access  Private

const getMe = asyncHandler(async (req, res) => {
  const admin = await Admin.findById(req.admin.id);

  if (admin) {
    res.json({
      _id: admin._id,
      name: admin.name,
      email: admin.email,
    });
  } else {
    res.status(404);
    throw new Error("Admin not found");
  }
});

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

module.exports = {
  register,
  login,
  getMe,
};
