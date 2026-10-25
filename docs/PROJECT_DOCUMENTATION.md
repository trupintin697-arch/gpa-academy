# GPA - Gyan Prapti Academy | Production EdTech Frontend

## Project Overview

GPA (Gyan Prapti Academy) is a modern, production-ready EdTech platform frontend built with **Next.js 15**, **TypeScript**, **Tailwind CSS**, and featuring a **dark glassmorphism design** inspired by Udemy and Prabhat Ravi platforms.

The platform serves banking, SSC, railway, and UPSC CSAT aspirants with comprehensive course management, mock tests, downloadable notes, and an admin dashboard.

---

## Project Structure

```
app/
├── components/              # Reusable UI components
│   ├── Navbar.tsx          # Navigation with mobile menu
│   ├── Footer.tsx          # Footer with links
│   ├── Hero.tsx            # Homepage hero section
│   ├── Stats.tsx           # Statistics grid
│   ├── ExamCategories.tsx  # Category cards for exam paths
│   ├── FreeNotes.tsx       # Free study notes section
│   ├── PremiumCourses.tsx  # Course listing component
│   ├── Testimonials.tsx    # Student testimonials
│   ├── FaqSection.tsx      # FAQ accordion
│   ├── CourseCard.tsx      # Individual course card
│   ├── CategoryCard.tsx    # Category card component
│   ├── NotesCard.tsx       # Notes card component
│   ├── TestimonialCard.tsx # Testimonial card component
│   └── DashboardSidebar.tsx # Dashboard navigation sidebar
├── dashboard/              # Dashboard routes
│   ├── layout.tsx          # Dashboard layout
│   ├── page.tsx            # Dashboard home
│   ├── student/
│   │   └── page.tsx        # Student dashboard
│   └── admin/
│       ├── page.tsx        # Admin overview
│       ├── create-course/  # Create course form
│       ├── manage-courses/ # Course management
│       ├── upload-notes/   # Notes upload
│       ├── manage-students/# Student management
│       └── analytics/      # Platform analytics
├── courses/                # Course pages
│   ├── page.tsx           # All courses listing
│   └── [slug]/
│       └── page.tsx       # Individual course details
├── about/
│   └── page.tsx           # About us page
├── contact/
│   └── page.tsx           # Contact form page
├── login/
│   └── page.tsx           # Student login
├── register/
│   └── page.tsx           # Student registration
├── free-notes/
│   └── page.tsx           # Free notes page
├── mock-tests/
│   └── page.tsx           # Mock tests listing
├── lib/
│   └── mock-data.ts       # Mock data and types
├── globals.css            # Global styles
├── layout.tsx             # Root layout
└── page.tsx              # Homepage
```

---

## Key Features

### 1. **Homepage Sections**
- **Hero Section**: Compelling headline, description, and dual CTA buttons
- **Statistics**: Key metrics (students, courses, tests, success rate)
- **Exam Categories**: Banking, SSC, Railway, UPSC CSAT with descriptions
- **Free Notes**: Download center for study materials
- **Premium Courses**: Featured course offerings with pricing and ratings
- **Testimonials**: Real student success stories
- **FAQ Section**: Common questions with answers
- **Footer**: Links and branding

### 2. **Public Pages**
- **Courses Page**: Browse all exam categories and courses with filters
- **Course Details**: Full course information, syllabus, instructor, enrollment
- **Free Notes**: Downloadable study materials across subjects
- **Mock Tests**: Exam-style full-length tests with timer
- **About Page**: GPA mission, faculty, success stories
- **Contact Page**: Contact form with support details
- **Login/Register**: Student authentication pages

### 3. **Student Dashboard**
- **My Courses**: Track progress with visual bars
- **Download Notes**: Subject-wise notes access
- **Profile Settings**: Update account information and subscription
- **Course Progress**: Track completion percentage

### 4. **Admin Dashboard**
- **Dashboard Home**: Quick navigation to all admin sections
- **Create Course**: Form to publish new courses
- **Manage Courses**: Edit, archive, or delete existing courses
- **Upload Notes**: Publish free study materials
- **Manage Students**: View and manage enrolled students
- **Analytics**: Platform statistics (revenue, enrollments, downloads, completion)

### 5. **Design System**
- **Color Scheme**: Dark theme (slate-950) with cyan and violet accents
- **Components**: Glassmorphic cards with border and backdrop blur
- **Typography**: Geist font family with clear hierarchy
- **Spacing**: 8px grid system with Tailwind utilities
- **Animations**: Hover effects, transitions, and smooth interactions
- **Mobile**: Full responsive design for all devices

---

## Component Documentation

### Reusable Components

#### `CourseCard`
Displays individual course with title, description, category, duration, level, rating, price.
```tsx
<CourseCard course={course} />
```

#### `CategoryCard`
Shows exam category with description and link to courses.
```tsx
<CategoryCard label="Banking" description="..." path="/courses?category=banking" />
```

#### `NotesCard`
Displays downloadable notes with subject and description.
```tsx
<NotesCard title="Quant Notes" subject="Maths" description="..." downloadLink="/free-notes" />
```

#### `TestimonialCard`
Shows student testimonial with quote, name, and role.
```tsx
<TestimonialCard quote="..." name="John Doe" role="SBI PO Selectee" />
```

#### `DashboardSidebar`
Navigation sidebar for dashboard routes with active state tracking.
```tsx
<DashboardSidebar />
```

