const mongoose = require("mongoose");

const placementSchema = new mongoose.Schema(
  {
    studentName: {
      type: String,
      required: true,
      trim: true,
    },

    course: {
      type: String,
      required: true,
      trim: true,
    },

    company: {
      type: String,
      required: true,
      trim: true,
    },

    role: {
      type: String,
      trim: true,
      default: "Software Engineer",
    },

    location: {
      type: String,
      trim: true,
      default: "Bengaluru",
    },

    photo: {
      type: String,
      trim: true,
      default:
        "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=60",
    },

    package: {
      type: Number, // in LPA
      required: true,
      min: 0,
    },

    year: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Rejected"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Placement", placementSchema);
