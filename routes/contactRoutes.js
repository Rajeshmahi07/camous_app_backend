const express = require("express");
const router = express.Router();

const {
  createContact,
  getContacts,
  markAsRead,
  deleteContact,
} = require("../controllers/contactController");

const { protect, authorize } = require("../middlewares/authMiddleware");

// PUBLIC (Website form)
router.post("/", createContact);

// ADMIN
router.get("/", protect, authorize("admin"), getContacts);
router.put("/:id/read", protect, authorize("admin"), markAsRead);
router.delete("/:id", protect, authorize("admin"), deleteContact);

module.exports = router;
