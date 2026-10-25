# Course Details Page - Complete Documentation

## Overview

A **professional Course Details page** for GPA - Gyan Prapti Academy, designed similar to Udemy/Physics Wallah course pages. Displays complete course information, curriculum, instructor details, and enrollment options.

**Route**: `/courses/[id]`  
**Files**:
- `app/courses/[id]/page.tsx` (520+ lines)
- `app/courses/[id]/layout.tsx` (metadata generation)

---

## 🎯 Features

### 1. **Course Banner**
- Large hero section with course emoji and title
- Gradient background based on course category
- Responsive height adjustment
- Eye-catching design

### 2. **Course Meta Information**
```
✓ Star Rating (4.5/5)
✓ Total Reviews Count (1,247+)
✓ Number of Lessons
✓ Course Duration
✓ Difficulty Level (Beginner/Intermediate/Advanced)
```

### 3. **Instructor Profile Card**
- Instructor avatar (from Dicebear API)
- Name and title
- Email contact
- Professional layout

### 4. **Course Description Section**
- Main course description
- What you'll learn (bullet points)
- Course highlights
- Learning objectives

### 5. **Curriculum/Lessons**
- Expandable modules (4 lessons per module)
- Module titles with lesson count
- Lesson duration tracking
- Free/Premium indicators
- Lock icons for locked lessons
- Play icons for free lessons

### 6. **Course Pricing**
- Original price (strikethrough)
- Discount price with percentage
- Discount badge (e.g., "40% OFF")
- Price formatting in INR

### 7. **Sticky Sidebar**
- Quick price display
- Enroll button (CTA)
- Preview lessons button
- Money-back guarantee badge
- Course stats quick view
- Level and rating info

### 8. **Free Preview Section**
- List of free preview lessons
- Accessible without enrollment
- Quick preview buttons
- "No credit card required" message

### 9. **Course Benefits**
- Full course access
- Downloadable resources
- Certificate on completion
- Expert support
- Grid of 4 benefit cards

### 10. **Sticky Bottom CTA**
- Price display
- Enroll button
- Always accessible while scrolling

---

## 📁 File Structure

```
app/courses/
├── [id]/
│   ├── page.tsx          ← Main course details component
│   └── layout.tsx        ← Metadata generation & layout
└── page.tsx              ← Courses listing page
```

---

## 🎨 Design Features

