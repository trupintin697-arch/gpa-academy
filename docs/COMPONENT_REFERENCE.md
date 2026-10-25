# GPA Component Library Reference

## Overview
Complete documentation of all reusable components used in the GPA platform.

---

## Components Directory

### 1. `Navbar.tsx`
**Purpose**: Top navigation bar with responsive mobile menu

**Props**: None (uses internal state)

**Features**:
- Mobile hamburger menu toggle
- Links to Home, Courses, Free Notes, Mock Tests, About, Contact
- Login button with gradient
- Gradient branding "GPA" text
- Fixed position, z-50

**Usage**:
```tsx
import Navbar from "@/app/components/Navbar";

export default function Layout() {
  return <Navbar />;
}
```

**Mobile Behavior**:
- Hidden nav collapses into hamburger menu at md breakpoint
- Full dropdown menu with backdrop blur on mobile
- Click any link to close menu

---

### 2. `Footer.tsx`
**Purpose**: Footer with links and branding

**Props**: None

**Features**:
- GPA branding and mission statement
- Quick links grid (Courses, Free Notes, Mock Tests, Contact)
- Copyright notice
- Responsive layout (vertical on mobile, horizontal on desktop)

**Usage**:
```tsx
import Footer from "@/app/components/Footer";

export default function Page() {
  return (
    <>
      <main>{content}</main>
      <Footer />
    </>
  );
}
```

---

### 3. `Hero.tsx`
**Purpose**: Homepage hero section with featured course

**Props**: None

**Features**:
- Gradient radial background
- Hero headline and description
- Dual CTA buttons (Browse Courses, Download Notes)
- Featured course spotlight (SBI PO Accelerator)
- Responsive grid layout
- Stats display for featured course

**Usage**:
```tsx
import Hero from "@/app/components/Hero";

export default function HomePage() {
  return <Hero />;
}
```

**Key Content**:
- Headline: "Modern exam coaching for Banking, SSC, Railway and UPSC CSAT."
- Featured course shows 72 lessons, 18 mocks

---

### 4. `Stats.tsx`
**Purpose**: Statistics grid showing platform metrics

**Props**: None (pulls from `mock-data.ts`)

**Features**:
- 4-column grid (responsive to 1-2 on mobile)
- Displays: Students, Courses, Success Rate, Tests
- Cyan text for numbers
- Glassmorphic cards with shadows

**Data Source**:
```typescript
export const homepageStats = [
  { value: "15K+", label: "Active Learners" },
  { value: "120+", label: "Live Courses" },
  { value: "98%", label: "Exam Success" },
  { value: "45K+", label: "Practice Tests" },
];
```

**Usage**:
```tsx
import Stats from "@/app/components/Stats";

export default function HomePage() {
  return <Stats />;
}
```

---

### 5. `ExamCategories.tsx`
**Purpose**: Display exam category options

**Props**: None (pulls from `mock-data.ts`)

**Features**:
- 4-column grid of categories
- Uses `CategoryCard` component
- Responsive to 2 columns on tablet, 1 on mobile
- Links to course filtering

**Data Source**:
```typescript
export const examCategories = [
  { label: "Banking Exams", description: "...", path: "/courses?category=banking" },
  { label: "SSC Exams", description: "...", path: "/courses?category=ssc" },
  { label: "Railway Exams", description: "...", path: "/courses?category=railway" },
  { label: "UPSC CSAT", description: "...", path: "/courses?category=csat" },
];
```

**Usage**:
```tsx
import ExamCategories from "@/app/components/ExamCategories";

export default function HomePage() {
  return <ExamCategories />;
}
```

---

### 6. `FreeNotes.tsx`
**Purpose**: Showcase free downloadable study notes

**Props**: None (pulls from `mock-data.ts`)

**Features**:
- 3-column grid
- Uses `NotesCard` component
- Subject-based organization
- Download links

**Data Source**:
```typescript
export const freeNotes = [
  { title: "Quantitative Aptitude Mastery", subject: "Maths", ... },
  { title: "English Grammar Essentials", subject: "English", ... },
  { title: "General Awareness Digest", subject: "GK", ... },
];
```

**Usage**:
```tsx
import FreeNotes from "@/app/components/FreeNotes";

export default function HomePage() {
  return <FreeNotes />;
}
```

---

### 7. `PremiumCourses.tsx`
**Purpose**: Display featured premium courses

**Props**: None (pulls from `mock-data.ts`)

**Features**:
- 3-column grid on desktop, responsive
- Uses `CourseCard` component
- 6 courses across all categories
- Links to course details pages

**Data Source**:
```typescript
export const premiumCourses = [
  { slug: "sbi-po-accelerator", title: "SBI PO Accelerator", price: "₹1,299", ... },
  // ... 5 more courses
];
```

**Usage**:
```tsx
import PremiumCourses from "@/app/components/PremiumCourses";

export default function HomePage() {
  return <PremiumCourses />;
}
```

---

### 8. `Testimonials.tsx`
**Purpose**: Display student success stories

