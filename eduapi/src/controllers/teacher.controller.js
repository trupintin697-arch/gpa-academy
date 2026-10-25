import { db } from '../data/dbStore.js';

export const getVideos = (req, res) => {
  try {
    const { batch } = req.query;
    const list = db.getTeacherVideos(batch);
    return res.json({ success: true, count: list.length, data: list });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const createVideo = (req, res) => {
  try {
    const { title, youtubeUrl, batch, createdBy } = req.body;
    if (!title || !youtubeUrl) {
      return res.status(400).json({ success: false, message: "Title and YouTube URL are required" });
    }

    const newVideo = {
      id: `vid_${Date.now()}`,
      title,
      youtubeUrl,
      batch: batch || "All Students",
      createdBy: createdBy || "tch_1",
      views: 0,
      publishedAt: new Date().toISOString()
    };

    const saved = db.addTeacherVideo(newVideo);
    return res.status(201).json({
      success: true,
      message: "Video assigned to batch successfully",
      data: saved
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const getSubmissions = (req, res) => {
  try {
    const attempts = db.getAttempts();
    return res.json({ success: true, count: attempts.length, data: attempts });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
