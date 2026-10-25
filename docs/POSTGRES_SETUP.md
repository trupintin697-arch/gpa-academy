# PostgreSQL + Prisma Setup Guide

This guide covers setting up PostgreSQL database and Prisma ORM for GPA - Gyan Prapti Academy.

## Prerequisites

- Node.js 18+
- npm or yarn
- PostgreSQL 12+ (local or cloud)

## Installation Steps

### 1. Install Prisma and PostgreSQL Client

```bash
npm install @prisma/client
npm install -D prisma
```

### 2. Configure Database URL

Create `.env.local` in the project root:

```bash
cp .env.example .env.local
```

Update `DATABASE_URL` with your PostgreSQL connection string:

```
# Local PostgreSQL
DATABASE_URL="postgresql://username:password@localhost:5432/gpa_academy"

# Or use PostgreSQL cloud services
# Supabase: postgresql://user:password@db.xxxx.supabase.co:5432/postgres
# Railway: postgresql://user:password@containers-us-west-xxx.railway.app:5432/railway
# Heroku PostgreSQL: postgresql://user:password@ec2-xxx.compute-1.amazonaws.com:5432/dbxxxxx
```

### 3. Create PostgreSQL Database Locally

#### Windows (using PostgreSQL installer):

```powershell
# Connect to PostgreSQL as admin
psql -U postgres

# Create database
CREATE DATABASE gpa_academy;

# Create user (optional)
CREATE USER gpa_user WITH PASSWORD 'secure_password';
ALTER ROLE gpa_user SET client_encoding TO 'utf8';
ALTER ROLE gpa_user SET default_transaction_isolation TO 'read committed';
ALTER ROLE gpa_user SET default_transaction_deferrable TO on;
ALTER ROLE gpa_user SET default_transaction_read_only TO off;

# Grant privileges
GRANT ALL PRIVILEGES ON DATABASE gpa_academy TO gpa_user;

# Exit
\q
```

#### macOS (using Homebrew):

```bash
# Install PostgreSQL
brew install postgresql@15

# Start PostgreSQL service
brew services start postgresql@15

# Create database
createdb gpa_academy

# Create user
createuser -P gpa_user  # Enter password when prompted
```

#### Linux (Ubuntu/Debian):

```bash
# Install PostgreSQL
sudo apt-get update
sudo apt-get install postgresql postgresql-contrib

# Connect to PostgreSQL
sudo -u postgres psql

# Create database and user (in psql)
CREATE DATABASE gpa_academy;
CREATE USER gpa_user WITH PASSWORD 'secure_password';
GRANT ALL PRIVILEGES ON DATABASE gpa_academy TO gpa_user;
\q
```

### 4. Run Prisma Migrations

Initialize the database schema:

```bash
# Create initial migration
npx prisma migrate dev --name init

# This will:
# - Create the migration file
# - Apply the migration to your database
# - Generate Prisma Client
```

### 5. Seed Database with Initial Data

Update `package.json` to include seed script:

```json
{
  "prisma": {
    "seed": "ts-node prisma/seed.ts"
  }
}
```

Install ts-node (if not already installed):

```bash
npm install -D ts-node
```

Run the seed script:

```bash
npx prisma db seed
```

This will populate your database with:
- 1 instructor
- 2 students
- 3 sample courses
- 3 lessons
- 3 study notes
- Sample enrollment and purchase records

### 6. Verify Database Setup

Open Prisma Studio to view your data:

```bash
npx prisma studio
```

This opens a visual database explorer at `http://localhost:5555`

## Project Structure

```
lib/
  ├── prisma.ts          # Prisma Client singleton
  ├── types/index.ts     # TypeScript interfaces
  ├── mock-data.ts       # Mock data (for development)
  └── api.ts             # Mock API services

prisma/
  ├── schema.prisma      # Database schema
  ├── seed.ts            # Seed script
  └── migrations/        # Auto-generated migrations

app/api/
  ├── courses/
  │   ├── route.ts       # GET: List courses
  │   └── [id]/route.ts  # GET: Course details with lessons
  ├── enrollments/
  │   └── route.ts       # GET: User enrollments, POST: Enroll in course
  └── lessons/
      └── [id]/route.ts  # GET: Lesson details, POST: Mark complete
```

## Database Schema Overview

### Core Models

1. **User** - Students, instructors, admins
   - Fields: id, email, name, role, profileImage, phone, bio, isVerified, isActive
   - Relations: enrollments, purchases, courses (instructor), progress

2. **Course** - Educational courses
   - Fields: id, slug, title, description, category, level, price, duration, rating, etc.
   - Relations: lessons, enrollments, notes, purchases, instructor

3. **Lesson** - Individual lessons within courses
   - Fields: id, courseId, title, description, videoUrl, duration, order, isPublished, resources
   - Relations: course, progress

4. **Note** - Study materials (free and premium)
   - Fields: id, courseId (optional), title, subject, description, fileUrl, isFree, price
   - Relations: course, purchases

