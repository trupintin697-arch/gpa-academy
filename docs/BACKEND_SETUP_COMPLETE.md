# ✅ PostgreSQL + Prisma Backend Setup Complete

Your GPA - Gyan Prapti Academy backend is now configured and ready for use!

## What's Been Set Up

### 📦 Package Dependencies (Updated)
- **@prisma/client@^5.8.0** - Runtime ORM client
- **prisma@^5.8.0** - CLI tools for migrations and schema management

Install them by running:
```bash
npm install
```

### 📋 Database Schema (Complete)
A comprehensive PostgreSQL schema with **8 core models**:

```
User (Students, Instructors, Admins)
  ├─ Enrollments (Course enrollment tracking)
  ├─ Purchases (Transaction records)
  ├─ Courses (Instructor courses)
  └─ StudentProgress (Lesson tracking)

Course (Educational content)
  ├─ Lessons (Video content, ordered)
  ├─ Notes (Study materials)
  ├─ Enrollments
  └─ Purchases

Lesson (Video content)
  └─ StudentProgress

Note (Study materials)
  └─ Purchases

Enrollment (Course enrollment)

StudentProgress (Lesson completion tracking)

MockTest (Practice tests - extensible)

Purchase (Transactions - COURSE, NOTE, TEST, SUBSCRIPTION)

Analytics (Aggregated metrics)

AuditLog (Action tracking)
```

### 🔧 Configuration Files

#### 1. `.env.local` (Environment Configuration)
```env
DATABASE_URL="postgresql://user:password@localhost:5432/gpa_academy"
NODE_ENV="development"
```

Update with your PostgreSQL credentials.

#### 2. `lib/prisma.ts` (Client Setup)
✅ Singleton Prisma Client ready to use
- Prevents multiple instances in development
- Logging configured for development/production
- Graceful shutdown handling

#### 3. `prisma/schema.prisma` (Database Schema)
✅ Complete schema with:
- All relationships defined
- Strategic indexes for performance
- Enums for type safety
- Constraints for data integrity

---

## 🚀 Quick Start (5 Minutes)

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Set Up PostgreSQL Database

**Option A: Local PostgreSQL (Windows)**
```bash
# Open PowerShell and connect to PostgreSQL
psql -U postgres

# In PostgreSQL terminal:
CREATE DATABASE gpa_academy;
\q
```

**Option B: Using Docker**
```bash
docker run --name gpa-postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=gpa_academy \
  -p 5432:5432 \
  -d postgres:15
```

### Step 3: Configure Database Connection
Edit `.env.local`:
```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/gpa_academy"
```

### Step 4: Create Database Schema
```bash
npx prisma migrate dev --name init
```

This will:
- Create all tables in PostgreSQL
- Generate Prisma Client
- Create the migrations folder

### Step 5: Verify Setup
```bash
npx prisma studio
```
Opens visual database explorer at http://localhost:5555

---

## 📊 Database Models Reference

### User Model
```typescript
{
  id: string              // Unique ID (CUID)
  email: string          // Unique email
  name: string
  password?: string      // Hashed (for future auth)
  role: UserRole         // STUDENT | INSTRUCTOR | ADMIN
  profileImage?: string
  phone?: string
  bio?: string
  isVerified: boolean    // Email verification
  isActive: boolean      // Account status
  createdAt: Date
  updatedAt: Date
}
```

### Course Model
```typescript
{
  id: string
  slug: string          // URL-friendly (unique)
  title: string
  description: string
  category: ExamCategory  // BANKING | SSC | RAILWAY | UPSC_CSAT
  level: CourseLevel    // BEGINNER | INTERMEDIATE | ADVANCED
  price: number         // In paise (₹999 = 99900)
  originalPrice?: number
  duration: string      // e.g., "12 Weeks"
  rating: number        // 0-5
  totalRatings: number
  lessons: number       // Count
  tests: number         // Count
  highlights: string[]
  coverImage?: string
  instructorId: string  // Foreign key
  isPublished: boolean
  createdAt: Date
  updatedAt: Date
}
```

### Lesson Model
```typescript
{
  id: string
  courseId: string      // Foreign key
  title: string
  description?: string
  videoUrl: string      // Video file URL
  duration: number      // In minutes
  order: number         // Sequential order in course
  isPublished: boolean
  resources: string[]   // Array of resource URLs
  createdAt: Date
  updatedAt: Date
}
```

### Note Model
```typescript
{
  id: string
  courseId?: string     // Optional, not all notes are course-specific
  title: string
  subject: string
  description: string
  fileUrl: string       // PDF/Document URL
  thumbnail?: string
  category: ExamCategory
  isFree: boolean
  downloadCount: number
  price: number         // In paise, 0 if free
  createdAt: Date
  updatedAt: Date
}
```

### Enrollment Model
```typescript
{
  id: string
  userId: string        // Foreign key
  courseId: string      // Foreign key
  status: EnrollmentStatus // ACTIVE | COMPLETED | PAUSED | CANCELLED
  enrolledAt: Date
  completedAt?: Date
  refundedAt?: Date
  currentLessonProgress: number  // Lessons completed
  progressPercentage: number     // 0-100
  createdAt: Date
  updatedAt: Date
}
```

