import { db } from '../data/dbStore.js';

export const getMarquee = (req, res) => {
  return res.json({ success: true, data: db.getMarquee() });
};

export const setMarquee = (req, res) => {
  const { items } = req.body;
  if (!Array.isArray(items)) {
    return res.status(400).json({ success: false, message: "Items array is required" });
  }
  const updated = db.setMarquee(items);
  return res.json({ success: true, message: "Marquee ticker updated", data: updated });
};

export const getCategories = (req, res) => {
  return res.json({ success: true, data: db.getCategories() });
};

export const setCategories = (req, res) => {
  const { categories } = req.body;
  if (!Array.isArray(categories)) {
    return res.status(400).json({ success: false, message: "Categories array is required" });
  }
  const updated = db.setCategories(categories);
  return res.json({ success: true, message: "Exam categories updated", data: updated });
};