**Props**: None (pulls from `mock-data.ts`)

**Features**:
- 3-column grid
- Uses `TestimonialCard` component
- Real quotes from students
- Name and role display

**Data Source**:
```typescript
export const testimonials = [
  { quote: "GPA helped me crack SBI PO...", name: "Ananya Singh", role: "SBI PO Selectee" },
  // ... more testimonials
];
```

**Usage**:
```tsx
import Testimonials from "@/app/components/Testimonials";

export default function HomePage() {
  return <Testimonials />;
}
```

---

### 9. `FaqSection.tsx`
**Purpose**: Frequently asked questions accordion

**Props**: None (pulls from `mock-data.ts`)

**Features**:
- 2-column grid on desktop
- Questions and answers
- Glassmorphic design
- No interactive accordion (static)

**Data Source**:
```typescript
export const faqItems = [
  { question: "Can I access on mobile?", answer: "Yes, fully responsive..." },
  // ... more FAQs
];
```

**Usage**:
```tsx
import FaqSection from "@/app/components/FaqSection";

export default function HomePage() {
  return <FaqSection />;
}
```

---

### 10. `CourseCard.tsx`
**Purpose**: Individual course display card

**Props**:
```typescript
type CourseCardProps = {
  course: Course;
};
```

**Course Type**:
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
```

**Features**:
- Course title and description
- Category badge (cyan background)
- Duration, level, rating tags
- Price display
- "View Details" button links to `/courses/[slug]`
- Hover animation (translate-y-1, border color change)

**Usage**:
```tsx
import CourseCard from "@/app/components/CourseCard";
import { premiumCourses } from "@/app/lib/mock-data";

export default function CoursesPage() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {premiumCourses.map((course) => (
        <CourseCard key={course.slug} course={course} />
      ))}
    </div>
  );
}
```

---

### 11. `CategoryCard.tsx`
**Purpose**: Exam category card

**Props**:
```typescript
type CategoryCardProps = {
  label: string;
  description: string;
  path: string;
};
```

**Features**:
- Category label in cyan uppercase text
- Category title and description
- "Explore category" link arrow
- Links to course filter page
- Hover effects

**Usage**:
```tsx
import CategoryCard from "@/app/components/CategoryCard";
import { examCategories } from "@/app/lib/mock-data";

export default function CategoriesPage() {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {examCategories.map((cat) => (
        <CategoryCard key={cat.label} {...cat} />
      ))}
    </div>
  );
}
```

---

### 12. `NotesCard.tsx`
**Purpose**: Study notes card

**Props**:
```typescript
type NotesCardProps = {
  title: string;
  subject: string;
  description: string;
  downloadLink: string;
};
```

**Features**:
- Subject label (uppercase, violet)
- Notes title (h3, large)
- Description text
- "Download Notes" button
- Links to download endpoint

**Usage**:
```tsx
import NotesCard from "@/app/components/NotesCard";
import { freeNotes } from "@/app/lib/mock-data";

export default function NotesPage() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {freeNotes.map((note) => (
        <NotesCard key={note.title} {...note} />
      ))}
    </div>
  );
}
```

---

### 13. `TestimonialCard.tsx`
**Purpose**: Student testimonial quote card

**Props**:
```typescript
type TestimonialCardProps = {
  quote: string;
  name: string;
  role: string;
};
```

**Features**:
- Large quoted testimonial text
- Student name (bold)
- Role/achievement (gray text)
- Glassmorphic styling
- Hover lift effect

**Usage**:
```tsx
import TestimonialCard from "@/app/components/TestimonialCard";
import { testimonials } from "@/app/lib/mock-data";

export default function TestimonialsPage() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {testimonials.map((t) => (
        <TestimonialCard key={t.name} {...t} />
      ))}
    </div>
  );
}
```

---

### 14. `DashboardSidebar.tsx`
**Purpose**: Dashboard navigation sidebar

**Props**: None (uses `usePathname` for active state)

**Features**:
- Client component (`"use client"`)
- Navigation links to all dashboard routes
- Active state highlighting (cyan background)
- Admin panel label
- Help/update section
- Responsive (hidden on mobile, visible on xl)

**Routes**:
```
- Dashboard Home
- Student Dashboard
- Admin Dashboard
- Create Course
- Manage Courses
- Upload Notes
- Manage Students
- Analytics
```

**Usage**:
```tsx
import DashboardSidebar from "@/app/components/DashboardSidebar";

