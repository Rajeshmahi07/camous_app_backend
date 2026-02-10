const Company = require("../models/Company");
const Application = require("../models/Application");

// ================= CREATE COMPANY =================
exports.createCompany = async (req, res) => {
  try {
    const company = await Company.create(req.body);

    res.status(201).json({
      success: true,
      company,
    });
  } catch (error) {
    console.error("Create company error:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// ================= GET ALL COMPANIES (REAL-TIME REGISTERED COUNT) =================
exports.getAllCompanies = async (req, res) => {
  try {
    const companies = await Company.find().sort({ createdAt: -1 });

    const companiesWithCount = await Promise.all(
      companies.map(async (company) => {
        // IMPORTANT: match by COMPANY NAME because Application stores company as STRING
        const registeredCount = await Application.countDocuments({
          company: company.name,
        });

        return {
          ...company.toObject(),
          registeredCount,
        };
      })
    );

    res.status(200).json({
      success: true,
      count: companiesWithCount.length,
      companies: companiesWithCount,
    });
  } catch (error) {
    console.error("Get all companies error:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// ================= GET SINGLE COMPANY =================
exports.getCompanyById = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);

    if (!company) {
      return res.status(404).json({
        success: false,
        error: "Company not found",
      });
    }

    const registeredCount = await Application.countDocuments({
      company: company.name,
    });

    res.status(200).json({
      success: true,
      company: {
        ...company.toObject(),
        registeredCount,
      },
    });
  } catch (error) {
    console.error("Get company by id error:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// ================= UPDATE COMPANY =================
exports.updateCompany = async (req, res) => {
  try {
    const company = await Company.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!company) {
      return res.status(404).json({
        success: false,
        error: "Company not found",
      });
    }

    res.status(200).json({
      success: true,
      company,
    });
  } catch (error) {
    console.error("Update company error:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// ================= DELETE COMPANY =================
exports.deleteCompany = async (req, res) => {
  try {
    const company = await Company.findByIdAndDelete(req.params.id);

    if (!company) {
      return res.status(404).json({
        success: false,
        error: "Company not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Company deleted successfully",
    });
  } catch (error) {
    console.error("Delete company error:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
