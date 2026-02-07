const mongoose = require('mongoose');

const companySchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      required: true,
    },
    ctc: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      default: "On-Campus",
    },
    status: {
      type: String,
      enum: ["upcoming", "visited"],
      default: "upcoming",
    },
    visitDate: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Company", companySchema);
