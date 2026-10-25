import { db } from '../data/dbStore.js';

export const getEnrollments = (req, res) => {
  try {
    const userId = req.query.userId || req.headers['x-user-id'];
    const enrollments = db.getEnrollments(userId);
    return res.json({ success: true, count: enrollments.length, data: enrollments });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const createEnrollment = (req, res) => {
  try {
    const { userId, courseId } = req.body;
    if (!userId || !courseId) {
      return res.status(400).json({ success: false, message: "userId and courseId are required" });
    }

    const course = db.getCourseByIdOrSlug(courseId);
    if (!course) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }

    const enrollment = db.addEnrollment(userId, course.id);
    return res.status(201).json({
      success: true,
      message: "Successfully enrolled in course",
      data: { ...enrollment, course }
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
