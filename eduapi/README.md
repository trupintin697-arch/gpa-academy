# Gyan Prapti Academy (GPA) - REST API Service (`eduapi`)

A dedicated REST API server powering the Gyan Prapti Academy educational platform.

## 🚀 Running the API Server

From the `eduapi` folder:

```bash
# Run in production mode
npm start

# Run in development mode with auto-reload
npm run dev
```

The server listens on **`http://localhost:5000`**.  
Base API URL: **`http://localhost:5000/api`**

---

## 📡 API Endpoints Reference

### 1. System Health
- **`GET /api/health`**
  - Returns API uptime, service status, and timestamp.

---

### 2. Authentication & Users (`/api/auth`)
- **`POST /api/auth/login`**
  - **Body**: `{ email, password, role }`
  - Returns authenticated user object and bearer session token.
- **`POST /api/auth/register`**
  - **Body**: `{ name, email, phone, role }`
  - Registers new student/faculty profile.
- **`POST /api/auth/send-otp`**
  - **Body**: `{ contact }`
  - Issues 6-digit OTP for passwordless mobile/email login.
- **`POST /api/auth/verify-otp`**
  - **Body**: `{ contact, otp, name, role }`
  - Verifies OTP code and returns session.
- **`GET /api/auth/me`**
  - **Headers**: `x-user-id: <id>`
  - Returns current user profile.
- **`GET /api/auth/users`**
  - Returns all registered students, teachers, and admins.
- **`PUT /api/auth/users/:id/ban`**
  - **Body**: `{ banned: boolean, reason: string }`
  - Administrative account suspension/reinstatement.
- **`PUT /api/auth/users/:id/profile`**
  - **Body**: User profile patches (name, phone, bio, education, target exam).

---

### 3. Courses (`/api/courses`)
- **`GET /api/courses`**
  - **Query Params**: `?category=<banking|ssc|railway|csat>&q=<searchTerm>`
  - Fetches course catalog with filtering and search.
- **`GET /api/courses/:idOrSlug`**
  - Fetches course details, modules, syllabus, and video list.
- **`POST /api/courses`**
  - **Body**: `{ title, category, level, price, duration, description, highlights }`
  - Creates a new course bundle.
- **`PUT /api/courses/:id`**
  - Updates existing course information or publishing state.
- **`DELETE /api/courses/:id`**
  - Removes a course from the catalog.

---

### 4. Enrollments (`/api/enrollments`)
- **`GET /api/enrollments`**
  - **Query Params**: `?userId=<userId>` or Header `x-user-id`
  - Retrieves active enrolled courses for the student dashboard.
- **`POST /api/enrollments`**
  - **Body**: `{ userId, courseId }`
  - Enrolls user into a course bundle.

---

### 5. Mock Tests & CBT Exam Engine (`/api/mock-tests`)
- **`GET /api/mock-tests`**
  - **Query Params**: `?category=<banking|ssc|railway|csat>`
  - Lists published mock tests.
- **`GET /api/mock-tests/:id?mode=take`**
  - Retrieves full exam paper.
  - When `mode=take`, securely strips out `correctAnswer` and `explanation` so answer keys cannot be inspected by students during the exam.
- **`POST /api/mock-tests/:id/submit`**
  - **Body**: `{ studentId, selectedAnswers, timeSpent, violationsCount, violationTerminated }`
  - Evaluates student answers on the server with +1.0 for correct and -0.25 negative marking.
  - Generates comprehensive result scorecard and records attempt history.
- **`GET /api/mock-tests/:id/result`**
  - **Query Params**: `?studentId=<studentId>`
  - Returns scorecard analytics for the test.
- **`POST /api/mock-tests`**
  - **Body**: `{ title, subject, duration, questions: [...], batch, createdBy }`
  - Teacher/Admin portal test paper builder and publisher.
- **`GET /api/mock-tests/history/:studentId`**
  - Returns test attempt history for student performance analytics.

---

### 6. Teacher Portal (`/api/teacher`)
- **`GET /api/teacher/videos`**
  - **Query Params**: `?batch=<batchName>`
  - Returns video lectures assigned by faculty.
- **`POST /api/teacher/videos`**
  - **Body**: `{ title, youtubeUrl, batch, createdBy }`
  - Assigns video lecture to a student batch.
- **`GET /api/teacher/submissions`**
  - Lists student submissions and average score statistics for faculty review.

---

### 7. Study Notes & Materials (`/api/notes`)
- **`GET /api/notes`**
  - **Query Params**: `?category=<category>`
  - Returns downloadable PDF notes and formula books.
- **`POST /api/notes`**
  - Uploads/creates study material entries.

---

### 8. Admin CMS & Customization (`/api/settings`)
- **`GET /api/settings/marquee`** / **`POST /api/settings/marquee`**
  - Manages homepage live announcements marquee ticker items.
- **`GET /api/settings/categories`** / **`POST /api/settings/categories`**
  - Manages exam category cards on the homepage.

---

### 9. Contact & Inquiries (`/api/contact`)
- **`POST /api/contact`**
  - **Body**: `{ name, email, message, phone }`
  - Records student admission inquiries and counseling requests.
- **`GET /api/contact`**
  - Lists contact form submissions for admin review.

---

## 💾 Persistence Layer

The server uses a resilient JSON-backed data store (`data.json`) that seeds automatically on first run and persists all modifications (new courses, exam submissions, user bans, assignments) across server restarts without external database dependencies.