---

## Data Types & Mock Data

### Key Types (from `lib/mock-data.ts`)
```typescript
type Course = {
  slug: string;
  title: string;
  category: string;
  price: string;
  level: string;
  duration: string;
  rating: string;
  lessons: number;
  tests: number;
  description: string;
  highlights: string[];
};

type Category = {
  label: string;
  description: string;
  path: string;
};

type Note = {
  title: string;
  subject: string;
  description: string;
  downloadLink: string;
};
```

### Mock Data Included
- **6 Premium Courses** across Banking, SSC, Railway, CSAT categories
- **4 Exam Categories** with descriptions
- **3 Free Notes** with subjects
- **4 Mock Tests** with timing and pricing
- **3 Testimonials** from successful candidates
- **4 FAQ Items** about the platform
- **4 Analytics Stats** for admin dashboard

---

## Styling & UI

### Design Approach
- **Dark Glassmorphism**: Semi-transparent cards with backdrop blur
- **Border Colors**: White with 10% opacity for subtle separation
- **Gradients**: Violet → Cyan progressions for CTAs
- **Shadows**: Black with 20% opacity for depth
- **Border Radius**: 32px for large containers, 28px for cards, 24px for buttons

### Responsive Breakpoints
- **Mobile**: Single column, full-width sections
- **Tablet (md)**: Two-column grids, adjusted padding
- **Desktop (lg/xl)**: Multi-column layouts, full navigation

---

## Setup & Installation

### Prerequisites
- Node.js 18+ 
- npm 9+
- A code editor (VS Code recommended)

### Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run development server:**
   ```bash
   npm run dev
   ```
   Open http://localhost:3000 in your browser

3. **Build for production:**
   ```bash
   npm run build
   npm start
   ```

4. **Run linting:**
   ```bash
   npm run lint
   ```

---

## Routing Map

| Route | Component | Purpose |
|-------|-----------|---------|
| `/` | Home | Homepage with all sections |
| `/courses` | Courses | Browse all courses |
| `/courses/[slug]` | CourseDetails | Individual course page |
| `/free-notes` | FreeNotes | Download study materials |
| `/mock-tests` | MockTests | Practice test listing |
| `/about` | About | Platform information |
| `/contact` | Contact | Contact form |
| `/login` | Login | Student login |
| `/register` | Register | Student signup |
| `/dashboard` | DashboardHome | Dashboard overview |
| `/dashboard/student` | StudentDashboard | Student courses & progress |
| `/dashboard/admin` | AdminDashboard | Admin overview |
| `/dashboard/admin/create-course` | CreateCourse | Add new course |
| `/dashboard/admin/manage-courses` | ManageCourses | Edit/delete courses |
| `/dashboard/admin/upload-notes` | UploadNotes | Publish free notes |
| `/dashboard/admin/manage-students` | ManageStudents | View students |
| `/dashboard/admin/analytics` | Analytics | Platform metrics |

---

## Next Steps & Enhancements

### Authentication
- Integrate with Clerk or Auth0 for real authentication
- Set up role-based access control (student, admin, instructor)

### Backend Integration
- Connect to REST API or GraphQL for courses, enrollments, notes
- Set up payment processing (Stripe, Razorpay for Indian users)

### Database
- Implement course progress tracking
- Store user preferences and learning history
- Mock test performance analytics

### Features
- Live chat or support system
- Course video player integration
- Real-time notifications for new courses/updates
- Certificate generation upon course completion
- Search and filtering with advanced options

### Performance
- Image optimization with Next.js Image component
- Implement SSR/ISR for better SEO
- Add service worker for offline support
- Database query optimization

### Testing
- Unit tests for components (Jest + React Testing Library)
- E2E tests (Playwright or Cypress)
- Performance testing

---

## Code Quality

### Technologies
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **Linting**: ESLint 9
- **Type Safety**: Strict mode enabled

### Best Practices Implemented
- ✅ Type-safe components and props
- ✅ Reusable component architecture
- ✅ Semantic HTML and accessibility-aware markup
- ✅ Mobile-first responsive design
- ✅ Clean folder structure
- ✅ Data separation from UI (mock-data.ts)
- ✅ Proper Next.js routing conventions
- ✅ Environment-ready code patterns

---

## Browser Support
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

---

## File Sizes & Performance
- Main bundle: Optimized with tree-shaking
- CSS: Tailwind purged for production
- Images: Will benefit from Next.js Image optimization
- Code splitting: Automatic with App Router

---

## Branding & Customization

### Colors
- **Primary**: Violet-500 to Cyan-400 gradient
- **Background**: Slate-950 (dark)
- **Surface**: Slate-900/80 with transparency
- **Text**: Slate-200 (primary), Slate-300 (secondary)
- **Accent**: Cyan-300 for highlights

### Font
- **Sans-serif**: Geist (body, headings)
- **Mono**: Geist Mono (code, technical text)

### Logo
Currently displays "GPA" in gradient. Replace with actual logo in Navbar.tsx

---

## Support & Documentation

- Next.js Documentation: https://nextjs.org/docs
- Tailwind CSS: https://tailwindcss.com/docs
- TypeScript: https://www.typescriptlang.org/docs

---

## License

This project is proprietary to GPA - Gyan Prapti Academy. All rights reserved.

---

**Version**: 1.0.0  
**Last Updated**: May 2026  
**Built by**: GitHub Copilot with Next.js Architecture
