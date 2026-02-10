const Application = require("../models/Application");
const Company = require("../models/Company");

// ================= APPLY FOR JOB =================
exports.applyJob = async (req, res) => {
  try {
    const company = await Company.findById(req.params.jobId);

    if (!company) {
      return res.status(404).json({
        success: false,
        error: "Company not found",
      });
    }

    // Prevent duplicate application
    const alreadyApplied = await Application.findOne({
      user: req.user._id,
      companyId: company._id,
    });

    if (alreadyApplied) {
      return res.status(400).json({
        success: false,
        error: "You have already applied to this company",
      });
    }

    const application = await Application.create({
      user: req.user._id,
      companyId: company._id,
      company: company.name,
      role: req.body.role,
      fullName: req.body.fullName,
      email: req.body.email,
      phone: req.body.phone,
      enrollmentNo: req.body.enrollmentNo,
      course: req.body.course,
      department: req.body.department,
      resumeLink: req.body.resumeLink,
    });

    res.status(201).json({
      success: true,
      application,
    });
  } catch (error) {
    console.error("Apply job error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to apply for job",
    });
  }
};

// ================= GET MY APPLICATIONS =================
exports.getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({
      user: req.user._id,
    }).select("companyId");

    res.status(200).json({
      success: true,
      applications,
    });
  } catch (error) {
    console.error("Fetch my applications error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch applications",
    });
  }
};

// ================= DELETE APPLICATION (ADMIN) =================
exports.deleteApplication = async (req, res) => {
  try {
    const application = await Application.findByIdAndDelete(req.params.id);

    if (!application) {
      return res.status(404).json({
        success: false,
        error: "Application not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Application deleted successfully",
    });
  } catch (error) {
    console.error("Delete application error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to delete application",
    });
  }
};
