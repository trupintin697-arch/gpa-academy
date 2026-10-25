import { db } from '../data/dbStore.js';

export const getCourses = (req, res) => {
  try {
    const { category, q } = req.query;
    let list = db.getCourses();

    if (category && category.toLowerCase() !== "all") {
      list = list.filter(c => c.category?.toLowerCase() === category.toLowerCase());
    }

    if (q) {
      const term = q.toLowerCase();
      list = list.filter(c => 
        c.title?.toLowerCase().includes(term) ||
        c.description?.toLowerCase().includes(term) ||
        c.category?.toLowerCase().includes(term)
      );
    }

    return res.json({ success: true, count: list.length, data: list });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const getCourseByIdOrSlug = (req, res) => {
  try {
    const { idOrSlug } = req.params;
    const course = db.getCourseByIdOrSlug(idOrSlug);
    if (!course) {
      return res.status(404).json({ success: false, message: `Course not found with id or slug: ${idOrSlug}` });
    }
    return res.json({ success: true, data: course });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const createCourse = (req, res) => {
  try {
    const { title, category, level, price, originalPrice, duration, description, highlights, instructorId } = req.body;
    if (!title || !price) {
      return res.status(400).json({ success: false, message: "Title and price are required" });
    }

    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const numPrice = typeof price === 'string' ? parseInt(price.replace(/[^0-9]/g, '')) * 100 || 99900 : price;

    const newCourse = {
      id: `course_${Date.now()}`,
      slug,
      title,
      description: description || "Comprehensive course by Gyan Prapti Academy faculty.",
      category: category || "BANKING",
      level: level || "BEGINNER",
      price: numPrice,
      originalPrice: originalPrice || numPrice * 2,
      duration: duration || "8 Weeks (32 Lectures)",
      rating: 4.9,
      totalRatings: 1,
      lessons: 10,
      tests: 4,
      highlights: highlights || ["Concept Masterclasses", "Official Formula Notes", "Timed Mock Tests"],
      instructorId: instructorId || "tch_1",
      isPublished: true,
      createdAt: new Date().toISOString()
    };

    const saved = db.addCourse(newCourse);
    return res.status(201).json({ success: true, message: "Course created successfully", data: saved });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const updateCourse = (req, res) => {
  try {
    const { id } = req.params;
    const updated = db.updateCourse(id, req.body);
    if (!updated) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }
    return res.json({ success: true, message: "Course updated successfully", data: updated });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const deleteCourse = (req, res) => {
  try {
    const { id } = req.params;
    const removed = db.deleteCourse(id);
    if (!removed) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }
    return res.json({ success: true, message: "Course deleted successfully", data: removed });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