export default function DashboardLayout({ children }) {
  return (
    <div className="grid gap-8 xl:grid-cols-[280px_1fr]">
      <DashboardSidebar />
      <main>{children}</main>
    </div>
  );
}
```

---

## Data Types & Interfaces

All types defined in `app/lib/mock-data.ts`:

```typescript
// Course type
export type Course = {
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

// Category type
export type Category = {
  label: string;
  description: string;
  path: string;
};

// Note type
export type Note = {
  title: string;
  subject: string;
  description: string;
  downloadLink: string;
};

// Mock test type
export type MockTest = {
  title: string;
  subject: string;
  duration: string;
  price: string;
  summary: string;
};

// Testimonial type
export type Testimonial = {
  quote: string;
  name: string;
  role: string;
};

// FAQ type
export type FaqItem = {
  question: string;
  answer: string;
};
```

---

## Styling Conventions

### Colors
- **Primary CTA**: `from-violet-500 to-cyan-400` gradient
- **Backgrounds**: `bg-slate-950` (main), `bg-slate-900/80` (cards)
- **Borders**: `border-white/10`
- **Text Primary**: `text-white`
- **Text Secondary**: `text-slate-300`, `text-slate-400`
- **Accents**: `text-cyan-300`, `text-cyan-400`

### Spacing
- **Section padding**: `py-24 px-6`
- **Card padding**: `p-6`, `p-8`, `p-10`
- **Gaps**: `gap-6`, `gap-8`
- **Max width**: `max-w-7xl`

### Border Radius
- **Containers**: `rounded-[40px]`, `rounded-[32px]`
- **Cards**: `rounded-3xl` (28px), `rounded-2xl` (24px)
- **Pills**: `rounded-full`

### Shadows
- **Standard**: `shadow-xl shadow-black/20`
- **Large**: `shadow-2xl shadow-black/20`

### Typography
- **Font**: Geist (--font-geist-sans)
- **Headings**: `font-semibold` or `font-bold`
- **Body**: `leading-7` or `leading-8`

---

## Responsive Breakpoints

- **Mobile**: Default (< 768px) - full width, stacked
- **Tablet (md)**: 768px+ - 2-column grids
- **Desktop (lg)**: 1024px+ - 3+ column grids
- **XL (xl)**: 1280px+ - full layouts with sidebars

---

## Common Patterns

### Grid with Responsive Columns
```tsx
<div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
  {items.map((item) => (
    <Component key={item.id} {...item} />
  ))}
</div>
```

### Glassmorphic Card
```tsx
<div className="rounded-[32px] border border-white/10 bg-slate-900/80 p-8 shadow-2xl shadow-black/20 backdrop-blur-xl">
  {content}
</div>
```

### Gradient Button
```tsx
<button className="rounded-3xl bg-gradient-to-r from-violet-500 to-cyan-400 px-6 py-4 text-sm font-semibold text-slate-950 transition hover:opacity-95">
  {text}
</button>
```

### Section with Centered Header
```tsx
<section className="mx-auto max-w-7xl py-24 px-6">
  <div className="mb-12 text-center">
    <p className="text-sm uppercase tracking-[0.32em] text-cyan-300">Label</p>
    <h2 className="mt-4 text-5xl font-semibold text-white">Title</h2>
  </div>
  {content}
</section>
```

---

## Component Import Guide

All components are in `app/components/`. Import like:

```tsx
// Individual component
import Navbar from "@/app/components/Navbar";

// Multiple components
import {
  Navbar,
  Footer,
  CourseCard,
  CategoryCard,
} from "@/app/components";  // Note: requires index.tsx export

// With mock data
import { premiumCourses } from "@/app/lib/mock-data";
```

---

## Testing Components

### Test a Component in Isolation
Create a test page at `app/test/page.tsx`:

```tsx
import CourseCard from "@/app/components/CourseCard";
import { premiumCourses } from "@/app/lib/mock-data";

export default function TestPage() {
  return (
    <div className="bg-slate-950 text-white p-10">
      <h1 className="text-4xl mb-10">Component Test</h1>
      <CourseCard course={premiumCourses[0]} />
    </div>
  );
}
```

Then visit `http://localhost:3000/test`

---

## Creating New Components

### Template
```tsx
// app/components/MyComponent.tsx

type MyComponentProps = {
  prop1: string;
  prop2?: number;
};

export default function MyComponent({ prop1, prop2 = 0 }: MyComponentProps) {
  return (
    <div className="rounded-[32px] border border-white/10 bg-slate-900/80 p-8 shadow-xl shadow-black/20">
      <h2 className="text-2xl font-semibold text-white">{prop1}</h2>
      <p className="mt-4 text-slate-300">{prop2}</p>
    </div>
  );
}
```

### Export from index.tsx (optional)
```tsx
// app/components/index.tsx
export { default as Navbar } from "./Navbar";
export { default as Footer } from "./Footer";
export { default as CourseCard } from "./CourseCard";
// ... more exports
```

Then import multiple: `import { Navbar, Footer } from "@/app/components";`

---

## Performance Tips

1. **Use Next.js Image component** for images
2. **Lazy load components** with dynamic imports
3. **Memoize components** if re-rendering frequently
4. **Optimize data fetching** - avoid N+1 queries
5. **Use proper key props** in lists

---

## Accessibility

All components include:
- Semantic HTML (h2, h3, button, a, etc.)
- Proper heading hierarchy
- Link text descriptions
- Button labels
- Form labels (when implemented)

Enhance with:
- ARIA labels where needed
- Keyboard navigation
- Focus states
- Alt text for images

---

**Component Library Version**: 1.0.0  
**Last Updated**: May 2026
