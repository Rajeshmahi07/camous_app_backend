const Company = require("../models/Company");

// ➕ Add Company
exports.addCompany = async (req, res) => {
  try {
    const { companyName, role, ctc, location, status, visitDate } = req.body;

    const company = await Company.create({
      companyName,
      role,
      ctc,
      location,
      status,
      visitDate,
    });

    res.status(201).json({
      success: true,
      message: "Company added successfully",
      company,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 📋 Get All Companies
exports.getAllCompanies = async (req, res) => {
  try {
    const companies = await Company.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      total: companies.length,
      companies,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✏️ Update Company
exports.updateCompany = async (req, res) => {
  try {
    const { id } = req.params;

    const company = await Company.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Company updated successfully",
      company,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ❌ Delete Company
exports.deleteCompany = async (req, res) => {
  try {
    const { id } = req.params;

    const company = await Company.findByIdAndDelete(id);

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Company deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
