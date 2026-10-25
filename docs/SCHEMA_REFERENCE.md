# Backend Schema Quick Reference

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│          GPA - Gyan Prapti Academy Backend Stack            │
├─────────────────────────────────────────────────────────────┤
│  Database:  PostgreSQL 12+                                  │
│  ORM:       Prisma 5.8                                      │
│  Runtime:   Node.js + Next.js 16                            │
│  Language:  TypeScript                                      │
└─────────────────────────────────────────────────────────────┘
```

## 📊 Data Models (8 Core + 2 Admin)

### User (Students, Instructors, Admins)
```
id           CUID (primary key)
email        String (unique)
name         String
password     String (optional, for future auth)
role         Enum: STUDENT | INSTRUCTOR | ADMIN
profileImage String (optional)
phone        String (optional)
bio          String (optional)
isVerified   Boolean (email verification)
isActive     Boolean (account status)
createdAt    DateTime
updatedAt    DateTime

INDEXES:
  - email (unique)
  - role

RELATIONS:
  ↓ 1→Many → enrollments
  ↓ 1→Many → purchases  
  ↓ 1→Many → progress
  ↓ 1→Many → courses (as instructor)
```

### Course (Educational Content)
```
id           CUID
slug         String (unique, URL-friendly)
title        String
description  String
category     Enum: BANKING | SSC | RAILWAY | UPSC_CSAT
level        Enum: BEGINNER | INTERMEDIATE | ADVANCED
price        Int (in paise)
originalPrice Int (optional)
duration     String (e.g., "12 Weeks")
rating       Float (0-5)
totalRatings Int
lessons      Int
tests        Int
highlights   String[] (array)
coverImage   String (optional)
instructorId String (FK to User)
isPublished  Boolean

INDEXES:
  - slug (unique)
  - category
  - instructorId
  - fulltext on (title, description)

RELATIONS:
  ↓ 1→Many → lessons
  ↓ 1→Many → enrollments
  ↓ 1→Many → purchases
  ↓ Many→1 → instructor (User)
  ↓ 1→Many → notes
```

### Lesson (Video Content)
```
id           CUID
courseId     String (FK to Course) [CASCADE delete]
title        String
description  String (optional)
videoUrl     String
duration     Int (minutes)
order        Int (sequential in course)
isPublished  Boolean
resources    String[] (array of URLs)
createdAt    DateTime
updatedAt    DateTime

CONSTRAINTS:
  - UNIQUE(courseId, order)

INDEXES:
  - courseId

RELATIONS:
  ↓ Many→1 → course
  ↓ 1→Many → progress
```

### Note (Study Materials)
```
id           CUID
courseId     String (optional FK to Course)
title        String
subject      String
description  String
fileUrl      String (PDF/document link)
thumbnail    String (optional)
category     Enum: BANKING | SSC | RAILWAY | UPSC_CSAT
isFree       Boolean
downloadCount Int
price        Int (in paise)
createdAt    DateTime
updatedAt    DateTime

INDEXES:
  - category
  - isFree

RELATIONS:
  ↓ Many→1 → course (optional)
  ↓ 1→Many → purchases
```

### Enrollment (Course Enrollment Tracking)
```
id                   CUID
userId               String (FK to User) [CASCADE delete]
courseId             String (FK to Course) [CASCADE delete]
status               Enum: ACTIVE | COMPLETED | PAUSED | CANCELLED
enrolledAt           DateTime
completedAt          DateTime (optional)
refundedAt           DateTime (optional)
currentLessonProgress Int (lessons completed)
progressPercentage   Int (0-100)
createdAt            DateTime
updatedAt            DateTime

CONSTRAINTS:
  - UNIQUE(userId, courseId)

INDEXES:
  - userId
  - courseId
  - status

RELATIONS:
  ↓ Many→1 → user
  ↓ Many→1 → course
```

### Purchase (Transactions)
```
id              CUID
userId          String (FK to User) [CASCADE delete]
type            Enum: COURSE | NOTE | TEST | SUBSCRIPTION
courseId        String (optional FK to Course)
noteId          String (optional FK to Note)
amount          Int (in paise)
status          Enum: PENDING | COMPLETED | FAILED | REFUNDED | CANCELLED
paymentMethod   Enum: CARD | UPI | NETBANKING | WALLET | PAYPAL
transactionId   String (unique, optional)
purchasedAt     DateTime
expiresAt       DateTime (optional, for subscriptions)
createdAt       DateTime
updatedAt       DateTime

INDEXES:
  - userId
  - status
  - transactionId (unique)

RELATIONS:
  ↓ Many→1 → user
  ↓ Many→1 → course (optional)
  ↓ Many→1 → note (optional)
```

### StudentProgress (Lesson Tracking)
```
id             CUID
userId         String (FK to User) [CASCADE delete]
courseId       String (FK to Course) [CASCADE delete]
lessonId       String (FK to Lesson) [CASCADE delete]
isCompleted    Boolean
score          Int (optional, for tests)
timeSpent      Int (seconds)
lastAccessedAt DateTime
createdAt      DateTime
updatedAt      DateTime

CONSTRAINTS:
  - UNIQUE(userId, lessonId)

INDEXES:
  - userId
  - courseId

RELATIONS:
  ↓ Many→1 → user
  ↓ Many→1 → course
  ↓ Many→1 → lesson
