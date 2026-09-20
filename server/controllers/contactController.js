import Contact from "../models/Contact.js";

// @desc    Submit new contact inquiry
// @route   POST /api/contact
// @access  Public
export const submitContact = async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: "Please provide name, email, and message" });
    }

    const contact = await Contact.create({ name, email, subject, message });
    res.status(201).json({ success: true, message: "Message received successfully!", data: contact });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all messages (Admin)
// @route   GET /api/contact
// @access  Private (Admin)
export const getContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: contacts.length, data: contacts });
  } catch (error) {
    next(error);
  }
};
