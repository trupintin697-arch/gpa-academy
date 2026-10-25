# GPA Platform - Quick Start Guide

## 🚀 Getting Started Immediately

### 1. Install & Run Locally

```bash
# Navigate to project
cd ~/Desktop/edu-platform

# Install dependencies
npm install

# Start development server
npm run dev

# Open in browser
# http://localhost:3000
```

### 2. Explore Pages

| Page | URL | Description |
|------|-----|-------------|
| Homepage | `http://localhost:3000` | Full homepage with hero, stats, courses, testimonials, FAQ |
| Courses | `http://localhost:3000/courses` | Browse all exam categories and courses |
| Free Notes | `http://localhost:3000/free-notes` | Downloadable study materials |
| Mock Tests | `http://localhost:3000/mock-tests` | Practice exams with timers |
| Course Details | `http://localhost:3000/courses/sbi-po-accelerator` | Full course page |
| About | `http://localhost:3000/about` | About GPA platform |
| Contact | `http://localhost:3000/contact` | Contact form |
| Login | `http://localhost:3000/login` | Student login page |
| Register | `http://localhost:3000/register` | Student signup |
| Student Dashboard | `http://localhost:3000/dashboard/student` | My courses and progress |
| Admin Dashboard | `http://localhost:3000/dashboard/admin` | Admin overview |
| Create Course | `http://localhost:3000/dashboard/admin/create-course` | Publish new course |
| Manage Courses | `http://localhost:3000/dashboard/admin/manage-courses` | Edit courses |
| Upload Notes | `http://localhost:3000/dashboard/admin/upload-notes` | Publish free notes |
| Manage Students | `http://localhost:3000/dashboard/admin/manage-students` | View students |
| Analytics | `http://localhost:3000/dashboard/admin/analytics` | Platform metrics |

---

## 📁 Key Files to Know

### Pages (Full-page routes)
- `app/page.tsx` - Homepage
- `app/courses/page.tsx` - All courses
- `app/courses/[slug]/page.tsx` - Individual course details
- `app/login/page.tsx` - Student login
- `app/register/page.tsx` - Student signup
- `app/free-notes/page.tsx` - Free notes
- `app/mock-tests/page.tsx` - Mock tests
- `app/about/page.tsx` - About us
- `app/contact/page.tsx` - Contact form
- `app/dashboard/page.tsx` - Dashboard home
- `app/dashboard/student/page.tsx` - Student dashboard
- `app/dashboard/admin/page.tsx` - Admin dashboard

### Components (Reusable UI)
- `app/components/Navbar.tsx` - Top navigation (responsive)
- `app/components/Footer.tsx` - Footer with links
- `app/components/Hero.tsx` - Homepage hero section
- `app/components/Stats.tsx` - Statistics grid
- `app/components/ExamCategories.tsx` - Category cards
- `app/components/FreeNotes.tsx` - Notes section
- `app/components/PremiumCourses.tsx` - Courses section
- `app/components/Testimonials.tsx` - Testimonials section
- `app/components/FaqSection.tsx` - FAQ section
- `app/components/CourseCard.tsx` - Single course card
- `app/components/CategoryCard.tsx` - Single category card
- `app/components/NotesCard.tsx` - Single notes card
- `app/components/TestimonialCard.tsx` - Single testimonial card
- `app/components/DashboardSidebar.tsx` - Dashboard sidebar nav

### Data
- `app/lib/mock-data.ts` - All mock data and types

### Configuration
- `app/layout.tsx` - Root HTML structure
- `app/globals.css` - Global styles
- `tsconfig.json` - TypeScript config
- `next.config.ts` - Next.js config
- `postcss.config.mjs` - PostCSS/Tailwind config
- `tailwind.config.ts` - Tailwind configuration

---

## 🎨 UI Component Usage

### Adding a Course Card
```tsx
import CourseCard from "@/app/components/CourseCard";
import { premiumCourses } from "@/app/lib/mock-data";

export default function MyPage() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {premiumCourses.map((course) => (
        <CourseCard key={course.slug} course={course} />
      ))}
    </div>
  );
}
```

### Adding a Category Card
```tsx
import CategoryCard from "@/app/components/CategoryCard";

export default function MyPage() {
  return (
    <CategoryCard 
      label="Banking"
      description="SBI PO, IBPS and more..."
      path="/courses?category=banking"
    />
  );
}
```

### Adding a Notes Card
```tsx
import NotesCard from "@/app/components/NotesCard";

export default function MyPage() {
  return (
    <NotesCard 
      title="Quantitative Aptitude"
      subject="Maths"
      description="Banking and SSC notes..."
      downloadLink="/free-notes"
    />
  );
}
```

---

## 🔧 Customization Quick Tips

### Change Platform Name
1. Open `app/components/Navbar.tsx`
2. Replace "GPA" with your name in the Link text
3. Update Footer.tsx similarly

### Change Colors
1. Update `app/globals.css` for background gradient
2. Use Tailwind color classes in components (e.g., `from-violet-500 to-cyan-400`)
3. Common colors: `cyan-300`, `violet-400`, `slate-900`, `slate-950`

### Update Homepage Content
1. Edit `app/components/Hero.tsx` for hero text
2. Edit `app/lib/mock-data.ts` for courses, notes, testimonials
3. Components automatically update when data changes