### Color Scheme
- **Primary**: Purple → Pink gradient
- **Background**: Dark slate (#020617)
- **Surfaces**: Semi-transparent slate with blur
- **Accents**: Category-specific colors

### Category Colors
- **Banking**: Blue (`from-blue-500/20 to-blue-600/20`)
- **SSC**: Purple (`from-purple-500/20 to-purple-600/20`)
- **Railway**: Orange (`from-orange-500/20 to-orange-600/20`)
- **UPSC CSAT**: Pink (`from-pink-500/20 to-pink-600/20`)

### Category Emoji
- **Banking**: 🏦
- **SSC**: 📊
- **Railway**: 🚂
- **UPSC CSAT**: 🎓

### Visual Effects
- ✅ Glassmorphism (backdrop blur)
- ✅ Gradient overlays
- ✅ Smooth transitions
- ✅ Hover effects
- ✅ Sticky sidebar positioning
- ✅ Expandable/Collapsible modules

---

## 📊 Data Structure

### Course Object
```typescript
{
  id: string
  slug: string
  title: string
  description: string
  category: ExamCategory  // BANKING, SSC, RAILWAY, UPSC_CSAT
  level: CourseLevel      // BEGINNER, INTERMEDIATE, ADVANCED
  price: number           // in paise (₹999 = 99900)
  originalPrice: number   // original price in paise
  duration: string        // e.g., "12 Weeks"
  rating: number          // 0-5 stars
  totalRatings: number    // total reviews
  lessons: number         // total lessons
  tests: number           // total tests
  highlights: string[]    // course benefits
  instructorId: string
  isPublished: boolean
  createdAt: Date
  updatedAt: Date
}
```

### Instructor Object
```typescript
{
  id: string
  email: string
  name: string
  role: UserRole  // STUDENT, INSTRUCTOR, ADMIN
  profileImage: string  // Avatar URL
  phone: string
  createdAt: Date
  updatedAt: Date
}
```

### Lesson Object (Generated)
```typescript
{
  id: string
  title: string
  duration: number        // in minutes
  isFree: boolean
  order: number
}
```

### Module Object (Generated)
```typescript
{
  id: string
  title: string
  lessons: Lesson[]
}
```

---

## 🔄 State Management

### React Hooks Used
```typescript
// Expandable module state
const [expandedModule, setExpandedModule] = useState<string | null>('module_1');

// Selected lesson for preview
const [selectedLesson, setSelectedLesson] = useState<string | null>(null);
```

### Initial State
- First module (Module 1) expanded by default
- No lesson selected initially
- Allows smooth UX on page load

---

## 📱 Responsive Design

### Breakpoints
```
Mobile (< 768px):
- Single column layout
- Stack sidebar below content
- Full-width buttons
- Sticky header on scroll

Tablet (768px - 1024px):
- 2-column layout
- Sidebar starts appearing
- Slightly smaller text

Desktop (> 1024px):
- 3-column grid (content, empty, sidebar)
- Sticky sidebar
- Full-width implementation
- Optimized spacing
```

### Layout Classes
```
lg:col-span-2    ← Main content takes 2/3
lg:col-span-1    ← Sidebar takes 1/3
grid-cols-1 lg:grid-cols-3  ← Responsive grid
```

---

## 🎯 Interactive Elements

### Curriculum Section
- **Expandable modules**: Click to expand/collapse
- **Chevron animation**: Rotates on expand
- **Lesson buttons**: Highlight on selection
- **Duration display**: Shows total time per module
- **Lock icons**: Indicate paid lessons
- **Play icons**: Indicate free preview lessons

### Buttons
- **Enroll Now**: Primary gradient button
- **Preview Free Lessons**: Secondary button
- **Module toggle**: Click to expand curriculum

### Badges
- **Discount**: Green emerald badge
- **Free Preview**: Small emerald pill
- **Course Level**: Purple badge

---

## 💰 Pricing Logic

### Price Formatting
```typescript
// Display price: divide by 100
const displayPrice = course.price / 100;  // ₹1299

// Original price
const originalPrice = course.originalPrice / 100;  // ₹1999

// Discount percentage
const discount = Math.round(
  ((course.originalPrice - course.price) / course.originalPrice) * 100
);  // 35% OFF
```

### Currency Format
- Use INR symbol: ₹
- Show in rupees (divide by 100)
- Format with comma separators

---

## 🎬 Mock Data Generation

### Course Lessons (Auto-generated)
- Generates lessons based on `course.lessons` count (capped at 12)
- First 2 lessons marked as free
- Remaining lessons locked
- Random duration 30-70 minutes each

### Modules (Auto-grouped)
- Groups lessons into modules of 4
- Auto-generates module names (Module 1, 2, 3, etc.)
- Calculates total duration per module

### Example
```typescript
// If course has 12 lessons:
// Module 1: Lessons 1-4
// Module 2: Lessons 5-8
// Module 3: Lessons 9-12

// First 2 lessons (Lesson 1-2) are free
// Rest are locked
```

---

## 🔌 Backend Integration Points

### Replace Mock Data
```typescript
// Current (mock):
const course = mockCourses.find((c) => c.id === params.id);

// After backend:
useEffect(() => {
  fetch(`/api/courses/${params.id}`)
    .then(res => res.json())
    .then(data => setCourse(data));
}, [params.id]);
```

### API Endpoints Needed
- `GET /api/courses/[id]` - Get course details
- `GET /api/courses/[id]/lessons` - Get course lessons
- `GET /api/courses/[id]/instructor` - Get instructor info
- `POST /api/enrollments` - Enroll in course
- `GET /api/students/[userId]/course/[courseId]/preview` - Check free access

---

## 🎯 Key Components Breakdown

### Header Navigation
```typescript
<div className="sticky top-0 z-40 bg-slate-900/80 backdrop-blur-xl">
  {/* Back to courses link */}
</div>
```

### Main Content Grid
```typescript
<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
  <div className="lg:col-span-2">
    {/* Course info, description, curriculum */}
  </div>
  <div className="lg:col-span-1">
    {/* Sticky sidebar with pricing & CTA */}
  </div>
</div>
```

### Curriculum Module
```typescript
<div key={module.id}>
  <button onClick={() => toggleModule(module.id)}>
    {/* Module header */}
  </button>
  {expandedModule === module.id && (
    <div>
      {/* Lessons list */}
    </div>
  )}
</div>
```

### Sticky Sidebar
```typescript
<div className="sticky top-24">
  {/* Price card that follows scroll */}
  {/* Free preview section */}
  {/* Course features */}
</div>
```

---

## 🎨 Tailwind Classes Reference

### Layout
```
max-w-7xl            ← Container max width
grid grid-cols-1 lg:grid-cols-3  ← Responsive grid
space-y-8            ← Vertical spacing
gap-8                ← Gap between columns
```

### Colors
```
bg-slate-900/40      ← Semi-transparent background
text-slate-100       ← Primary text
text-slate-400       ← Secondary text
from-purple-500 to-pink-500  ← Gradient
```

### Effects
```
backdrop-blur-xl     ← Glassmorphism
border border-slate-700/50  ← Subtle border
rounded-xl           ← Border radius
shadow-lg            ← Box shadow
transition-all duration-200  ← Smooth transitions
```

---

## 📊 Pricing Display

### Price Card
```
╔═════════════════════╗
║  ₹1,299             ║
║  ₹1,999  (crossed)  ║
║  35% OFF            ║
║                     ║
║  ✓ 72 Lessons       ║
║  ✓ 12 Weeks         ║
║  ✓ Certificate      ║
║  ✓ Expert Support   ║
║                     ║
║  [Enroll Now] CTA   ║
╚═════════════════════╝
```

---

## ⚙️ Configuration

### Default Expanded Module
```typescript
const [expandedModule, setExpandedModule] = useState<string | null>('module_1');
// First module opened by default for better UX
```

### Free Lessons Count
```typescript
const courseLessons = Array.from({ length: Math.min(12, course.lessons) }, ...);
// Capped at 12 lessons displayed (8 paid + 2 free preview = 10 total shown)
// First 2 marked as free
```

### Category Mapping
```typescript
const categoryColors = {
  BANKING: 'from-blue-500/20 to-blue-600/20',
  SSC: 'from-purple-500/20 to-purple-600/20',
  RAILWAY: 'from-orange-500/20 to-orange-600/20',
  UPSC_CSAT: 'from-pink-500/20 to-pink-600/20',
};
```

---

## 🚀 Usage

### Navigate to Course
```
http://localhost:3000/courses/course_1
http://localhost:3000/courses/course_2
http://localhost:3000/courses/course_3
http://localhost:3000/courses/course_4
```

### Test Features
1. Click module titles to expand/collapse curriculum
2. Click lessons to preview
3. Click "Enroll Now" button (mock)
4. Scroll to see sticky sidebar
5. View free preview section

---

## 📈 Performance Optimization

### Implemented
- Client-side component (`'use client'`)
- Direct mock data (no API calls in demo)
- Lazy rendering of expanded modules
- CSS-based animations (no extra JS)

### Future Optimizations
- Image lazy loading for course banner
- Virtual scrolling for long curriculum
- Video player lazy loading
- API response caching
- Pagination for reviews section

---

## 🔒 Security Considerations

**Current**: Frontend only, mock data
- No authentication checks
- No actual payment processing
- No secure enrollment

**Before Production**:
1. Verify user authentication
2. Check course access permissions
3. Validate payment before enrollment
4. Implement secure API calls
5. Add error boundaries
6. Rate limit API endpoints

---

## 🎯 Next Steps

1. **Backend Integration**
   - Connect to `/api/courses/[id]`
   - Fetch real instructor data
   - Load actual lessons

2. **Authentication**
   - Add login/signup flow
   - Check enrollment status
   - Personalize content

3. **Enrollment**
   - Implement payment
   - Store enrollment data
   - Track progress

4. **Features**
   - Student reviews section
   - Q&A forum
   - Certificate generation
   - Progress tracking

---

## 📚 Related Pages

- `/courses` - Course listing page
- `/courses/[id]` - Course details (current)
- `/dashboard/student/[courseId]` - Course player (after enrollment)
- `/admin/manage-courses` - Admin course management

---

## ✨ Feature Completeness

✅ **Implemented:**
- Course banner with emoji
- Course metadata display
- Instructor profile card
- Course description & highlights
- Expandable curriculum with modules
- Free/Premium lesson indicators
- Sticky price card with CTA
- Discount calculation
- Free preview section
- Course benefits grid
- Responsive design
- Dark theme with glassmorphism
- Smooth interactions
- Back navigation

⬜ **To Add Later:**
- Student reviews/ratings
- Related courses section
- FAQ section
- Course prerequisites
- Instructor bio expansion
- Q&A section
- Testimonials
- Video player integration
- Real enrollment flow
- Progress tracking

---

**Course Details Page** — Professional Udemy-style interface. Ready for backend integration and enrollment flow implementation.

Generated: June 1, 2026 | GPA - Gyan Prapti Academy
