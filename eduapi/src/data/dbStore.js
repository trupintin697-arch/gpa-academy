import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import * as seed from './seedData.js';
import connectMongoDB from '../config/db.js';
import {
  User,
  Course,
  MockTest,
  TestAttempt,
  Enrollment,
  TeacherVideo,
  Note,
  MarqueeItem,
  ExamCategory,
  ContactMessage
} from '../models/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_FILE = path.resolve(__dirname, '../../data.json');

class DatabaseStore {
  constructor() {
    this.data = null;
    this.mongoConnected = false;
    this.init();
  }

  async syncFromMongoDB() {
    try {
      await connectMongoDB();
      this.mongoConnected = true;

      // Check if MongoDB has existing data, otherwise seed it from seedData
      const userCount = await User.countDocuments();
      if (userCount === 0) {
        console.log('🌱 MongoDB database is empty. Seeding initial collections into MongoDB Atlas...');
        
        if (this.data.users?.length) await User.insertMany(this.data.users);
        if (this.data.courses?.length) await Course.insertMany(this.data.courses);
        if (this.data.mockTests?.length) await MockTest.insertMany(this.data.mockTests);
        if (this.data.enrollments?.length) await Enrollment.insertMany(this.data.enrollments);
        if (this.data.teacherVideos?.length) await TeacherVideo.insertMany(this.data.teacherVideos);
        if (this.data.notes?.length) await Note.insertMany(this.data.notes);
        if (this.data.marquee?.length) await MarqueeItem.insertMany(this.data.marquee);
        if (this.data.categories?.length) await ExamCategory.insertMany(this.data.categories);

        console.log('✅ Initial seed data migrated to MongoDB Atlas successfully!');
      }

      // Load latest documents from MongoDB
      console.log('🔄 Syncing collections from MongoDB Atlas...');
      const [
        users,
        courses,
        mockTests,
        enrollments,
        testAttempts,
        teacherVideos,
        notes,
        marquee,
        categories,
        contacts
      ] = await Promise.all([
        User.find({}).lean(),
        Course.find({}).lean(),
        MockTest.find({}).lean(),
        Enrollment.find({}).lean(),
        TestAttempt.find({}).lean(),
        TeacherVideo.find({}).lean(),
        Note.find({}).lean(),
        MarqueeItem.find({}).lean(),
        ExamCategory.find({}).lean(),
        ContactMessage.find({}).lean()
      ]);

      if (users.length) this.data.users = users;
      if (courses.length) this.data.courses = courses;
      if (mockTests.length) this.data.mockTests = mockTests;
      if (enrollments.length) this.data.enrollments = enrollments;
      if (testAttempts.length) this.data.testAttempts = testAttempts;
      if (teacherVideos.length) this.data.teacherVideos = teacherVideos;
      if (notes.length) this.data.notes = notes;
      if (marquee.length) this.data.marquee = marquee;
      if (categories.length) this.data.categories = categories;
      if (contacts.length) this.data.contacts = contacts;

      this.save();
      console.log(`✅ State synchronized with MongoDB Atlas! (${users.length} Users, ${courses.length} Courses, ${mockTests.length} Tests)`);
    } catch (err) {
      console.warn('⚠️ MongoDB sync failed or deferred:', err.message);
    }
  }

  init() {
    if (fs.existsSync(DB_FILE)) {
      try {
        const raw = fs.readFileSync(DB_FILE, 'utf8');
        this.data = JSON.parse(raw);
        console.log('📦 Loaded existing local database cache from data.json');
      } catch (err) {
        console.warn('⚠️ Could not parse data.json, re-seeding...', err);
      }
    }

    if (!this.data) {
      console.log('🌱 Seeding fresh database cache from seedData.js');
      this.data = {
        users: [...seed.mockUsers],
        courses: [...seed.mockCourses],
        mockTests: [...seed.mockTestsData],
        enrollments: [
          { id: "enr_1", userId: "std_1", courseId: "course_1", enrolledAt: new Date(2026, 0, 1).toISOString(), progress: 42 },
          { id: "enr_2", userId: "std_1", courseId: "course_2", enrolledAt: new Date(2026, 0, 5).toISOString(), progress: 18 }
        ],
        testAttempts: [],
        teacherVideos: [...(seed.teacherAssignedVideos || [])],
        notes: [...(seed.freeNotes || seed.mockNotes || [])],
        marquee: [...(seed.defaultMarqueeItems || [])],
        categories: [...(seed.defaultExamCategories || seed.examCategories || [])],
        contacts: []
      };
      this.save();
    }

    // Connect and sync with MongoDB Atlas
    this.syncFromMongoDB();
  }

