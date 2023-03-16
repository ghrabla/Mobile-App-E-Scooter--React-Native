const express = require("express");
const { getScooters, rentScooter, getRentedScooters } = require("../controller/scooterController");
const router = express.Router();

// import controller
const {register, login} = require("../controller/userController");

// @desc    Register a new user
router.route("/register").post(register);

// @desc    Login a user
router.route("/login").post(login);

// @desc    Get all users
router.route("/allScooters").get(getScooters);

// @desc    Rent a scooter
router.route("/rent/:sId/:uId").post(rentScooter);

// @desc    Get rented scooters
router.route("/rented").get(getRentedScooters);


// export route file
module.exports = router;
