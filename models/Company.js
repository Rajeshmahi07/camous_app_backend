const mongoose = require("mongoose");

const companySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    logo: {
      type: String,
      required: true,
    },

    package: {
      type: String, // e.g. "3.5 LPA"
      required: true,
    },

    visitDate: {
      type: String, // e.g. "20 Feb 2026"
      required: true,
    },

    lastDateToApply: {
      type: String, // e.g. "18 Feb 2026"
      required: true,
    },

    posts: {
      type: Number,
      required: true,
      min: 1,
    },

    role: {
      type: String,
      required: true,
      trim: true,
    },

    jobType: {
      type: String,
      required: true,
      enum: ["Full-time", "Internship", "Part-time", "Contract"],
    },

    location: {
      type: String,
      required: true,
      trim: true,
    },

    eligibility: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["Upcoming", "Ongoing", "Done"],
      default: "Upcoming",
    },

    skills: {
      type: [String], // array of skills
      required: true,
    },

    jobDescription: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Company", companySchema);