  save() {
    try {
      fs.writeFileSync(DB_FILE, JSON.stringify(this.data, null, 2), 'utf8');
    } catch (err) {
      console.error('❌ Failed to save data.json:', err);
    }
  }

  // ================= USERS =================
  getUsers() { return this.data.users; }
  getUserById(id) { return this.data.users.find(u => u.id === id || u.email?.toLowerCase() === id?.toLowerCase()); }
  getUserByEmail(email) { return this.data.users.find(u => u.email?.toLowerCase() === email?.toLowerCase()); }
  
  addUser(user) {
    const existingIdx = this.data.users.findIndex(u => u.id === user.id || u.email?.toLowerCase() === user.email?.toLowerCase());
    if (existingIdx !== -1) {
      this.data.users[existingIdx] = { ...this.data.users[existingIdx], ...user };
      this.save();
      User.findOneAndUpdate(
        { $or: [{ id: user.id }, { email: user.email.toLowerCase() }] },
        { $set: user },
        { upsert: true, new: true }
      ).catch(e => console.error('MongoDB User Update error:', e.message));
      return this.data.users[existingIdx];
    }
    this.data.users.unshift(user);
    this.save();

    User.create(user).catch(e => console.error('MongoDB User Insert error:', e.message));
    return user;
  }

  updateUser(id, patch) {
    const idx = this.data.users.findIndex(u => u.id === id || u.email?.toLowerCase() === id?.toLowerCase());
    if (idx !== -1) {
      this.data.users[idx] = { ...this.data.users[idx], ...patch };
      this.save();

      User.findOneAndUpdate(
        { $or: [{ id }, { email: id.toLowerCase() }] },
        { $set: patch },
        { new: true }
      ).catch(e => console.error('MongoDB User Update error:', e.message));

      return this.data.users[idx];
    }
    return null;
  }

  // ================= COURSES =================
  getCourses() { return this.data.courses; }
  getCourseByIdOrSlug(idOrSlug) {
    return this.data.courses.find(c => c.id === idOrSlug || c.slug === idOrSlug);
  }

  addCourse(course) {
    this.data.courses.unshift(course);
    this.save();

    Course.create(course).catch(e => console.error('MongoDB Course Insert error:', e.message));
    return course;
  }

  updateCourse(id, patch) {
    const idx = this.data.courses.findIndex(c => c.id === id);
    if (idx !== -1) {
      this.data.courses[idx] = { ...this.data.courses[idx], ...patch };
      this.save();

      Course.findOneAndUpdate({ id }, { $set: patch }, { new: true })
        .catch(e => console.error('MongoDB Course Update error:', e.message));

      return this.data.courses[idx];
    }
    return null;
  }

  deleteCourse(id) {
    const idx = this.data.courses.findIndex(c => c.id === id);
    if (idx !== -1) {
      const removed = this.data.courses.splice(idx, 1)[0];
      this.save();
      Course.deleteOne({ id }).catch(e => console.error('MongoDB Course Delete error:', e.message));
      return removed;
    }
    return null;
  }

  // ================= ENROLLMENTS =================
  getEnrollments(userId) {
    const list = userId 
      ? this.data.enrollments.filter(e => e.userId === userId || e.userId === userId.toLowerCase())
      : this.data.enrollments;
    
    return list.map(enr => ({
      ...enr,
      course: this.getCourseByIdOrSlug(enr.courseId) || null
    }));
  }

  addEnrollment(userId, courseId) {
    const existing = this.data.enrollments.find(e => 
      (e.userId === userId || e.userId === userId.toLowerCase()) && 
      (e.courseId === courseId || e.courseId === this.getCourseByIdOrSlug(courseId)?.id)
    );
    if (existing) return existing;

    const newEnr = {
      id: `enr_${Date.now()}`,
      userId,
      courseId,
      enrolledAt: new Date().toISOString(),
      progress: 0
    };
    this.data.enrollments.unshift(newEnr);
    this.save();

    Enrollment.create(newEnr).catch(e => console.error('MongoDB Enrollment Insert error:', e.message));
    return newEnr;
  }

