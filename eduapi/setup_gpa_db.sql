-- ==============================================================
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
INSERT INTO dbo.Users (Id, Name, Email, Role, Phone, Avatar, Banned, BanReason)
VALUES (N'std_1', N'Ritika Singh', N'student@gpaacademy.in', N'student', N'+91-9876543210', N'https://api.dicebear.com/7.x/avataaars/svg?seed=Ritika', 0, NULL);
INSERT INTO dbo.Users (Id, Name, Email, Role, Phone, Avatar, Banned, BanReason)
VALUES (N'tch_1', N'Dr. Rajesh Kumar', N'faculty@gpaacademy.in', N'teacher', N'+91-9876543212', N'https://api.dicebear.com/7.x/avataaars/svg?seed=Rajesh', 0, NULL);
INSERT INTO dbo.Users (Id, Name, Email, Role, Phone, Avatar, Banned, BanReason)
VALUES (N'adm_1', N'Principal Administrator', N'admin@gpaacademy.in', N'admin', N'+91-9876543200', N'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin', 0, NULL);
GO
PRINT 'Seeding Courses and Videos...';
INSERT INTO dbo.Courses (Id, Slug, Title, Description, Category, Level, Price, OriginalPrice, Duration, Rating, TotalRatings, LessonsCount, TestsCount, InstructorId, IsPublished, HighlightsJson)
VALUES (N'course_1', N'vedic-maths-speed-tricks', N'Vedic Maths & Speed Calculation Mastery', N'Master lightning-fast mental calculations, multiplication shortcuts, square roots, and percentage approximations by Gyan Prapti Academy.', N'BANKING', N'BEGINNER', 99900, 199900, N'6 Weeks (24 Lectures)', 4.9, 1840, 8, 4, N'tch_1', 1, N'["Speed multiplication tricks","Fast square roots & cube roots","Mental percentage shortcuts","GPA official formula book"]');
INSERT INTO dbo.CourseVideos (Id, CourseId, Title, Duration, YoutubeUrl, IsFree, SortOrder)
VALUES (N'course_1_v1', N'course_1', N'Part 01: Number System & Speed Calculations', N'48:15', N'https://www.youtube.com/watch?v=P6ift-kfenw', 1, 0);
INSERT INTO dbo.CourseVideos (Id, CourseId, Title, Duration, YoutubeUrl, IsFree, SortOrder)
VALUES (N'course_1_v2', N'course_1', N'Part 02: Divisibility Rules & Remainder Theorem', N'52:10', N'https://www.youtube.com/watch?v=jO9u6wUj5mc', 1, 1);
INSERT INTO dbo.CourseVideos (Id, CourseId, Title, Duration, YoutubeUrl, IsFree, SortOrder)
VALUES (N'course_1_v3', N'course_1', N'Part 04: Remainder Theorem Advanced Concepts', N'44:30', N'https://www.youtube.com/watch?v=flraIS-NFOU', 0, 2);
INSERT INTO dbo.CourseVideos (Id, CourseId, Title, Duration, YoutubeUrl, IsFree, SortOrder)
VALUES (N'course_1_v4', N'course_1', N'Part 08: Unit Digit Masterclass & Tricks', N'55:10', N'https://www.youtube.com/watch?v=Eb81148glqM', 0, 3);
INSERT INTO dbo.Courses (Id, Slug, Title, Description, Category, Level, Price, OriginalPrice, Duration, Rating, TotalRatings, LessonsCount, TestsCount, InstructorId, IsPublished, HighlightsJson)
VALUES (N'course_2', N'quantitative-aptitude-foundation', N'Quantitative Aptitude for Banking & SSC CGL', N'Complete numerical ability coverage: Number Systems, Ratio & Proportion, Profit & Loss, Simple & Compound Interest, Time & Work.', N'SSC', N'INTERMEDIATE', 149900, 299900, N'10 Weeks (40 Lectures)', 4.95, 2310, 10, 6, N'tch_1', 1, N'["Complete formula breakdown","1500+ Practice MCQs","Live doubt clearing sessions","Sectional speed drills"]');
INSERT INTO dbo.CourseVideos (Id, CourseId, Title, Duration, YoutubeUrl, IsFree, SortOrder)
VALUES (N'course_2_v1', N'course_2', N'Part 01: Profit, Loss & Discount Foundation', N'46:10', N'https://www.youtube.com/watch?v=H8sIPNW3waQ', 1, 0);
INSERT INTO dbo.CourseVideos (Id, CourseId, Title, Duration, YoutubeUrl, IsFree, SortOrder)
VALUES (N'course_2_v2', N'course_2', N'Part 02: Profit & Loss Dishonest Dealer Tricks', N'43:50', N'https://www.youtube.com/watch?v=eKqgsyqXzVk', 1, 1);
INSERT INTO dbo.CourseVideos (Id, CourseId, Title, Duration, YoutubeUrl, IsFree, SortOrder)
VALUES (N'course_2_v3', N'course_2', N'Part 03: Percentage to Fraction Conversions', N'44:15', N'https://www.youtube.com/watch?v=HPnFw5MiLfU', 0, 2);
INSERT INTO dbo.CourseVideos (Id, CourseId, Title, Duration, YoutubeUrl, IsFree, SortOrder)
VALUES (N'course_2_v4', N'course_2', N'Part 04: Income, Expenditure & Discount Practice', N'49:40', N'https://www.youtube.com/watch?v=9zFNvh8qBMs', 0, 3);
INSERT INTO dbo.Courses (Id, Slug, Title, Description, Category, Level, Price, OriginalPrice, Duration, Rating, TotalRatings, LessonsCount, TestsCount, InstructorId, IsPublished, HighlightsJson)
VALUES (N'course_3', N'logical-reasoning-pro', N'Logical Reasoning & Analytical Puzzles', N'Crack complex floor puzzles, seating arrangements, syllogisms, blood relations, and coding-decoding for competitive exams.', N'BANKING', N'INTERMEDIATE', 129900, 249900, N'8 Weeks (32 Lectures)', 4.85, 1420, 8, 5, N'tch_1', 1, N'["High level floor & box puzzles","Only A Few syllogism rules","Input-output step shortcuts","Visual reasoning sheets"]');
INSERT INTO dbo.CourseVideos (Id, CourseId, Title, Duration, YoutubeUrl, IsFree, SortOrder)
VALUES (N'course_3_v1', N'course_3', N'Part 03: Syllogisms Core Concepts & Venn Diagrams', N'42:30', N'https://www.youtube.com/watch?v=JuqHVu19U1A', 1, 0);
INSERT INTO dbo.CourseVideos (Id, CourseId, Title, Duration, YoutubeUrl, IsFree, SortOrder)
VALUES (N'course_3_v2', N'course_3', N'Part 05: Syllogisms Possibility & ''Only A Few'' Cases', N'48:15', N'https://www.youtube.com/watch?v=fldl5Wd4pho', 1, 1);
INSERT INTO dbo.CourseVideos (Id, CourseId, Title, Duration, YoutubeUrl, IsFree, SortOrder)
VALUES (N'course_3_v3', N'course_3', N'Placement 2021: Mixture & Alligation Solved', N'38:00', N'https://www.youtube.com/watch?v=jEVKWocx2XE', 0, 2);
INSERT INTO dbo.CourseVideos (Id, CourseId, Title, Duration, YoutubeUrl, IsFree, SortOrder)
VALUES (N'course_3_v4', N'course_3', N'Placement 2021: Profit & Loss Speed Tricks', N'42:30', N'https://www.youtube.com/watch?v=HMPeuxqAbRM', 0, 3);
INSERT INTO dbo.Courses (Id, Slug, Title, Description, Category, Level, Price, OriginalPrice, Duration, Rating, TotalRatings, LessonsCount, TestsCount, InstructorId, IsPublished, HighlightsJson)
VALUES (N'course_4', N'upsc-csat-paper2-accelerator', N'UPSC CSAT Paper-II Comprehensive Strategy', N'Targeted 80+ marks roadmap for UPSC Prelims Paper 2 covering Reading Comprehension, Decision Making, Quant & Analytical Reasoning.', N'BANKING', N'ADVANCED', 199900, 399900, N'12 Weeks (48 Lectures)', 4.92, 870, 12, 8, N'tch_1', 1, N'["PYQ Analysis (2014-2024)","Reading Comprehension critical tone guide","Time-saving elimination methods","Proctored full-length mocks"]');
INSERT INTO dbo.CourseVideos (Id, CourseId, Title, Duration, YoutubeUrl, IsFree, SortOrder)
VALUES (N'course_4_v1', N'course_4', N'Lec 01: CSAT Syllabus Breakdown & Minimum Qualifying Strategy', N'48:00', N'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 1, 0);
INSERT INTO dbo.CourseVideos (Id, CourseId, Title, Duration, YoutubeUrl, IsFree, SortOrder)
VALUES (N'course_4_v2', N'course_4', N'Lec 02: Reading Comprehension - Inference vs Assumption', N'44:30', N'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 1, 1);
INSERT INTO dbo.CourseVideos (Id, CourseId, Title, Duration, YoutubeUrl, IsFree, SortOrder)
VALUES (N'course_4_v3', N'course_4', N'Lec 03: Permutation & Combination without Complex Formulas', N'52:10', N'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 0, 2);
GO
PRINT 'Seeding Enrollments...';
INSERT INTO dbo.Enrollments (Id, UserId, CourseId, Progress)
VALUES (N'enr_1', N'std_1', N'course_1', 42);
INSERT INTO dbo.Enrollments (Id, UserId, CourseId, Progress)
VALUES (N'enr_2', N'std_1', N'course_2', 18);
GO
PRINT 'Seeding Mock Tests & Questions...';
INSERT INTO dbo.MockTests (Id, Slug, Title, Subject, DurationMinutes, TotalMarks, TotalQuestions, Summary, InstructionsJson, Batch, CreatedBy, SubmissionsCount, AvgScore, ViolationsDetected, IsPublished)
VALUES (N'test_1', N'sbi-po-prelims-live-mock', N'SBI PO Prelims Full Mock Test 01', N'Banking & Insurance', 120, 100, 10, N'Simulated 120-minute CBT proctored test with Quantitative, Reasoning, and English sectional pattern.', N'["Total duration is 120 minutes (2 Hours).","Camera proctoring is ACTIVE. Live webcam preview is required.","Leaving fullscreen, switching tabs, or minimizing the window will trigger anti-cheating warnings and terminate your test.","Each correct answer awards +1 mark; incorrect answers deduct -0.25 marks."]', N'All Students', N'tch_1', 1, N'3.0/100', 0, 1);
INSERT INTO dbo.TestQuestions (Id, TestId, QuestionNumber, SectionId, SectionName, QuestionText, QuestionTextHi, OptionsJson, OptionsHiJson, CorrectAnswer, Marks, NegativeMarks, Explanation, ExplanationHi)
VALUES (N'test_1_q_1', N'test_1', 1, N'sec_quant', N'Quantitative Aptitude', N'A train running at a speed of 72 km/h crosses a 200 m long platform in 22 seconds. What is the length of the train?', NULL, N'["A) 240 meters","B) 220 meters","C) 200 meters","D) 180 meters"]', NULL, 0, 1, 0.25, N'Speed in m/s = 72 * (5/18) = 20 m/s. Total distance in 22 s = 20 * 22 = 440 m. Length of train = Total distance - Platform length = 440 - 200 = 240 meters.', NULL);
INSERT INTO dbo.TestQuestions (Id, TestId, QuestionNumber, SectionId, SectionName, QuestionText, QuestionTextHi, OptionsJson, OptionsHiJson, CorrectAnswer, Marks, NegativeMarks, Explanation, ExplanationHi)
VALUES (N'test_1_q_2', N'test_1', 2, N'sec_quant', N'Quantitative Aptitude', N'If a sum of money doubles itself at simple interest in 8 years, what is the annual rate of interest?', NULL, N'["A) 10.5%","B) 12.5%","C) 14%","D) 15%"]', NULL, 1, 1, 0.25, N'Let Principal = P. Amount = 2P => Simple Interest (SI) = P. SI = (P * R * T) / 100 => P = (P * R * 8) / 100 => R = 100 / 8 = 12.5% per annum.', NULL);
INSERT INTO dbo.TestQuestions (Id, TestId, QuestionNumber, SectionId, SectionName, QuestionText, QuestionTextHi, OptionsJson, OptionsHiJson, CorrectAnswer, Marks, NegativeMarks, Explanation, ExplanationHi)
VALUES (N'test_1_q_3', N'test_1', 3, N'sec_quant', N'Quantitative Aptitude', N'A shopkeeper marks an article 40% above the cost price and allows a discount of 20% on the marked price. Find his profit percentage.', NULL, N'["A) 12%","B) 15%","C) 18%","D) 20%"]', NULL, 0, 1, 0.25, N'Let CP = 100. MP = 140. SP = 140 * 0.80 = 112. Profit = SP - CP = 112 - 100 = 12%.', NULL);
INSERT INTO dbo.TestQuestions (Id, TestId, QuestionNumber, SectionId, SectionName, QuestionText, QuestionTextHi, OptionsJson, OptionsHiJson, CorrectAnswer, Marks, NegativeMarks, Explanation, ExplanationHi)
VALUES (N'test_1_q_4', N'test_1', 4, N'sec_quant', N'Quantitative Aptitude', N'Vedic Math Shortcut: What is the square of 105 using Ekadhikena Purvena?', NULL, N'["A) 11025","B) 11225","C) 10525","D) 11050"]', NULL, 0, 1, 0.25, N'For numbers ending in 5: Left part = 10 * (10 + 1) = 110. Right part = 5^2 = 25. Result = 11025.', NULL);
INSERT INTO dbo.TestQuestions (Id, TestId, QuestionNumber, SectionId, SectionName, QuestionText, QuestionTextHi, OptionsJson, OptionsHiJson, CorrectAnswer, Marks, NegativeMarks, Explanation, ExplanationHi)
VALUES (N'test_1_q_5', N'test_1', 5, N'sec_reasoning', N'Reasoning Ability', N'In a certain code language, ''EXAM'' is coded as ''FYBN''. How is ''SUCCESS'' coded in that language?', NULL, N'["A) TVDDFTT","B) TVDDFFT","C) TVDDFST","D) TVDDETT"]', NULL, 0, 1, 0.25, N'Each letter is shifted forward by +1: S->T, U->V, C->D, C->D, E->F, S->T, S->T. So code is TVDDFTT.', NULL);
INSERT INTO dbo.TestQuestions (Id, TestId, QuestionNumber, SectionId, SectionName, QuestionText, QuestionTextHi, OptionsJson, OptionsHiJson, CorrectAnswer, Marks, NegativeMarks, Explanation, ExplanationHi)
VALUES (N'test_1_q_6', N'test_1', 6, N'sec_reasoning', N'Reasoning Ability', N'Statements: All bags are books. Some books are pens. Conclusions: I. Some bags are pens. II. Some pens are books.', NULL, N'["A) Only conclusion I follows","B) Only conclusion II follows","C) Both I and II follow","D) Neither follows"]', NULL, 1, 1, 0.25, N'Some books are pens directly implies Some pens are books (Conclusion II follows). Bags and pens do not overlap necessarily.', NULL);
INSERT INTO dbo.TestQuestions (Id, TestId, QuestionNumber, SectionId, SectionName, QuestionText, QuestionTextHi, OptionsJson, OptionsHiJson, CorrectAnswer, Marks, NegativeMarks, Explanation, ExplanationHi)
VALUES (N'test_1_q_7', N'test_1', 7, N'sec_reasoning', N'Reasoning Ability', N'Pointing to a man in a photograph, a woman said, ''His mother is the only daughter of my mother.'' How is the woman related to the man?', NULL, N'["A) Sister","B) Aunt","C) Mother","D) Grandmother"]', NULL, 2, 1, 0.25, N'The only daughter of the woman''s mother is the woman herself. Therefore, she is the mother of the man in the photograph.', NULL);
INSERT INTO dbo.TestQuestions (Id, TestId, QuestionNumber, SectionId, SectionName, QuestionText, QuestionTextHi, OptionsJson, OptionsHiJson, CorrectAnswer, Marks, NegativeMarks, Explanation, ExplanationHi)
VALUES (N'test_1_q_8', N'test_1', 8, N'sec_english', N'English Language', N'Identify the word that is most nearly OPPOSITE in meaning to ''METICULOUS'':', NULL, N'["A) Scrupulous","B) Careless","C) Punctual","D) Diligent"]', NULL, 1, 1, 0.25, N'''Meticulous'' means showing great attention to detail; very careful and precise. Its opposite is ''Careless''.', NULL);
INSERT INTO dbo.TestQuestions (Id, TestId, QuestionNumber, SectionId, SectionName, QuestionText, QuestionTextHi, OptionsJson, OptionsHiJson, CorrectAnswer, Marks, NegativeMarks, Explanation, ExplanationHi)
VALUES (N'test_1_q_9', N'test_1', 9, N'sec_english', N'English Language', N'Choose the grammatically correct sentence:', NULL, N'["A) Neither the teacher nor the students was present in the hall.","B) Neither the teacher nor the students were present in the hall.","C) Neither the teacher nor the students is present in the hall.","D) Neither the teacher or the students was present in the hall."]', NULL, 1, 1, 0.25, N'When subjects are joined by ''neither...nor'', the verb agrees with the closer subject. ''Students'' is plural, so ''were'' is correct.', NULL);
INSERT INTO dbo.TestQuestions (Id, TestId, QuestionNumber, SectionId, SectionName, QuestionText, QuestionTextHi, OptionsJson, OptionsHiJson, CorrectAnswer, Marks, NegativeMarks, Explanation, ExplanationHi)
VALUES (N'test_1_q_10', N'test_1', 10, N'sec_english', N'English Language', N'Select the correctly spelt word:', NULL, N'["A) Embarrasment","B) Embarrassment","C) Embarasment","D) Embarassment"]', NULL, 1, 1, 0.25, N'The correct spelling is ''Embarrassment'' (double ''r'' and double ''s'').', NULL);
INSERT INTO dbo.MockTests (Id, Slug, Title, Subject, DurationMinutes, TotalMarks, TotalQuestions, Summary, InstructionsJson, Batch, CreatedBy, SubmissionsCount, AvgScore, ViolationsDetected, IsPublished)
VALUES (N'test_2', N'ssc-cgl-tier1-all-india-live', N'SSC CGL Tier-1 All India Speed Mock', N'SSC Combined Graduate Level', 120, 200, 10, N'High-yield mock test curated with latest TCS exam interface, AI webcam proctoring, and timer.', N'["Duration: 120 minutes (2 Hours).","Proctoring enabled: Tab switching and minimizing window will auto-submit exam.","+2 marks for correct answer, -0.5 marks for negative answer."]', N'All Students', N'tch_1', 0, N'Pending', 0, 1);
INSERT INTO dbo.TestQuestions (Id, TestId, QuestionNumber, SectionId, SectionName, QuestionText, QuestionTextHi, OptionsJson, OptionsHiJson, CorrectAnswer, Marks, NegativeMarks, Explanation, ExplanationHi)
VALUES (N'test_2_q_1', N'test_2', 1, N'sec_quant', N'Quantitative Aptitude', N'If x + 1/x = 5, find the value of x^2 + 1/x^2:', NULL, N'["A) 23","B) 25","C) 27","D) 21"]', NULL, 0, 1, 0.25, N'x^2 + 1/x^2 = (x + 1/x)^2 - 2 = 5^2 - 2 = 25 - 2 = 23.', NULL);
INSERT INTO dbo.TestQuestions (Id, TestId, QuestionNumber, SectionId, SectionName, QuestionText, QuestionTextHi, OptionsJson, OptionsHiJson, CorrectAnswer, Marks, NegativeMarks, Explanation, ExplanationHi)
VALUES (N'test_2_q_2', N'test_2', 2, N'sec_quant', N'Quantitative Aptitude', N'A can finish a work in 12 days and B in 18 days. Working together, how many days will they take?', NULL, N'["A) 7.2 days","B) 6.5 days","C) 8 days","D) 9 days"]', NULL, 0, 1, 0.25, N'Combined rate = (1/12) + (1/18) = (3 + 2)/36 = 5/36. Days required = 36/5 = 7.2 days.', NULL);
INSERT INTO dbo.TestQuestions (Id, TestId, QuestionNumber, SectionId, SectionName, QuestionText, QuestionTextHi, OptionsJson, OptionsHiJson, CorrectAnswer, Marks, NegativeMarks, Explanation, ExplanationHi)
VALUES (N'test_2_q_3', N'test_2', 3, N'sec_quant', N'Quantitative Aptitude', N'The average of 7 consecutive numbers is 20. The largest of these numbers is:', NULL, N'["A) 23","B) 24","C) 22","D) 20"]', NULL, 0, 1, 0.25, N'In an odd number of consecutive integers, the average is the middle number. Middle (4th) = 20. Numbers: 17, 18, 19, 20, 21, 22, 23. Largest = 23.', NULL);
INSERT INTO dbo.TestQuestions (Id, TestId, QuestionNumber, SectionId, SectionName, QuestionText, QuestionTextHi, OptionsJson, OptionsHiJson, CorrectAnswer, Marks, NegativeMarks, Explanation, ExplanationHi)
VALUES (N'test_2_q_4', N'test_2', 4, N'sec_quant', N'Quantitative Aptitude', N'What is the value of sin^2(30°) + cos^2(30°)?', NULL, N'["A) 0","B) 1","C) 0.5","D) 2"]', NULL, 1, 1, 0.25, N'By standard trigonometric identity, sin^2(θ) + cos^2(θ) = 1 for any angle θ.', NULL);
INSERT INTO dbo.TestQuestions (Id, TestId, QuestionNumber, SectionId, SectionName, QuestionText, QuestionTextHi, OptionsJson, OptionsHiJson, CorrectAnswer, Marks, NegativeMarks, Explanation, ExplanationHi)
VALUES (N'test_2_q_5', N'test_2', 5, N'sec_reasoning', N'General Intelligence & Reasoning', N'Find the odd one out: 64, 125, 216, 343, 512, 729, 1000, 1331, 1728', NULL, N'["A) 64","B) 729","C) 1000","D) All are perfect cubes"]', NULL, 3, 1, 0.25, N'All the given numbers are perfect cubes: 4^3, 5^3, 6^3, 7^3, 8^3, 9^3, 10^3, 11^3, 12^3.', NULL);
INSERT INTO dbo.TestQuestions (Id, TestId, QuestionNumber, SectionId, SectionName, QuestionText, QuestionTextHi, OptionsJson, OptionsHiJson, CorrectAnswer, Marks, NegativeMarks, Explanation, ExplanationHi)
VALUES (N'test_2_q_6', N'test_2', 6, N'sec_reasoning', N'General Intelligence & Reasoning', N'If 1st January 2024 was Monday, what day was 31st December 2024? (2024 is a leap year)', NULL, N'["A) Monday","B) Tuesday","C) Wednesday","D) Sunday"]', NULL, 1, 1, 0.25, N'A leap year has 366 days (52 weeks + 2 odd days). Thus the year ends on the next day of the week it started. Starts Monday => Ends Tuesday.', NULL);
INSERT INTO dbo.TestQuestions (Id, TestId, QuestionNumber, SectionId, SectionName, QuestionText, QuestionTextHi, OptionsJson, OptionsHiJson, CorrectAnswer, Marks, NegativeMarks, Explanation, ExplanationHi)
VALUES (N'test_2_q_7', N'test_2', 7, N'sec_reasoning', N'General Intelligence & Reasoning', N'Complete the series: 3, 7, 15, 31, 63, ?', NULL, N'["A) 127","B) 125","C) 129","D) 131"]', NULL, 0, 1, 0.25, N'Pattern: *2 + 1. (3*2+1=7, 7*2+1=15, 15*2+1=31, 31*2+1=63, 63*2+1 = 127).', NULL);
INSERT INTO dbo.TestQuestions (Id, TestId, QuestionNumber, SectionId, SectionName, QuestionText, QuestionTextHi, OptionsJson, OptionsHiJson, CorrectAnswer, Marks, NegativeMarks, Explanation, ExplanationHi)
VALUES (N'test_2_q_8', N'test_2', 8, N'sec_english', N'English Language', N'Select the synonym of ''CANDID'':', NULL, N'["A) Frank","B) Deceptive","C) Secretive","D) Arrogant"]', NULL, 0, 1, 0.25, N'''Candid'' means truthful and straightforward; frank.', NULL);
INSERT INTO dbo.TestQuestions (Id, TestId, QuestionNumber, SectionId, SectionName, QuestionText, QuestionTextHi, OptionsJson, OptionsHiJson, CorrectAnswer, Marks, NegativeMarks, Explanation, ExplanationHi)
VALUES (N'test_2_q_9', N'test_2', 9, N'sec_english', N'English Language', N'Fill in the blank: The meeting has been _______ until next Monday.', NULL, N'["A) put out","B) put off","C) put on","D) put away"]', NULL, 1, 1, 0.25, N'''Put off'' means to postpone or delay.', NULL);
INSERT INTO dbo.TestQuestions (Id, TestId, QuestionNumber, SectionId, SectionName, QuestionText, QuestionTextHi, OptionsJson, OptionsHiJson, CorrectAnswer, Marks, NegativeMarks, Explanation, ExplanationHi)
VALUES (N'test_2_q_10', N'test_2', 10, N'sec_english', N'English Language', N'One word substitution: ''A person who looks at the bright side of things'':', NULL, N'["A) Pessimist","B) Optimist","C) Altruist","D) Pacifist"]', NULL, 1, 1, 0.25, N'An ''Optimist'' is a person who tends to be hopeful and confident about the future.', NULL);
INSERT INTO dbo.MockTests (Id, Slug, Title, Subject, DurationMinutes, TotalMarks, TotalQuestions, Summary, InstructionsJson, Batch, CreatedBy, SubmissionsCount, AvgScore, ViolationsDetected, IsPublished)
VALUES (N'test_3', N'upsc-csat-paper2-grand-mock', N'UPSC CSAT Paper-II Grand Practice Test', N'Civil Services Aptitude Test', 120, 200, 10, N'Simulate actual UPSC CSAT 120-min paper with negative marking and webcam integrity supervision.', N'["Duration: 120 minutes.","Proctored: Web camera and anti-tab switch detection active.","Passing benchmark: 33% (66 marks out of 200)."]', N'All Students', N'tch_1', 0, N'Pending', 0, 1);
INSERT INTO dbo.TestQuestions (Id, TestId, QuestionNumber, SectionId, SectionName, QuestionText, QuestionTextHi, OptionsJson, OptionsHiJson, CorrectAnswer, Marks, NegativeMarks, Explanation, ExplanationHi)
VALUES (N'test_3_q_1', N'test_3', 1, N'sec_quant', N'Basic Numeracy', N'How many numbers between 100 and 1000 have the digit 7 in the unit place?', NULL, N'["A) 90","B) 80","C) 100","D) 99"]', NULL, 0, 1, 0.25, N'The hundreds place has 9 choices (1-9), tens place has 10 choices (0-9), unit place is fixed (7). Total = 9 * 10 * 1 = 90.', NULL);
INSERT INTO dbo.TestQuestions (Id, TestId, QuestionNumber, SectionId, SectionName, QuestionText, QuestionTextHi, OptionsJson, OptionsHiJson, CorrectAnswer, Marks, NegativeMarks, Explanation, ExplanationHi)
VALUES (N'test_3_q_2', N'test_3', 2, N'sec_quant', N'Basic Numeracy', N'What is the remainder when (7^105) is divided by 10?', NULL, N'["A) 7","B) 9","C) 3","D) 1"]', NULL, 0, 1, 0.25, N'Cyclicity of powers of 7: 7^1=7, 7^2=9, 7^3=3, 7^4=1 (cycle of 4). 105 mod 4 = 1. Therefore unit digit and remainder is 7.', NULL);
INSERT INTO dbo.TestQuestions (Id, TestId, QuestionNumber, SectionId, SectionName, QuestionText, QuestionTextHi, OptionsJson, OptionsHiJson, CorrectAnswer, Marks, NegativeMarks, Explanation, ExplanationHi)
VALUES (N'test_3_q_3', N'test_3', 3, N'sec_quant', N'Basic Numeracy', N'A clock gains 5 minutes in 24 hours. If set right on Sunday 12 noon, what will it show on Tuesday 12 noon?', NULL, N'["A) 12:10 PM","B) 12:05 PM","C) 12:15 PM","D) 12:20 PM"]', NULL, 0, 1, 0.25, N'Time elapsed = 48 hours = 2 days. Gain in 48 hours = 2 * 5 = 10 minutes. Time shown = 12:10 PM.', NULL);
INSERT INTO dbo.TestQuestions (Id, TestId, QuestionNumber, SectionId, SectionName, QuestionText, QuestionTextHi, OptionsJson, OptionsHiJson, CorrectAnswer, Marks, NegativeMarks, Explanation, ExplanationHi)
VALUES (N'test_3_q_4', N'test_3', 4, N'sec_quant', N'Basic Numeracy', N'In how many ways can 5 books be arranged on a shelf if 2 specific books must always be together?', NULL, N'["A) 48","B) 24","C) 120","D) 72"]', NULL, 0, 1, 0.25, N'Tie the 2 books together as 1 unit. Total units to arrange = 4! = 24. The 2 books can swap places in 2! = 2 ways. Total = 24 * 2 = 48.', NULL);
INSERT INTO dbo.TestQuestions (Id, TestId, QuestionNumber, SectionId, SectionName, QuestionText, QuestionTextHi, OptionsJson, OptionsHiJson, CorrectAnswer, Marks, NegativeMarks, Explanation, ExplanationHi)
VALUES (N'test_3_q_5', N'test_3', 5, N'sec_reasoning', N'Analytical Ability', N'Six persons A, B, C, D, E, F are sitting in a row. B is between F and D. E is between A and C. A does not stand next to F or D. C does not stand next to D. F is next to which person?', NULL, N'["A) B","B) E","C) C","D) D"]', NULL, 0, 1, 0.25, N'Arrangement: C - E - A - F - B - D. F is between A and B.', NULL);
INSERT INTO dbo.TestQuestions (Id, TestId, QuestionNumber, SectionId, SectionName, QuestionText, QuestionTextHi, OptionsJson, OptionsHiJson, CorrectAnswer, Marks, NegativeMarks, Explanation, ExplanationHi)
VALUES (N'test_3_q_6', N'test_3', 6, N'sec_reasoning', N'Analytical Ability', N'If ''+'' means ''*'', ''-'' means ''/'', ''*'' means ''+'' and ''/'' means ''-'', what is the value of: 20 + 5 * 10 - 2 / 5?', NULL, N'["A) 100","B) 105","C) 95","D) 110"]', NULL, 0, 1, 0.25, N'Replacing operators: 20 * 5 + 10 / 2 - 5 = 100 + 5 - 5 = 100.', NULL);
INSERT INTO dbo.TestQuestions (Id, TestId, QuestionNumber, SectionId, SectionName, QuestionText, QuestionTextHi, OptionsJson, OptionsHiJson, CorrectAnswer, Marks, NegativeMarks, Explanation, ExplanationHi)
VALUES (N'test_3_q_7', N'test_3', 7, N'sec_reasoning', N'Analytical Ability', N'A man walks 5 km North, turns right and walks 3 km, turns right and walks 5 km. In which direction is he from his starting point?', NULL, N'["A) East","B) West","C) North","D) South"]', NULL, 0, 1, 0.25, N'5 km North, 3 km East, 5 km South brings him 3 km directly East of his starting position.', NULL);
INSERT INTO dbo.TestQuestions (Id, TestId, QuestionNumber, SectionId, SectionName, QuestionText, QuestionTextHi, OptionsJson, OptionsHiJson, CorrectAnswer, Marks, NegativeMarks, Explanation, ExplanationHi)
VALUES (N'test_3_q_8', N'test_3', 8, N'sec_english', N'Reading Comprehension', N'Read the passage snippet: ''True education must produce self-reliance, moral conviction and courage.'' What is the author''s primary emphasis?', NULL, N'["A) Rote learning of formulas","B) Character building and independence","C) Securing high salary packages","D) Memorization of historical dates"]', NULL, 1, 1, 0.25, N'Self-reliance and moral conviction denote character building and personal independence.', NULL);
INSERT INTO dbo.TestQuestions (Id, TestId, QuestionNumber, SectionId, SectionName, QuestionText, QuestionTextHi, OptionsJson, OptionsHiJson, CorrectAnswer, Marks, NegativeMarks, Explanation, ExplanationHi)
VALUES (N'test_3_q_9', N'test_3', 9, N'sec_english', N'Reading Comprehension', N'Select the antonym for ''EPHEMERAL'':', NULL, N'["A) Transient","B) Eternal","C) Fleeting","D) Short-lived"]', NULL, 1, 1, 0.25, N'''Ephemeral'' means lasting for a very short time. Its antonym is ''Eternal''.', NULL);
INSERT INTO dbo.TestQuestions (Id, TestId, QuestionNumber, SectionId, SectionName, QuestionText, QuestionTextHi, OptionsJson, OptionsHiJson, CorrectAnswer, Marks, NegativeMarks, Explanation, ExplanationHi)
VALUES (N'test_3_q_10', N'test_3', 10, N'sec_english', N'Reading Comprehension', N'Choose the correct idiom meaning: ''To burn the midnight oil''', NULL, N'["A) To waste fuel","B) To work or study late into the night","C) To create pollution","D) To set things on fire"]', NULL, 1, 1, 0.25, N'''To burn the midnight oil'' means to study or work until late at night.', NULL);
GO
PRINT 'Seeding Teacher Videos...';
INSERT INTO dbo.TeacherVideos (Id, Title, YoutubeUrl, Batch, CreatedBy, ViewsCount)
VALUES (N'vid_1', N'Vedic Math: 3-Digit Multiplication in 5 Seconds', N'https://www.youtube.com/@gpa-gyanpraptiacademy', N'All Banking Aspirants', N'tch_1', 124);
INSERT INTO dbo.TeacherVideos (Id, Title, YoutubeUrl, Batch, CreatedBy, ViewsCount)
VALUES (N'vid_2', N'CSAT 2024 Strategy & Syllabus Analysis', N'https://www.youtube.com/@gpa-gyanpraptiacademy', N'UPSC CSAT Batch', N'tch_1', 89);
GO
PRINT 'Seeding Notes...';
INSERT INTO dbo.Notes (Id, Title, Subject, Category, Pages, Size, DownloadCount, FileUrl)
VALUES (N'pl_aptitude', N'Aptitude - Number System (संख्या पद्धति)', N'Aptitude', N'Aptitude', 10, N'2.5 MB', 0, N'/notes/sample.pdf');
INSERT INTO dbo.Notes (Id, Title, Subject, Category, Pages, Size, DownloadCount, FileUrl)
VALUES (N'pl_reasoning', N'Logical Reasoning - Syllogism (न्यायसंगत तर्क)', N'Logical Reasoning', N'Logical Reasoning', 10, N'2.5 MB', 0, N'/notes/sample.pdf');
INSERT INTO dbo.Notes (Id, Title, Subject, Category, Pages, Size, DownloadCount, FileUrl)
VALUES (N'pl_profit_loss', N'Profit, Loss & Discount (लाभ, हानि और बट्टा)', N'Aptitude', N'Aptitude', 10, N'2.5 MB', 0, N'/notes/sample.pdf');
INSERT INTO dbo.Notes (Id, Title, Subject, Category, Pages, Size, DownloadCount, FileUrl)
VALUES (N'pl_percentage', N'Percentage (प्रतिशत) Basic to Advance', N'Aptitude', N'Aptitude', 10, N'2.5 MB', 0, N'/notes/sample.pdf');
INSERT INTO dbo.Notes (Id, Title, Subject, Category, Pages, Size, DownloadCount, FileUrl)
VALUES (N'pl_placement', N'Placement Questions 2021 (TCS & Infosys)', N'Placement', N'Placement', 10, N'2.5 MB', 0, N'/notes/sample.pdf');
INSERT INTO dbo.Notes (Id, Title, Subject, Category, Pages, Size, DownloadCount, FileUrl)
VALUES (N'pl_motivation', N'Journey from Failure to Success (GPA Series)', N'Strategy & Motivation', N'Strategy & Motivation', 10, N'2.5 MB', 0, N'/notes/sample.pdf');
INSERT INTO dbo.Notes (Id, Title, Subject, Category, Pages, Size, DownloadCount, FileUrl)
VALUES (N'note_pdf_1', N'Vedic Maths Quick Calculation & Mental Shortcuts', N'Quantitative Aptitude', N'Quantitative Aptitude', 10, N'2.4 MB', 0, N'/notes/sample.pdf');
INSERT INTO dbo.Notes (Id, Title, Subject, Category, Pages, Size, DownloadCount, FileUrl)
VALUES (N'note_doc_1', N'UPSC CSAT Reasoning & Analogy Short Notes', N'CSAT Paper II', N'CSAT Paper II', 10, N'1.8 MB', 0, N'/notes/sample.pdf');
INSERT INTO dbo.Notes (Id, Title, Subject, Category, Pages, Size, DownloadCount, FileUrl)
VALUES (N'note_audio_1', N'Banking & SSC English Grammar Golden Rules', N'English Language', N'English Language', 10, N'2.5 MB', 0, N'/notes/sample.pdf');
INSERT INTO dbo.Notes (Id, Title, Subject, Category, Pages, Size, DownloadCount, FileUrl)
VALUES (N'note_link_1', N'Gyan Prapti Academy Official YouTube Video Archive', N'Video Library', N'Video Library', 10, N'2.5 MB', 0, N'/notes/sample.pdf');
GO
PRINT 'Seeding Marquee Items...';
INSERT INTO dbo.MarqueeItems (Title, Badge, SortOrder)
VALUES (N'BANKING (SBI & IBPS PO)', N'LIVE', 0);
INSERT INTO dbo.MarqueeItems (Title, Badge, SortOrder)
VALUES (N'SSC CGL / CHSL 2026', N'HOT', 1);
INSERT INTO dbo.MarqueeItems (Title, Badge, SortOrder)
VALUES (N'RAILWAY RRB NTPC', N'TRENDING', 2);
INSERT INTO dbo.MarqueeItems (Title, Badge, SortOrder)
VALUES (N'UPSC CSAT (PAPER 2)', N'ADVANCED', 3);
INSERT INTO dbo.MarqueeItems (Title, Badge, SortOrder)
VALUES (N'CAMPUS PLACEMENT 2026', N'NEW', 4);
INSERT INTO dbo.MarqueeItems (Title, Badge, SortOrder)
VALUES (N'VEDIC SPEED MATHS', N'100% TRICKS', 5);
INSERT INTO dbo.MarqueeItems (Title, Badge, SortOrder)
VALUES (N'TOPIC-WISE MOCK TESTS', N'120 MIN CBT', 6);
GO
PRINT 'Seeding Exam Categories...';
INSERT INTO dbo.ExamCategories (Label, Description, Path, SortOrder)
VALUES (N'Banking Exams', N'Comprehensive syllabus for SBI PO, IBPS PO, Clerk, RBI Assistant, and RRB Officer Scale I.', N'/courses?category=banking', 0);
INSERT INTO dbo.ExamCategories (Label, Description, Path, SortOrder)
VALUES (N'SSC Exams', N'SSC CGL, CHSL, CPO, MTS, and GD with structured test series and shortcut tricks.', N'/courses?category=ssc', 1);
INSERT INTO dbo.ExamCategories (Label, Description, Path, SortOrder)
VALUES (N'Railway Exams', N'Specialized coaching for RRB NTPC, Group D, ALP, and Technician with timed mock exams.', N'/courses?category=railway', 2);
INSERT INTO dbo.ExamCategories (Label, Description, Path, SortOrder)
VALUES (N'UPSC CSAT', N'High-impact CSAT preparation covering Comprehension, Reasoning, and Data Interpretation.', N'/courses?category=csat', 3);
GO

PRINT '==============================================================';
PRINT 'GPA Database Schema & Seed Data successfully completed!';
PRINT '==============================================================';
