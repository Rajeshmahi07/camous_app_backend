const Highlight = require("../models/Highlight");

// ================= CREATE OR UPDATE (ADMIN) =================
exports.upsertHighlights = async (req, res) => {
  try {
    const data = req.body;

    let highlight = await Highlight.findOne();

    if (highlight) {
      highlight = await Highlight.findByIdAndUpdate(
        highlight._id,
        data,
        { new: true, runValidators: true }
      );
    } else {
      highlight = await Highlight.create(data);
    }

    res.status(200).json({
      success: true,
      highlight,
    });
  } catch (error) {
    console.error("Highlight update error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to save highlights",
    });
  }
};

// ================= GET HIGHLIGHTS (PUBLIC) =================
exports.getHighlights = async (req, res) => {
  try {
    const highlight = await Highlight.findOne().sort({ createdAt: -1 });

    if (!highlight) {
      return res.status(200).json({
        success: true,
        highlight: null,
      });
    }

    res.status(200).json({
      success: true,
      highlight,
    });
  } catch (error) {
    console.error("Fetch highlights error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch highlights",
    });
  }
};