### Purchase Model
```typescript
{
  id: string
  userId: string
  type: PurchaseType    // COURSE | NOTE | TEST | SUBSCRIPTION
  courseId?: string
  noteId?: string
  amount: number        // In paise
  status: PaymentStatus // PENDING | COMPLETED | FAILED | REFUNDED | CANCELLED
  paymentMethod?: PaymentMethod // CARD | UPI | NETBANKING | WALLET | PAYPAL
  transactionId?: string
  purchasedAt: Date
  expiresAt?: Date      // For subscriptions
  createdAt: Date
  updatedAt: Date
}
```

### StudentProgress Model
```typescript
{
  id: string
  userId: string        // Foreign key
  courseId: string      // Foreign key
  lessonId: string      // Foreign key
  isCompleted: boolean
  score?: number        // For tests
  timeSpent: number     // In seconds
  lastAccessedAt: Date
  createdAt: Date
  updatedAt: Date
}
```

---

## 💻 Using Prisma in Your Code

### Import the Client
```typescript
import { prisma } from "@/lib/prisma";
```

### Common Operations

**Get all courses:**
```typescript
const courses = await prisma.course.findMany({
  where: { isPublished: true },
  orderBy: { createdAt: "desc" },
});
```

**Get course with lessons:**
```typescript
const course = await prisma.course.findUnique({
  where: { id: courseId },
  include: {
    lessons: { orderBy: { order: "asc" } },
  },
});
```

**Create enrollment:**
```typescript
const enrollment = await prisma.enrollment.create({
  data: {
    userId: userId,
    courseId: courseId,
    status: "ACTIVE",
  },
});
```

**Update progress:**
```typescript
await prisma.studentProgress.upsert({
  where: { userId_lessonId: { userId, lessonId } },
  update: { isCompleted: true },
  create: {
    userId,
    courseId,
    lessonId,
    isCompleted: true,
  },
});
```

**Get user with enrollments:**
```typescript
const userWithEnrollments = await prisma.user.findUnique({
  where: { email: userEmail },
  include: {
    enrollments: {
      include: { course: true },
    },
  },
});
```

---

## 🔑 Key Information

### Pricing Convention
All prices stored in **paise** (₹1 = 100 paise):
- ₹999 → stored as `99900`
- ₹49 → stored as `4900`
- When displaying: divide by 100

### Enums
- **UserRole**: STUDENT, INSTRUCTOR, ADMIN
- **ExamCategory**: BANKING, SSC, RAILWAY, UPSC_CSAT
- **CourseLevel**: BEGINNER, INTERMEDIATE, ADVANCED
- **EnrollmentStatus**: ACTIVE, COMPLETED, PAUSED, CANCELLED
- **PurchaseType**: COURSE, NOTE, TEST, SUBSCRIPTION
- **PaymentStatus**: PENDING, COMPLETED, FAILED, REFUNDED, CANCELLED
- **PaymentMethod**: CARD, UPI, NETBANKING, WALLET, PAYPAL

### Database Relationships
- User → Enrollments (1:Many) - One user can enroll in many courses
- User → Purchases (1:Many) - One user can make many purchases
- Course → Lessons (1:Many) - One course has many lessons
- Course → Notes (1:Many) - One course can have many study notes
- Course → Purchases (1:Many) - One course can be purchased many times
- Lesson → StudentProgress (1:Many) - Each lesson has many progress records
- Enrollment is unique per user-course pair
- StudentProgress is unique per user-lesson pair

---

## 📝 Useful Commands

```bash
# Generate Prisma Client (after schema changes)
npx prisma generate

# Create new migration
npx prisma migrate dev --name descriptive_name

# Deploy migrations (production)
npx prisma migrate deploy

# Reset database (⚠️ deletes all data)
npx prisma migrate reset

# View database visually
npx prisma studio

# Validate schema
npx prisma db validate

# Pull existing database schema
npx prisma db pull

# Push schema to database
npx prisma db push
```

---

## 🛣️ Next Steps

1. ✅ **Backend Schema** - Complete
2. ⬜ **API Routes** - Create `/app/api/` endpoints
   - `GET /api/courses` - List courses
   - `GET /api/courses/[id]` - Course details with lessons
   - `POST /api/enrollments` - Enroll student
   - `GET /api/user/enrollments` - Get user enrollments
   - etc.

3. ⬜ **Seed Data** - Create `prisma/seed.ts` with sample data
4. ⬜ **Authentication** - Add login/register (JWT or Sessions)
5. ⬜ **Payment Integration** - Add Razorpay/Stripe for purchases
6. ⬜ **File Storage** - Configure S3/Cloudinary for uploads

---

## 🐛 Troubleshooting

### Connection Refused
```bash
# Check PostgreSQL is running
psql -U postgres

# Verify DATABASE_URL format
# postgresql://username:password@localhost:5432/dbname
```

### Prisma Client Not Updated
```bash
npx prisma generate
```

### Migration Failed
```bash
# Delete incomplete migration
rm -rf prisma/migrations

# Re-run
npx prisma migrate dev --name init
```

### View Active Database Connections
```bash
psql -U postgres -d gpa_academy
SELECT * FROM pg_stat_activity;
```

---

## 📚 Documentation Files

- **POSTGRES_SETUP.md** - Detailed PostgreSQL setup guide
- **BACKEND_INTEGRATION.md** - API integration guide
- **COMPONENT_REFERENCE.md** - Frontend components reference
- **QUICKSTART.md** - Quick start guide

---

**Your PostgreSQL + Prisma backend is ready!** 🚀

Run `npm install` to install dependencies, then follow the Quick Start steps above.