```

### MockTest (Practice Tests)
```
id              CUID
title           String
description     String (optional)
subject         String
category        Enum: BANKING | SSC | RAILWAY | UPSC_CSAT
duration        Int (minutes)
totalQuestions  Int
passingScore    Int (percentage)
price           Int (in paise)
isFree          Boolean
createdAt       DateTime
updatedAt       DateTime

INDEXES:
  - category
  - isFree

EXTENSIBLE: Ready for Questions & Attempts models
```

### Analytics (Metrics Tracking)
```
id              CUID
type            Enum: COURSE | USER | GLOBAL
courseId        String (optional)
userId          String (optional)
enrollmentCount Int
revenueTotal    Int (in paise)
averageRating   Float
activeUsers     Int
date            DateTime
createdAt       DateTime
updatedAt       DateTime

INDEXES:
  - type
  - courseId
  - date
```

### AuditLog (Action Tracking)
```
id        CUID
userId    String
action    String
entity    String
entityId  String
changes   JSON (optional)
ipAddress String (optional)
userAgent String (optional)
createdAt DateTime

INDEXES:
  - userId
  - action

IMMUTABLE: For compliance and auditing
```

---

## 🔄 Relationship Patterns

### One-to-Many (1→Many)
```
User (1) ─────────→ (Many) Enrollments
         ─────────→ (Many) Purchases
         ─────────→ (Many) StudentProgress
         ─────────→ (Many) Courses

Course (1) ────────→ (Many) Lessons
          ────────→ (Many) Enrollments
          ────────→ (Many) Purchases
          ────────→ (Many) StudentProgress

Lesson (1) ────────→ (Many) StudentProgress

Note (1) ──────────→ (Many) Purchases
```

### Many-to-One (Many→1)
```
Enrollments ──────────→ User
           ──────────→ Course

Purchase ──────────→ User
        ──────────→ Course (optional)
        ──────────→ Note (optional)

StudentProgress ────→ User
                ────→ Course
                ────→ Lesson
```

### Optional Relationships
```
Note.courseId (0 or 1) → Course
  (Notes can exist independently)

Purchase.courseId (0 or 1) → Course
Purchase.noteId (0 or 1) → Note
  (Either course OR note OR test)
```

---

## 💾 Cascading Deletes

**When User is deleted:**
- ❌ All Enrollments deleted
- ❌ All Purchases deleted
- ❌ All StudentProgress deleted
- ✅ Courses remain (reassign instructor if needed)

**When Course is deleted:**
- ❌ All Lessons deleted
- ❌ All Enrollments deleted
- ❌ All StudentProgress deleted
- ✅ Purchases remain (for historical records)

**When Lesson is deleted:**
- ❌ All StudentProgress deleted
- ✅ Enrollments remain

---

## 🔑 Unique Constraints

```
User.email                    (UNIQUE)
Course.slug                   (UNIQUE)
Lesson.(courseId, order)      (UNIQUE per course)
Enrollment.(userId, courseId) (One enrollment per student per course)
StudentProgress.(userId, lessonId) (One progress record per student per lesson)
Purchase.transactionId        (UNIQUE)
```

---

## 🏃 Getting Started Checklist

```bash
# 1. Install dependencies
npm install

# 2. Create PostgreSQL database
createdb gpa_academy -U postgres

# 3. Configure connection
# Edit .env.local:
# DATABASE_URL="postgresql://postgres:password@localhost:5432/gpa_academy"

# 4. Run migrations
npx prisma migrate dev --name init

# 5. View database
npx prisma studio

# 6. Ready for development!
```

---

## 📝 Pricing Convention

All monetary values stored in **paise** (₹1 = 100 paise):

```typescript
// Storage
₹999    = 99900 paise
₹49.99  = 4999 paise
₹10     = 1000 paise

// Display
amount / 100  // Convert to rupees

// User Input
price * 100   // Convert to paise
```

---

## 🎯 Quick API Query Examples

### Fetch Course with Lessons
```typescript
const course = await prisma.course.findUnique({
  where: { slug: "mathematics-101" },
  include: {
    lessons: { orderBy: { order: "asc" } },
    instructor: true,
  },
});
```

### User Enrollments
```typescript
const enrollments = await prisma.enrollment.findMany({
  where: { userId: "user-123", status: "ACTIVE" },
  include: { course: true },
});
```

### Course Revenue
```typescript
const revenue = await prisma.purchase.aggregate({
  where: {
    courseId: "course-456",
    status: "COMPLETED",
  },
  _sum: { amount: true },
});
```

### Student Progress Tracking
```typescript
const progress = await prisma.studentProgress.findMany({
  where: {
    userId: "user-123",
    courseId: "course-456",
  },
  orderBy: { createdAt: "desc" },
});
```

---

## ✨ Features

✅ **Role-Based Access** - Student, Instructor, Admin roles  
✅ **Progress Tracking** - Lesson-level completion and scores  
✅ **Free & Paid Content** - Flexible pricing model  
✅ **Subscription Ready** - Purchase expiry support  
✅ **Analytics** - Revenue, enrollment, rating metrics  
✅ **Audit Trail** - Complete action logging  
✅ **Data Integrity** - Cascading deletes and constraints  
✅ **Performance** - Strategic indexing  

---

Generated: June 1, 2026 | GPA - Gyan Prapti Academy
