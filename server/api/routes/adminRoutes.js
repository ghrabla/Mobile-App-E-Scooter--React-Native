const express = require("express");
const router = express.Router();

// import middleware
const { protect } = require("../middleware/authMiddleware");

// import controller
const {register, login, getMe} = require("../controller/adminController");
const { getScooters, createScooter, deleteScooter, disableScooter } = require("../controller/scooterController");
const { getUsers } = require("../controller/userController");

// @desc    Register a new admin
router.route("/register").post(register);

// @desc    Login a admin
router.route("/login").post(login);

// @desc    Get me
router.route("/me").get(protect, getMe);

// @desc    Get all users
router.route("/allUsers").get(protect, getUsers);

// @desc    Create new scooter
router.route("/scooter").post(protect, createScooter);

// @desc    Delete scooter
router.route("/scooter/:id").delete(protect, deleteScooter);

// @desc    Get all scooters
router.route("/scooters").get(protect, getScooters);

// @desc    Disable and enable scooter
router.route("/scooter/:id").put(disableScooter);



// export route file
module.exports = router;
