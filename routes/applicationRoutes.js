const express = require("express");
const router = express.Router();

const { protect, authorize } = require("../middlewares/authMiddleware");
const {
  applyJob,
  getMyApplications,
  deleteApplication,
} = require("../controllers/applicationController");
const Application = require("../models/Application");

// ================= STUDENT: APPLY FOR JOB =================
router.post("/apply/:jobId", protect, applyJob);

// ================= STUDENT: GET MY APPLICATIONS =================
router.get("/my", protect, getMyApplications);

// ================= ADMIN: GET ALL APPLICATIONS =================
router.get(
  "/",
  protect,
  authorize("admin"),
  async (req, res) => {
    try {
      const applications = await Application.find()
        .populate("user", "name email")
        .sort({ createdAt: -1 });

      res.status(200).json({
        success: true,
        applications,
      });
    } catch (error) {
      console.error("Fetch applications error:", error);
      res.status(500).json({
        success: false,
        error: "Failed to fetch applications",
      });
    }
  }
);

// ================= ADMIN: DELETE APPLICATION =================
router.delete(
  "/:id",
  protect,
  authorize("admin"),
  deleteApplication
);

module.exports = router;
