const mongoose = require("mongoose");

const scooterSchema = mongoose.Schema({
  latitude: {
    type: Number,
    required: [true, "Please enter a valid latitude"],
  },
  longitude: {
    type: Number,
    required: [true, "Please enter a valid longitude"],
  },
  isRented: {
    type: String,
  },
  company: {
    type: String,
  },
  model: {
    type: String,
  },
  battery: {
    type: String,
  },
  price: {
    type: String,
  },
  isDisabled: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Scooter", scooterSchema);
