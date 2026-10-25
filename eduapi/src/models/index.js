import mongoose from 'mongoose';

const schemaOptions = { strict: false, timestamps: true };

const userSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  role: { type: String, default: 'student' },
  phone: { type: String, default: '' },
  avatar: { type: String, default: '' },
  banned: { type: Boolean, default: false },
  banReason: { type: String, default: '' },
  targetExam: { type: String, default: '' },
  bio: { type: String, default: '' },
  joinedAt: { type: String, default: () => new Date().toISOString() }
}, schemaOptions);

const courseSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  slug: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String, default: '' },
  category: { type: String, default: 'BANKING' },
  level: { type: String, default: 'BEGINNER' },
  price: { type: Number, required: true },
  originalPrice: { type: Number, default: 0 },
  duration: { type: String, default: '' },
  rating: { type: Number, default: 4.9 },
  totalRatings: { type: Number, default: 1 },
  lessons: { type: Number, default: 10 },
  tests: { type: Number, default: 4 },
  instructorId: { type: String, default: 'tch_1' },
  isPublished: { type: Boolean, default: true },
  highlights: { type: [String], default: [] },
  createdAt: { type: String, default: () => new Date().toISOString() }
}, schemaOptions);

const mockTestSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  slug: { type: String, required: true },
  title: { type: String, required: true },
  subject: { type: String, required: true },
  duration: { type: Number, default: 120 },
  totalMarks: { type: Number, default: 100 },
  totalQuestions: { type: Number, default: 10 },
  summary: { type: String, default: '' },
  instructions: { type: [String], default: [] },
  batch: { type: String, default: 'All Students' },
  createdBy: { type: String, default: 'tch_1' },
  submissions: { type: Number, default: 0 },
  avgScore: { type: String, default: 'Pending' },
  violationsDetected: { type: Number, default: 0 },
  isPublished: { type: Boolean, default: true },
  questions: { type: Array, default: [] }
}, schemaOptions);

const testAttemptSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  studentId: { type: String, required: true, index: true },
  testId: { type: String, required: true, index: true },
  testTitle: { type: String, required: true },
  subject: { type: String, default: '' },
  totalQuestions: { type: Number, default: 0 },
  answeredCount: { type: Number, default: 0 },
  correctCount: { type: Number, default: 0 },
  wrongCount: { type: Number, default: 0 },
  unattempted: { type: Number, default: 0 },
  score: { type: Number, default: 0 },
  totalMarks: { type: Number, default: 100 },
  accuracy: { type: Number, default: 0 },
  percentage: { type: Number, default: 0 },
  timeSpent: { type: Number, default: 0 },
  violations: { type: Number, default: 0 },
  terminated: { type: Boolean, default: false },
  selectedAnswers: { type: mongoose.Schema.Types.Mixed, default: {} },
  submittedAt: { type: String, default: () => new Date().toISOString() }
}, schemaOptions);

const enrollmentSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  userId: { type: String, required: true, index: true },
  courseId: { type: String, required: true, index: true },
  enrolledAt: { type: String, default: () => new Date().toISOString() },
  progress: { type: Number, default: 0 }
}, schemaOptions);

const teacherVideoSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  youtubeUrl: { type: String, required: true },
  batch: { type: String, default: 'All Students' },
  createdBy: { type: String, default: 'tch_1' },
  viewsCount: { type: Number, default: 0 }
}, schemaOptions);

const noteSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  category: { type: String, default: '' }
}, schemaOptions);

const marqueeSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  text: { type: String, required: true }
}, schemaOptions);

const examCategorySchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true }
}, schemaOptions);

const contactMessageSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true }
}, schemaOptions);

export const User = mongoose.model('User', userSchema);
export const Course = mongoose.model('Course', courseSchema);
export const MockTest = mongoose.model('MockTest', mockTestSchema);
export const TestAttempt = mongoose.model('TestAttempt', testAttemptSchema);
export const Enrollment = mongoose.model('Enrollment', enrollmentSchema);
export const TeacherVideo = mongoose.model('TeacherVideo', teacherVideoSchema);
export const Note = mongoose.model('Note', noteSchema);
export const MarqueeItem = mongoose.model('MarqueeItem', marqueeSchema);
export const ExamCategory = mongoose.model('ExamCategory', examCategorySchema);
export const ContactMessage = mongoose.model('ContactMessage', contactMessageSchema);
