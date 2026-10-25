import fs from 'fs';
import { db } from './src/data/dbStore.js';

function escapeSql(str) {
  if (str === null || str === undefined) return 'NULL';
  if (typeof str === 'boolean') return str ? '1' : '0';
  if (typeof str === 'number') return str.toString();
  return "N'" + str.toString().replace(/'/g, "''") + "'";
}

let sql = `-- ==============================================================
-- GPA ACADEMY COMPLETE DATABASE SCHEMA & SEED SCRIPT
-- Database: gpa
-- Target Server: LAPTOP-JLFVUSN4 (Microsoft SQL Server)
-- ==============================================================

USE [master];
GO

IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = N'gpa')
BEGIN
    CREATE DATABASE [gpa];
END
GO

USE [gpa];
GO

-- 1. DROP EXISTING TABLES IN REVERSE ORDER OF DEPENDENCY
IF OBJECT_ID('dbo.TestAttempts', 'U') IS NOT NULL DROP TABLE dbo.TestAttempts;
IF OBJECT_ID('dbo.TestQuestions', 'U') IS NOT NULL DROP TABLE dbo.TestQuestions;
IF OBJECT_ID('dbo.Enrollments', 'U') IS NOT NULL DROP TABLE dbo.Enrollments;
IF OBJECT_ID('dbo.CourseVideos', 'U') IS NOT NULL DROP TABLE dbo.CourseVideos;
IF OBJECT_ID('dbo.TeacherVideos', 'U') IS NOT NULL DROP TABLE dbo.TeacherVideos;
IF OBJECT_ID('dbo.MockTests', 'U') IS NOT NULL DROP TABLE dbo.MockTests;
IF OBJECT_ID('dbo.Courses', 'U') IS NOT NULL DROP TABLE dbo.Courses;
IF OBJECT_ID('dbo.Notes', 'U') IS NOT NULL DROP TABLE dbo.Notes;
IF OBJECT_ID('dbo.MarqueeItems', 'U') IS NOT NULL DROP TABLE dbo.MarqueeItems;
IF OBJECT_ID('dbo.ExamCategories', 'U') IS NOT NULL DROP TABLE dbo.ExamCategories;
IF OBJECT_ID('dbo.ContactMessages', 'U') IS NOT NULL DROP TABLE dbo.ContactMessages;
IF OBJECT_ID('dbo.Users', 'U') IS NOT NULL DROP TABLE dbo.Users;
GO

-- 2. CREATE USERS TABLE
CREATE TABLE dbo.Users (
    Id NVARCHAR(100) NOT NULL PRIMARY KEY,
    Name NVARCHAR(200) NOT NULL,
    Email NVARCHAR(255) NOT NULL UNIQUE,
    PasswordHash NVARCHAR(255) NULL,
    Role NVARCHAR(50) NOT NULL DEFAULT 'student',
    Phone NVARCHAR(50) NULL,
    Avatar NVARCHAR(500) NULL,
    Banned BIT NOT NULL DEFAULT 0,
    BanReason NVARCHAR(500) NULL,
    TargetExam NVARCHAR(100) NULL,
    Bio NVARCHAR(MAX) NULL,
    JoinedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    CreatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME()
);
CREATE NONCLUSTERED INDEX IX_Users_Role ON dbo.Users(Role);
CREATE NONCLUSTERED INDEX IX_Users_Email ON dbo.Users(Email);
GO

-- 3. CREATE COURSES TABLE
CREATE TABLE dbo.Courses (
    Id NVARCHAR(100) NOT NULL PRIMARY KEY,
    Slug NVARCHAR(255) NOT NULL UNIQUE,
    Title NVARCHAR(255) NOT NULL,
    Description NVARCHAR(MAX) NULL,
    Category NVARCHAR(100) NOT NULL,
    Level NVARCHAR(50) NOT NULL DEFAULT 'BEGINNER',
    Price INT NOT NULL,
    OriginalPrice INT NOT NULL,
    Duration NVARCHAR(100) NULL,
    Rating DECIMAL(3,2) NOT NULL DEFAULT 4.90,
    TotalRatings INT NOT NULL DEFAULT 0,
    LessonsCount INT NOT NULL DEFAULT 0,
    TestsCount INT NOT NULL DEFAULT 0,
    InstructorId NVARCHAR(100) NULL,
    IsPublished BIT NOT NULL DEFAULT 1,
    HighlightsJson NVARCHAR(MAX) NULL,
    CreatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    CONSTRAINT FK_Courses_Instructor FOREIGN KEY (InstructorId) REFERENCES dbo.Users(Id)
);
CREATE NONCLUSTERED INDEX IX_Courses_Category ON dbo.Courses(Category);
CREATE NONCLUSTERED INDEX IX_Courses_Slug ON dbo.Courses(Slug);
GO

-- 4. CREATE COURSE VIDEOS TABLE
CREATE TABLE dbo.CourseVideos (
    Id NVARCHAR(100) NOT NULL PRIMARY KEY,
    CourseId NVARCHAR(100) NOT NULL,
    Title NVARCHAR(255) NOT NULL,
    Duration NVARCHAR(50) NULL,
    YoutubeUrl NVARCHAR(500) NOT NULL,
    IsFree BIT NOT NULL DEFAULT 0,
    SortOrder INT NOT NULL DEFAULT 0,
    CreatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    CONSTRAINT FK_CourseVideos_Course FOREIGN KEY (CourseId) REFERENCES dbo.Courses(Id) ON DELETE CASCADE
);
CREATE NONCLUSTERED INDEX IX_CourseVideos_CourseId ON dbo.CourseVideos(CourseId);
GO

-- 5. CREATE ENROLLMENTS TABLE
CREATE TABLE dbo.Enrollments (
    Id NVARCHAR(100) NOT NULL PRIMARY KEY,
    UserId NVARCHAR(100) NOT NULL,
    CourseId NVARCHAR(100) NOT NULL,
    Progress INT NOT NULL DEFAULT 0,
    EnrolledAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    CONSTRAINT FK_Enrollments_User FOREIGN KEY (UserId) REFERENCES dbo.Users(Id),
    CONSTRAINT FK_Enrollments_Course FOREIGN KEY (CourseId) REFERENCES dbo.Courses(Id)
);
CREATE NONCLUSTERED INDEX IX_Enrollments_UserId ON dbo.Enrollments(UserId);
CREATE NONCLUSTERED INDEX IX_Enrollments_CourseId ON dbo.Enrollments(CourseId);
GO

-- 6. CREATE MOCK TESTS TABLE
CREATE TABLE dbo.MockTests (
    Id NVARCHAR(100) NOT NULL PRIMARY KEY,
    Slug NVARCHAR(255) NOT NULL UNIQUE,
    Title NVARCHAR(255) NOT NULL,
    Subject NVARCHAR(100) NOT NULL,
    DurationMinutes INT NOT NULL DEFAULT 120,
    TotalMarks DECIMAL(6,2) NOT NULL DEFAULT 100.00,
    TotalQuestions INT NOT NULL DEFAULT 0,
    Summary NVARCHAR(MAX) NULL,
    InstructionsJson NVARCHAR(MAX) NULL,
    Batch NVARCHAR(100) NOT NULL DEFAULT 'All Students',
    CreatedBy NVARCHAR(100) NULL,
    SubmissionsCount INT NOT NULL DEFAULT 0,
    AvgScore NVARCHAR(50) NOT NULL DEFAULT 'Pending',
    ViolationsDetected INT NOT NULL DEFAULT 0,
    IsPublished BIT NOT NULL DEFAULT 1,
    PublishedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    CONSTRAINT FK_MockTests_CreatedBy FOREIGN KEY (CreatedBy) REFERENCES dbo.Users(Id)
);
CREATE NONCLUSTERED INDEX IX_MockTests_Subject ON dbo.MockTests(Subject);
GO

-- 7. CREATE TEST QUESTIONS TABLE
CREATE TABLE dbo.TestQuestions (
    Id NVARCHAR(100) NOT NULL PRIMARY KEY,
    TestId NVARCHAR(100) NOT NULL,
    QuestionNumber INT NOT NULL,
    SectionId NVARCHAR(100) NOT NULL,
    SectionName NVARCHAR(100) NOT NULL,
    QuestionText NVARCHAR(MAX) NOT NULL,
    QuestionTextHi NVARCHAR(MAX) NULL,
    OptionsJson NVARCHAR(MAX) NOT NULL,
    OptionsHiJson NVARCHAR(MAX) NULL,
    CorrectAnswer INT NOT NULL,
    Marks DECIMAL(4,2) NOT NULL DEFAULT 1.00,
    NegativeMarks DECIMAL(4,2) NOT NULL DEFAULT 0.25,
    Explanation NVARCHAR(MAX) NULL,
    ExplanationHi NVARCHAR(MAX) NULL,
    CONSTRAINT FK_TestQuestions_Test FOREIGN KEY (TestId) REFERENCES dbo.MockTests(Id) ON DELETE CASCADE
);
CREATE NONCLUSTERED INDEX IX_TestQuestions_TestId ON dbo.TestQuestions(TestId);
GO

-- 8. CREATE TEST ATTEMPTS TABLE
CREATE TABLE dbo.TestAttempts (
    Id NVARCHAR(100) NOT NULL PRIMARY KEY,
    StudentId NVARCHAR(100) NOT NULL,
    TestId NVARCHAR(100) NOT NULL,
    TestTitle NVARCHAR(255) NOT NULL,
    Subject NVARCHAR(100) NULL,
    TotalQuestions INT NOT NULL,
    AnsweredCount INT NOT NULL,
    CorrectCount INT NOT NULL,
    WrongCount INT NOT NULL,
    UnattemptedCount INT NOT NULL,
    Score DECIMAL(6,2) NOT NULL,
    TotalMarks DECIMAL(6,2) NOT NULL,
    Accuracy INT NOT NULL,
    Percentage INT NOT NULL,
    TimeSpentSeconds INT NOT NULL,
    ViolationsCount INT NOT NULL DEFAULT 0,
    Terminated BIT NOT NULL DEFAULT 0,
    SelectedAnswersJson NVARCHAR(MAX) NOT NULL,
    SubmittedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    CONSTRAINT FK_TestAttempts_Student FOREIGN KEY (StudentId) REFERENCES dbo.Users(Id),
    CONSTRAINT FK_TestAttempts_Test FOREIGN KEY (TestId) REFERENCES dbo.MockTests(Id)
);
CREATE NONCLUSTERED INDEX IX_TestAttempts_StudentId ON dbo.TestAttempts(StudentId);
CREATE NONCLUSTERED INDEX IX_TestAttempts_TestId ON dbo.TestAttempts(TestId);
GO

-- 9. CREATE TEACHER VIDEOS TABLE
CREATE TABLE dbo.TeacherVideos (
    Id NVARCHAR(100) NOT NULL PRIMARY KEY,
    Title NVARCHAR(255) NOT NULL,
    YoutubeUrl NVARCHAR(500) NOT NULL,
    Batch NVARCHAR(100) NOT NULL,
    CreatedBy NVARCHAR(100) NOT NULL,
    ViewsCount INT NOT NULL DEFAULT 0,
    PublishedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    CONSTRAINT FK_TeacherVideos_CreatedBy FOREIGN KEY (CreatedBy) REFERENCES dbo.Users(Id)
);
GO

-- 10. CREATE NOTES TABLE
CREATE TABLE dbo.Notes (
    Id NVARCHAR(100) NOT NULL PRIMARY KEY,
    Title NVARCHAR(255) NOT NULL,
    Subject NVARCHAR(100) NOT NULL,
    Category NVARCHAR(100) NOT NULL,
    Pages INT NOT NULL DEFAULT 1,
    Size NVARCHAR(50) NOT NULL DEFAULT '2 MB',
    DownloadCount INT NOT NULL DEFAULT 0,
    FileUrl NVARCHAR(500) NOT NULL,
    UploadedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME()
);
GO

-- 11. CREATE MARQUEE ITEMS TABLE
CREATE TABLE dbo.MarqueeItems (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Title NVARCHAR(255) NOT NULL,
    Badge NVARCHAR(50) NOT NULL DEFAULT 'NEW',
    SortOrder INT NOT NULL DEFAULT 0,
    IsActive BIT NOT NULL DEFAULT 1
);
GO

-- 12. CREATE EXAM CATEGORIES TABLE
CREATE TABLE dbo.ExamCategories (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Label NVARCHAR(100) NOT NULL,
    Description NVARCHAR(MAX) NOT NULL,
    Path NVARCHAR(255) NOT NULL,
    SortOrder INT NOT NULL DEFAULT 0,
    IsActive BIT NOT NULL DEFAULT 1
);
GO

-- 13. CREATE CONTACT MESSAGES TABLE
CREATE TABLE dbo.ContactMessages (
    Id NVARCHAR(100) NOT NULL PRIMARY KEY,
    Name NVARCHAR(200) NOT NULL,
    Email NVARCHAR(255) NOT NULL,
    Phone NVARCHAR(50) NULL,
    Message NVARCHAR(MAX) NOT NULL,
    ReceivedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME()
);
GO

-- ==============================================================
-- 14. SEED DATA POPULATION
-- ==============================================================
PRINT 'Seeding Users...';
`;

// Insert Users
db.getUsers().forEach(u => {
  sql += `INSERT INTO dbo.Users (Id, Name, Email, Role, Phone, Avatar, Banned, BanReason)
VALUES (${escapeSql(u.id)}, ${escapeSql(u.name)}, ${escapeSql(u.email)}, ${escapeSql(u.role || 'student')}, ${escapeSql(u.phone)}, ${escapeSql(u.avatar || u.profileImage)}, ${escapeSql(u.banned || false)}, ${escapeSql(u.banReason)});\n`;
});
sql += 'GO\n';

// Insert Courses
sql += "PRINT 'Seeding Courses and Videos...';\n";
db.getCourses().forEach(c => {
  const hJson = JSON.stringify(c.highlights || []);
  const category = c.category || 'BANKING';
  sql += `INSERT INTO dbo.Courses (Id, Slug, Title, Description, Category, Level, Price, OriginalPrice, Duration, Rating, TotalRatings, LessonsCount, TestsCount, InstructorId, IsPublished, HighlightsJson)
VALUES (${escapeSql(c.id)}, ${escapeSql(c.slug)}, ${escapeSql(c.title)}, ${escapeSql(c.description)}, ${escapeSql(category)}, ${escapeSql(c.level || 'BEGINNER')}, ${c.price || 99900}, ${c.originalPrice || 199900}, ${escapeSql(c.duration)}, ${c.rating || 4.9}, ${c.totalRatings || 100}, ${c.lessons || 8}, ${c.tests || 4}, ${escapeSql(c.instructorId || 'tch_1')}, ${c.isPublished ? 1 : 0}, ${escapeSql(hJson)});\n`;

  if (Array.isArray(c.videos)) {
    c.videos.forEach((v, vIdx) => {
      const vidId = `${c.id}_${v.id || vIdx + 1}`;
      sql += `INSERT INTO dbo.CourseVideos (Id, CourseId, Title, Duration, YoutubeUrl, IsFree, SortOrder)
VALUES (${escapeSql(vidId)}, ${escapeSql(c.id)}, ${escapeSql(v.title)}, ${escapeSql(v.duration)}, ${escapeSql(v.youtubeUrl)}, ${v.isFree ? 1 : 0}, ${vIdx});\n`;
    });
  }
});
sql += 'GO\n';

// Insert Enrollments
sql += "PRINT 'Seeding Enrollments...';\n";
const enrollments = db.getEnrollments();
enrollments.forEach(e => {
  sql += `INSERT INTO dbo.Enrollments (Id, UserId, CourseId, Progress)
VALUES (${escapeSql(e.id)}, ${escapeSql(e.userId)}, ${escapeSql(e.courseId)}, ${e.progress || 0});\n`;
});
sql += 'GO\n';

// Insert Mock Tests & Questions
sql += "PRINT 'Seeding Mock Tests & Questions...';\n";
db.getMockTests().forEach(t => {
  const insJson = JSON.stringify(t.instructions || []);
  sql += `INSERT INTO dbo.MockTests (Id, Slug, Title, Subject, DurationMinutes, TotalMarks, TotalQuestions, Summary, InstructionsJson, Batch, CreatedBy, SubmissionsCount, AvgScore, ViolationsDetected, IsPublished)
VALUES (${escapeSql(t.id)}, ${escapeSql(t.slug || t.id)}, ${escapeSql(t.title)}, ${escapeSql(t.subject)}, ${t.duration || 120}, ${t.totalMarks || 100}, ${t.totalQuestions || (t.questions?.length || 10)}, ${escapeSql(t.summary)}, ${escapeSql(insJson)}, ${escapeSql(t.batch || 'All Students')}, ${escapeSql(t.createdBy || 'tch_1')}, ${t.submissions || 0}, ${escapeSql(t.avgScore || 'Pending')}, ${t.violationsDetected || 0}, 1);\n`;

  if (Array.isArray(t.questions)) {
    t.questions.forEach((q, qIdx) => {
      const qId = `${t.id}_q_${q.id || qIdx + 1}`;
      const optJson = JSON.stringify(q.options || []);
      const optHiJson = q.optionsHi ? JSON.stringify(q.optionsHi) : null;
      sql += `INSERT INTO dbo.TestQuestions (Id, TestId, QuestionNumber, SectionId, SectionName, QuestionText, QuestionTextHi, OptionsJson, OptionsHiJson, CorrectAnswer, Marks, NegativeMarks, Explanation, ExplanationHi)
VALUES (${escapeSql(qId)}, ${escapeSql(t.id)}, ${qIdx + 1}, ${escapeSql(q.sectionId || 'sec_1')}, ${escapeSql(q.sectionName || q.section || 'General')}, ${escapeSql(q.question || q.text)}, ${escapeSql(q.questionHi || q.textHi)}, ${escapeSql(optJson)}, ${escapeSql(optHiJson)}, ${q.correctAnswer ?? q.correct ?? 0}, ${q.marks || 1}, ${q.negativeMarks || 0.25}, ${escapeSql(q.explanation)}, ${escapeSql(q.explanationHi)});\n`;
    });
  }
});
sql += 'GO\n';

// Insert Teacher Videos
sql += "PRINT 'Seeding Teacher Videos...';\n";
db.getTeacherVideos().forEach(v => {
  sql += `INSERT INTO dbo.TeacherVideos (Id, Title, YoutubeUrl, Batch, CreatedBy, ViewsCount)
VALUES (${escapeSql(v.id)}, ${escapeSql(v.title)}, ${escapeSql(v.youtubeUrl)}, ${escapeSql(v.batch || 'All Students')}, ${escapeSql(v.createdBy || 'tch_1')}, ${v.views || 0});\n`;
});
sql += 'GO\n';

// Insert Notes
sql += "PRINT 'Seeding Notes...';\n";
db.getNotes().forEach(n => {
  const cat = n.category || n.subject || 'General';
  sql += `INSERT INTO dbo.Notes (Id, Title, Subject, Category, Pages, Size, DownloadCount, FileUrl)
VALUES (${escapeSql(n.id)}, ${escapeSql(n.title)}, ${escapeSql(n.subject || cat)}, ${escapeSql(cat)}, ${n.pages || 10}, ${escapeSql(n.size || '2.5 MB')}, ${n.downloadCount || 0}, ${escapeSql(n.fileUrl || '/notes/sample.pdf')});\n`;
});
sql += 'GO\n';

// Insert Marquee
sql += "PRINT 'Seeding Marquee Items...';\n";
db.getMarquee().forEach((m, idx) => {
  sql += `INSERT INTO dbo.MarqueeItems (Title, Badge, SortOrder)
VALUES (${escapeSql(m.title)}, ${escapeSql(m.badge)}, ${idx});\n`;
});
sql += 'GO\n';

// Insert Exam Categories
sql += "PRINT 'Seeding Exam Categories...';\n";
db.getCategories().forEach((c, idx) => {
  sql += `INSERT INTO dbo.ExamCategories (Label, Description, Path, SortOrder)
VALUES (${escapeSql(c.label)}, ${escapeSql(c.description)}, ${escapeSql(c.path)}, ${idx});\n`;
});
sql += 'GO\n';

sql += `
PRINT '==============================================================';
PRINT 'GPA Database Schema & Seed Data successfully completed!';
PRINT '==============================================================';
`;

fs.writeFileSync('./setup_gpa_db.sql', sql, 'utf8');
console.log('Successfully written setup_gpa_db.sql');
