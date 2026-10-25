import { db } from '../data/dbStore.js';

export const getNotes = (req, res) => {
  try {
    const { category } = req.query;
    const list = db.getNotes(category);
    return res.json({ success: true, count: list.length, data: list });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const createNote = (req, res) => {
  try {
    const { title, subject, category, fileUrl, pages, size, downloadCount } = req.body;
    if (!title || !subject) {
      return res.status(400).json({ success: false, message: "Title and subject are required" });
    }

    const newNote = {
      id: `note_${Date.now()}`,
      title,
      subject,
      category: category || subject,
      pages: pages || 12,
      size: size || "2.4 MB",
      downloadCount: downloadCount || 0,
      fileUrl: fileUrl || "/notes/sample.pdf",
      uploadedAt: new Date().toISOString()
    };

    const saved = db.addNote(newNote);
    return res.status(201).json({ success: true, message: "Note added successfully", data: saved });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
