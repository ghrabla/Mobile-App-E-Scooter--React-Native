const mongoose = require("mongoose");

const bookingSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    scooter: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Scooter",
    },
    rentedAt: {
      type: String,
      required: true,
    },
    returnedAt: {
      type: String,
      required: true,
    },
    timeOfRent: {
      type: Number,
      required: true,
    },
  },
);

module.exports = mongoose.model("Booking", bookingSchema);
