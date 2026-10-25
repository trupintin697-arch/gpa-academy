import { db } from '../data/dbStore.js';

export const submitContact = async (req, res) => {
  try {
    const { name, email, message, phone } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: "Name, email, and message are required" });
    }

    const recorded = await db.addContactMessage({ name, email, message, phone });
    return res.status(201).json({
      success: true,
      message: "Thank you for reaching out! Our admissions & mentor team will contact you shortly.",
      data: recorded
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const getContactSubmissions = (req, res) => {
  return res.json({ success: true, data: db.getContactMessages() });
};