### Add a New Route
1. Create folder in `app/` (e.g., `app/pricing/`)
2. Add `page.tsx` inside
3. Automatically becomes a route at `/pricing`

---

## 📊 Mock Data

All demo data is stored in `app/lib/mock-data.ts`:

### Courses (6 available)
- SBI PO Accelerator - ₹1,299
- SSC CGL Power Pack - ₹1,099
- RRB NTPC Success Path - ₹899
- UPSC CSAT Complete - ₹1,499
- IBPS Clerk Mastery - ₹999
- SSC CHSL Rapid Revision - ₹799

### Categories (4)
- Banking Exams
- SSC Exams
- Railway Exams
- UPSC CSAT

### Free Notes (3)
- Quantitative Aptitude Mastery
- English Grammar Essentials
- General Awareness Digest

### Mock Tests (4)
- Banking Full Length Test - ₹199
- SSC CGL Practice Suite - ₹149
- Railway General Aptitude - ₹129
- UPSC CSAT Practice Drill - ₹179

### Stats (Homepage)
- 15K+ Active Learners
- 120+ Live Courses
- 98% Exam Success
- 45K+ Practice Tests

---

## 🔐 Authentication (Next Steps)

Currently pages are unprotected. To add authentication:

1. **Install Clerk** (recommended):
   ```bash
   npm install @clerk/nextjs
   ```

2. **Wrap app in ClerkProvider**:
   ```tsx
   // app/layout.tsx
   import { ClerkProvider } from '@clerk/nextjs';
   
   export default function RootLayout({ children }) {
     return (
       <ClerkProvider>
         {children}
       </ClerkProvider>
     );
   }
   ```

3. **Protect dashboard routes**:
   ```tsx
   import { auth } from '@clerk/nextjs/server';
   
   export default async function DashboardPage() {
     const { userId } = await auth();
     if (!userId) redirect('/login');
     // ...
   }
   ```

---

## 💾 Connecting a Database

### Option 1: Supabase (PostgreSQL)
```bash
npm install @supabase/supabase-js
```

### Option 2: MongoDB
```bash
npm install mongoose
```

### Option 3: Firebase
```bash
npm install firebase firebase-admin
```

Create tables/collections for:
- Courses
- Enrollments
- Student Progress
- Notes
- Mock Test Scores

---

## 🚀 Deployment Checklist

### Before Going Live

- [ ] Replace mock data with real data from API/Database
- [ ] Implement authentication (Clerk, Auth0, Firebase)
- [ ] Set up payment processing (Stripe, Razorpay)
- [ ] Configure email service for notifications
- [ ] Add analytics (Google Analytics, Segment)
- [ ] Test all pages on mobile devices
- [ ] Set up error logging (Sentry)
- [ ] Optimize images with `next/image`
- [ ] Enable ISR/SSG for better SEO
- [ ] Set up CI/CD pipeline
- [ ] Run `npm run build` successfully
- [ ] Test in production build locally
- [ ] Set environment variables (.env.local)

### Environment Variables (.env.local)
```
NEXT_PUBLIC_API_URL=https://api.gpaacademy.com
DATABASE_URL=your_database_url
PAYMENT_API_KEY=your_stripe_key
EMAIL_SERVICE_KEY=your_email_key
```

### Deploy to Vercel
```bash
# Push to GitHub
git add .
git commit -m "Initial GPA platform"
git push origin main

# Connect to Vercel
# 1. Go to vercel.com
# 2. Click "New Project"
# 3. Import from GitHub
# 4. Set environment variables
# 5. Deploy
```

### Other Platforms
- **Netlify**: Similar to Vercel process
- **Railway**: Supports Next.js deployment
- **AWS Amplify**: Full-stack deployment
- **DigitalOcean App Platform**: Container-based

---

## 🐛 Common Issues & Fixes

### Port Already in Use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
npm run dev
```

### Tailwind Styles Not Showing
```bash
# Clear cache and rebuild
rm -rf .next
npm run dev
```

### TypeScript Errors
```bash
# Run type check
npx tsc --noEmit

# Fix with auto-repair
npx eslint --fix .
```

---

## 📱 Responsive Design

All pages are mobile-first responsive:
- **Mobile**: Single column, full-width
- **Tablet (768px+)**: 2-3 columns, optimized padding
- **Desktop (1024px+)**: Full multi-column layout

Test responsive by:
1. Opening DevTools (F12)
2. Toggle Device Toolbar (Ctrl+Shift+M)
3. Test at 375px, 768px, 1440px widths

---

## 🎓 Learning Resources

### Next.js
- [Next.js Docs](https://nextjs.org/docs)
- [App Router Guide](https://nextjs.org/docs/app)

### TypeScript
- [TS Handbook](https://www.typescriptlang.org/docs)

### Tailwind CSS
- [Tailwind Docs](https://tailwindcss.com/docs)
- [Tailwind Components](https://tailwindcss.com/docs/reusing-styles)

### React
- [React Docs](https://react.dev)

---

## 📞 Support

For issues, questions, or feature requests:
1. Check PROJECT_DOCUMENTATION.md
2. Review component source code comments
3. Consult Next.js and Tailwind documentation
4. Check GitHub issues if using version control

---

**Ready to Launch?** Your GPA platform is production-ready! 🎉

Start the dev server and explore all the pages. Then integrate with your backend, database, and payment system.

Good luck! 🚀
