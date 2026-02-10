const Contact = require("../models/Contact");

/* CREATE CONTACT (FROM WEBSITE FORM) */
exports.createContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    const contact = await Contact.create({
      name,
      email,
      subject,
      message,
    });

    res.status(201).json({
      success: true,
      contact,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to submit contact form",
    });
  }
};

/* GET ALL CONTACTS (ADMIN) */
exports.getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      contacts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch contacts",
    });
  }
};

/* MARK AS READ */
exports.markAsRead = async (req, res) => {
  await Contact.findByIdAndUpdate(req.params.id, { isRead: true });
  res.status(200).json({ success: true });
};

/* DELETE CONTACT */
exports.deleteContact = async (req, res) => {
  await Contact.findByIdAndDelete(req.params.id);
  res.status(200).json({ success: true });
};
