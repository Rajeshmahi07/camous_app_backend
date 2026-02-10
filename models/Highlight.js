const mongoose = require("mongoose");

const highlightSchema = new mongoose.Schema(
  {
    studentsTrained: {
      type: String,
      required: true,
      trim: true,
    },
    partnerCompanies: {
      type: String,
      required: true,
      trim: true,
    },
    placementRate: {
      type: String,
      required: true,
      trim: true,
    },
    highestPackage: {
      type: String,
      required: true,
      trim: true,
    },
    averagePackage: {
      type: String,
      required: true,
      trim: true,
    },
    trainingPrograms: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Highlight", highlightSchema);
