const asyncHandler = require("express-async-handler");
const Scooter = require("../models/scooterModel");
const Booking = require("../models/bookingModel");

// @desc    Get all scooters
// @route   GET /allScooters
// @access  Private

const getScooters = asyncHandler(async (req, res) => {
  // const scooters = await Scooter.find({ isRented: "Not Rented"});
  const scooters = await Scooter.find({});
  res.json(scooters);
});

// @desc    Create new scooter
// @route   POST /admin/scooter
// @access  Private

const createScooter = asyncHandler(async (req, res) => {
  const { latitude, longitude, company, model, battery, price } = req.body;

  if (!latitude || !longitude || !company || !model || !price) {
    res.status(400);
    throw new Error("Please fill in all fields");
  }

  const scooter = await Scooter.create({
    latitude,
    longitude,
    isRented: "Not Rented",
    company,
    model,
    battery: "4 hours",
    price,
  });

  if (scooter) {
    res.status(201).json(scooter);
  } else {
    res.status(400);
    throw new Error("Invalid scooter data");
  }
});

// @desc    Delete scooter
// @route   DELETE /admin/scooter/:id
// @access  Private

const deleteScooter = asyncHandler(async (req, res) => {
  const scooter = await Scooter.findById(req.params.id);

  if (scooter) {
    await scooter.remove();
    res.json({ message: "Scooter removed" });
  } else {
    res.status(404);
    throw new Error("Scooter not found");
  }
});

// @desc    Disable and enable scooter
// @route   POST /admin/scooter/:id
// @access  Private

const disableScooter = asyncHandler(async (req, res) => {
  const scooter = await Scooter.findById(req.params.id);

  if (scooter) {
    scooter.isDisabled = !scooter.isDisabled;
    await scooter.save();
    if (scooter.isDisabled) {
      res.json({ message: "Scooter disabled" });
    } else {
      res.json({ message: "Scooter enabled" });
    }
  } else {
    res.status(404);
    throw new Error("Scooter not found");
  }
});

// @desc    Rent a scooter
// @route   POST /user/rent
// @access  Private

const rentScooter = asyncHandler(async (req, res) => {
  const scooterId = req.params.sId;
  const userId = req.params.uId;
  const rTime = req.body.rTime;
  // const userId = req.user._id;
  if (!scooterId) {
    res.status(400);
    throw new Error("Scooter not found");
  }

  const rent = await Scooter.findByIdAndUpdate(scooterId, {
    isRented: "Rented",
  });

  const newScooter = await Scooter.findById(scooterId);

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    const hour = date.getHours().toString().padStart(2, "0");
    const minute = date.getMinutes().toString().padStart(2, "0");
    return `${day}/${month}/${year} ${hour}:${minute}`;
  }

  const rentedAt = formatDate(Date.now());

  const returnedAt = formatDate(Date.now() + rTime * 60 * 1000);

  if (rent) {
    // res.status(200).json(newScooter);
    const booking = await Booking.create({
      user: userId,
      scooter: scooterId,
      rentedAt,
      returnedAt,
      timeOfRent: rTime,
    });

    if (booking) {
      res.status(201).json(booking);
    } else {
      res.status(400);
      throw new Error("Invalid booking data");
    }
  } else {
    res.status(400);
    throw new Error("Scooter not found");
  }
});

// @desc    Get rented scooters
// @route   GET /user/rented
// @access  Private

const getRentedScooters = asyncHandler(async (req, res) => {
  const booking = await Booking.find({})
    .populate("user", "name email")
    .populate("scooter", "company model");
  res.json(booking);
});

// export route file
module.exports = {
  getScooters,
  createScooter,
  deleteScooter,
  rentScooter,
  disableScooter,
  getRentedScooters,
};
