const express = require("express");
const {
  addCompany,
  getAllCompanies,
  updateCompany,
  deleteCompany,
} = require("../controllers/companyController");

const router = express.Router();

router.post("/add", addCompany);
router.get("/all", getAllCompanies);
router.put("/update/:id", updateCompany);
router.delete("/delete/:id", deleteCompany);

module.exports = router;