  // ================= MOCK TESTS =================
  getMockTests() { return this.data.mockTests; }
  getMockTestById(id) { return this.data.mockTests.find(t => t.id === id || t.slug === id); }
  
  addMockTest(test) {
    this.data.mockTests.unshift(test);
    this.save();

    MockTest.create(test).catch(e => console.error('MongoDB MockTest Insert error:', e.message));
    return test;
  }

  updateMockTest(id, patch) {
    const idx = this.data.mockTests.findIndex(t => t.id === id);
    if (idx !== -1) {
      this.data.mockTests[idx] = { ...this.data.mockTests[idx], ...patch };
      this.save();

      MockTest.findOneAndUpdate({ id }, { $set: patch }, { new: true })
        .catch(e => console.error('MongoDB MockTest Update error:', e.message));

      return this.data.mockTests[idx];
    }
    return null;
  }

  // ================= ATTEMPTS =================
  getAttempts(studentId) {
    return studentId
      ? this.data.testAttempts.filter(a => a.studentId === studentId || a.studentId === studentId.toLowerCase())
      : this.data.testAttempts;
  }

  getAttemptByTest(testId, studentId) {
    return this.data.testAttempts.find(a => 
      a.testId === testId && 
      (!studentId || a.studentId === studentId || a.studentId === studentId.toLowerCase())
    );
  }

  recordAttempt(attempt) {
    this.data.testAttempts = this.data.testAttempts.filter(
      a => !(a.testId === attempt.testId && a.studentId === attempt.studentId)
    );
    this.data.testAttempts.unshift(attempt);

    const test = this.getMockTestById(attempt.testId);
    if (test) {
      const submissions = (test.submissions || 0) + 1;
      const prevScore = parseFloat(test.avgScore) || 0;
      const newAvg = test.submissions 
        ? ((prevScore * test.submissions) + attempt.score) / submissions
        : attempt.score;
      this.updateMockTest(test.id, {
        submissions,
        avgScore: `${newAvg.toFixed(1)}/${test.totalMarks}`
      });
    }

    this.save();

    TestAttempt.findOneAndUpdate(
      { id: attempt.id },
      { $set: attempt },
      { upsert: true, new: true }
    ).catch(e => console.error('MongoDB TestAttempt Insert error:', e.message));

    return attempt;
  }

  // ================= TEACHER VIDEOS =================
  getTeacherVideos(batch) {
    if (!batch || batch === "All Students") return this.data.teacherVideos;
    return this.data.teacherVideos.filter(v => v.batch === batch);
  }

  addTeacherVideo(video) {
    this.data.teacherVideos.unshift(video);
    this.save();

    TeacherVideo.create(video).catch(e => console.error('MongoDB TeacherVideo Insert error:', e.message));
    return video;
  }

  // ================= NOTES =================
  getNotes(category) {
    if (!category || category.toLowerCase() === "all") return this.data.notes;
    return this.data.notes.filter(n => n.category?.toLowerCase() === category.toLowerCase() || n.subject?.toLowerCase() === category.toLowerCase());
  }

  addNote(note) {
    this.data.notes.unshift(note);
    this.save();

    Note.create(note).catch(e => console.error('MongoDB Note Insert error:', e.message));
    return note;
  }

  // ================= SETTINGS & CMS =================
  getMarquee() { return this.data.marquee; }
  setMarquee(items) {
    this.data.marquee = items;
    this.save();

    MarqueeItem.deleteMany({}).then(() => MarqueeItem.insertMany(items))
      .catch(e => console.error('MongoDB Marquee Update error:', e.message));

    return items;
  }

  getCategories() { return this.data.categories; }
  setCategories(items) {
    this.data.categories = items;
    this.save();

    ExamCategory.deleteMany({}).then(() => ExamCategory.insertMany(items))
      .catch(e => console.error('MongoDB Category Update error:', e.message));

    return items;
  }

  // ================= CONTACTS =================
  async addContactMessage(msg) {
    const entry = { id: `msg_${Date.now()}`, ...msg, receivedAt: new Date().toISOString() };
    this.data.contacts.unshift(entry);
    this.save();

    try {
      await ContactMessage.create(entry);
    } catch (err) {
      console.error('MongoDB Contact Insert error:', err.message);
    }

    return entry;
  }
  getContactMessages() { return this.data.contacts; }
}

export const db = new DatabaseStore();
