# Backend Integration Guide

This document outlines the backend scaffolding, database structure, and integration steps for GPA - Gyan Prapti Academy.

## Project Structure

```
lib/
  ├── types/
  │   └── index.ts          # TypeScript interfaces and enums
  ├── hooks/
  │   └── index.ts          # Custom React hooks for data fetching
  ├── api.ts                # Mock API services (ready for real API)
  ├── constants.ts          # App-wide constants and configs
  └── mock-data.ts          # Mock data for development
prisma/
  └── schema.prisma         # Database schema (PostgreSQL)
```

## Database Schema Overview

The `prisma/schema.prisma` file defines the complete data model for GPA Academy:

### Core Entities

1. **Users** - Students, instructors, and admins
2. **Courses** - Educational courses with categories and levels
3. **Lessons** - Individual lessons within courses
4. **Notes** - Study materials (free and premium)
5. **Enrollments** - Student-course relationships and progress
6. **Purchases** - Payment transactions for courses, notes, and tests
7. **StudentProgress** - Granular tracking of lesson completion
8. **MockTests** - Practice tests and assessments
9. **Analytics** - Aggregated analytics data
10. **AuditLogs** - Event tracking for compliance

### Enums

- **UserRole**: STUDENT, INSTRUCTOR, ADMIN
- **ExamCategory**: BANKING, SSC, RAILWAY, UPSC_CSAT
- **CourseLevel**: BEGINNER, INTERMEDIATE, ADVANCED
- **EnrollmentStatus**: ACTIVE, COMPLETED, PAUSED, CANCELLED
- **PurchaseType**: COURSE, NOTE, TEST, SUBSCRIPTION
- **PaymentStatus**: PENDING, COMPLETED, FAILED, REFUNDED, CANCELLED
- **PaymentMethod**: CARD, UPI, NETBANKING, WALLET, PAYPAL

## Setup Instructions

### 1. Install Dependencies

```bash
npm install @prisma/client
npm install -D prisma
```

### 2. Configure Database

Copy `.env.example` to `.env.local` and update:

```bash
cp .env.example .env.local
```

Update `DATABASE_URL` with your PostgreSQL connection string:

```
DATABASE_URL=postgresql://username:password@localhost:5432/gpa_academy
```

### 3. Create Database and Schema

```bash
npx prisma migrate dev --name init
```

This command will:
- Create the database if it doesn't exist
- Run migrations
- Generate Prisma Client

### 4. Seed Initial Data (Optional)

Create `prisma/seed.ts`:

```typescript
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Create sample data
  const user = await prisma.user.create({
    data: {
      email: "instructor@gpaacademy.in",
      name: "Dr. Rajesh Kumar",
      role: "INSTRUCTOR",
    },
  });

  console.log("Sample data created:", user);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
```

Update `package.json`:

```json
{
  "prisma": {
    "seed": "ts-node prisma/seed.ts"
  }
}
```

Run: `npx prisma db seed`

## API Integration

### Mock vs Real API

Currently, the app uses **mock API services** in `/lib/api.ts`. These simulate real API responses and are perfect for frontend development.

#### To migrate from mock to real API:

1. Replace mock functions in `/lib/api.ts` with actual HTTP calls:

```typescript
// Before (Mock)
export async function fetchCourses() {
  await delay();
  return { success: true, data: mockCourses };
}

// After (Real API)
export async function fetchCourses() {
  const response = await fetch(`${API_BASE_URL}/courses`);
  const data = await response.json();
  return data;
}
```

2. Add error handling and retry logic
3. Implement request interceptors for auth tokens
4. Add request/response logging

### Example: Real API Integration with Authentication

```typescript
// lib/api-client.ts
import { API_BASE_URL } from "./constants";

class APIClient {
  private baseURL: string = API_BASE_URL;

  async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const token = localStorage.getItem("authToken");
    
    const headers = {
      "Content-Type": "application/json",
      ...options.headers,
      ...(token && { Authorization: `Bearer ${token}` }),
    };

    const response = await fetch(`${this.baseURL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    return response.json();
  }

  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: "GET" });
  }

  async post<T>(endpoint: string, data: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async put<T>(endpoint: string, data: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: "DELETE" });
  }
}

export const apiClient = new APIClient();
```

## Backend API Endpoints (To Be Implemented)

See `/lib/constants.ts` for the full list of API endpoints. Key endpoints:

```
GET    /api/courses
GET    /api/courses/:id
POST   /api/courses (admin)
GET    /api/courses/:id/lessons
GET    /api/enrollments (student)
POST   /api/enrollments (student)
GET    /api/purchases (student)
POST   /api/purchases/verify (payment callback)
GET    /api/users/profile
PUT    /api/users/profile
GET    /api/analytics (admin)
```

## Using Typed Data Models in Components

All components now use TypeScript types from `/lib/types/index.ts`:

```typescript
// Before (Untyped)
export default function CourseCard({ course }) {
  return <div>{course.title}</div>;
}

// After (Typed)
import type { Course } from "@/lib/types";

interface CourseCardProps {
  course: Course;
}

export default function CourseCard({ course }: CourseCardProps) {
  return <div>{course.title}</div>;
}
```

## Custom Hooks Usage

Use the provided hooks from `/lib/hooks/index.ts`:

```typescript
// Data fetching
function CourseList() {
  const { data, loading, error } = useFetch(
    () => fetchCourses(),
    []
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {data?.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  );
}

// Form handling
function LoginForm() {
  const { values, handleChange, handleSubmit } = useForm(
    { email: "", password: "" },
    async (values) => {
      await login(values.email, values.password);
    }
  );

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="email"
        value={values.email}
        onChange={handleChange}
      />
      <button type="submit">Login</button>
    </form>
  );
}
```

## Environment Variables

Copy `.env.example` to `.env.local` and configure:

- **Database**: `DATABASE_URL`
- **Authentication**: `JWT_SECRET`, `NEXT_AUTH_SECRET`
- **Payment**: `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`
- **Storage**: `AWS_*` variables for S3
- **Email**: `SMTP_*` variables for notifications
- **Analytics**: `SENTRY_DSN`, `GOOGLE_ANALYTICS_ID`

## Next Steps

1. **Set up PostgreSQL database** locally or on a cloud provider (AWS RDS, Heroku PostgreSQL, etc.)
2. **Implement backend API** using the schema as reference
3. **Add authentication** (JWT, OAuth, or NextAuth.js)
4. **Connect payment gateway** (Razorpay recommended for India)
5. **Set up file storage** (AWS S3 or Cloudinary)
6. **Replace mock APIs** with real API calls
7. **Implement caching** (Redis) for performance
8. **Add email service** for notifications
9. **Deploy to production** (Vercel for frontend, AWS/Railway for backend)

## Useful Commands

```bash
# Prisma commands
npx prisma migrate dev              # Create migration
npx prisma studio                   # Open Prisma Studio UI
npx prisma generate                 # Regenerate Prisma Client
npx prisma db push                  # Sync schema to database (dev only)
npx prisma db seed                  # Run seed script

# Development
npm run dev                          # Start dev server
npm run build                        # Build for production
npm run start                        # Start production server
```

## Resources

- [Prisma Documentation](https://www.prisma.io/docs/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