5. **Enrollment** - User-Course relationships
   - Fields: id, userId, courseId, status, enrolledAt, progressPercentage, etc.
   - Relations: user, course

6. **Purchase** - Transactions for courses, notes, tests
   - Fields: id, userId, type, courseId/noteId, amount, status, transactionId
   - Relations: user, course, note

7. **StudentProgress** - Detailed lesson completion tracking
   - Fields: id, userId, courseId, lessonId, isCompleted, score, timeSpent
   - Relations: user, course, lesson

### Supporting Models

- **MockTest** - Practice tests
- **Analytics** - Aggregated data
- **AuditLog** - Event tracking

## Common Prisma Commands

```bash
# Generate/regenerate Prisma Client
npx prisma generate

# Create new migration after schema changes
npx prisma migrate dev --name <migration_name>

# Apply migrations without generating
npx prisma migrate deploy

# Reset database (WARNING: deletes all data)
npx prisma migrate reset

# Open Prisma Studio
npx prisma studio

# Check for database issues
npx prisma db validate

# Pull existing database schema into Prisma
npx prisma db pull

# Push schema changes to database
npx prisma db push
```

## Using Prisma in Your Code

### Basic Query Examples

```typescript
import { prisma } from "@/lib/prisma";

// Fetch all courses
const courses = await prisma.course.findMany();

// Fetch course with lessons
const course = await prisma.course.findUnique({
  where: { id: "course_id" },
  include: { lessons: true },
});

// Create enrollment
const enrollment = await prisma.enrollment.create({
  data: {
    userId: "user_id",
    courseId: "course_id",
    status: "ACTIVE",
  },
});

// Update progress
const progress = await prisma.studentProgress.update({
  where: { id: "progress_id" },
  data: { isCompleted: true },
});

// Get user's enrollments
const enrollments = await prisma.enrollment.findMany({
  where: { userId: "user_id" },
  include: { course: true },
});
```

### Pagination Example

```typescript
const skip = (page - 1) * pageSize;

const courses = await prisma.course.findMany({
  skip,
  take: pageSize,
  orderBy: { createdAt: "desc" },
});

const total = await prisma.course.count();
```

### Filtering & Searching

```typescript
// Find courses by category
const courses = await prisma.course.findMany({
  where: { category: "BANKING" },
});

// Search by title
const courses = await prisma.course.findMany({
  where: {
    title: { contains: "SBI", mode: "insensitive" },
  },
});

// Complex filters
const enrollments = await prisma.enrollment.findMany({
  where: {
    AND: [
      { userId: "user_id" },
      { status: "ACTIVE" },
    ],
  },
});
```

## Cloud Database Options

### Supabase (Recommended for beginners)

1. Create account at [supabase.com](https://supabase.com)
2. Create new project
3. Copy PostgreSQL connection string
4. Update `.env.local`:

```
DATABASE_URL="postgresql://postgres.xxxxx:password@db.xxxxx.supabase.co:5432/postgres"
```

5. Run migrations:

```bash
npx prisma migrate deploy
npx prisma db seed
```

### Railway

1. Create account at [railway.app](https://railway.app)
2. Create PostgreSQL plugin
3. Connection string is auto-generated
4. Update `.env.local` and run migrations

### AWS RDS

1. Create RDS PostgreSQL instance
2. Configure security groups for your IP
3. Use connection string in `.env.local`
4. Run migrations

## Production Deployment

### Environment Variables

Add these to your production environment:

```
DATABASE_URL=postgresql://...
NODE_ENV=production
```

### Run Migrations in Production

```bash
# Safe way to apply migrations
npx prisma migrate deploy

# Never use migrate dev or db push in production
```

### Backup Strategy

```bash
# Backup database
pg_dump -U username -d gpa_academy > backup.sql

# Restore from backup
psql -U username -d gpa_academy < backup.sql
```

## Troubleshooting

### Connection Issues

```bash
# Test PostgreSQL connection
psql "postgresql://user:password@localhost:5432/gpa_academy"

# Check Prisma connection
npx prisma db execute --stdin < <(echo "SELECT version();")
```

### Migration Issues

```bash
# Reset migrations (development only)
npx prisma migrate reset

# Manually apply specific migration
npx prisma migrate resolve --applied init
```

### Prisma Client Issues

```bash
# Regenerate Prisma Client
npx prisma generate

# Clear cache
rm -rf node_modules/.prisma
npm install
```

## Next Steps

1. ✅ Set up PostgreSQL database
2. ✅ Configure Prisma and create schema
3. ✅ Run migrations and seed data
4. 📝 **Implement authentication** (using next-auth or similar)
5. 📝 Add payment integration (Razorpay/Stripe)
6. 📝 Create user registration/login endpoints
7. 📝 Connect frontend to real API endpoints
8. 📝 Deploy to production

## Resources

- [Prisma Documentation](https://www.prisma.io/docs/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Prisma Best Practices](https://www.prisma.io/docs/guides/performance-and-optimization)
- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
