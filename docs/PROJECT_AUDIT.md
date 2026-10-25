# GPA Academy Project Audit

## Summary
This audit is based on source inspection of the current `edu-platform` workspace and available diagnostics. No source code changes were made.

## Key Findings

### 1. TypeScript / Next.js issues
- `app/courses/[slug]/page.tsx`
  - This file is marked with `'use client'` and also imports `use` from React.
  - `use(params)` is not a valid pattern for a client component in React/Next.js. This is likely to fail during compile or runtime.
  - `course.originalPrice` is optional in the course type, but the code uses it without a safety check when calculating `discountPercent`.
- `app/dashboard/admin/manage-students/page.tsx`
  - The component renders `student.exam`, but `adminStudents` in `lib/mock-data.ts` only provides `id`, `name`, `email`, `enrolled`, and `status`.
  - This is a concrete broken data access path.

### 2. Unused files and components
- `lib/api.ts`
  - No source references found for this file in the current app or lib tree.
- `lib/hooks/index.ts`
  - No source references found in the repo.
- `app/lib/mock-data.ts`
  - This file appears to be a duplicate mock-data file under `app/lib` and is not imported by any app file.
- `app/components/FreeCourses.tsx`
  - This component is declared but never imported or rendered anywhere in the app.

### 3. Navigation / page link audit
- Main navigation in `app/components/Navbar.tsx` links to:
  - `/`
  - `/courses`
  - `/free-notes`
  - `/mock-tests`
  - `/about`
  - `/contact`
  - plus a login action linking to `/login`
- The registration route `/register` is not present in the main nav.
- The `/admin` route (`app/admin/page.tsx`) is not linked from the main site navigation or the dashboard UI.
- Dashboard pages are reachable via `app/components/DashboardSidebar.tsx`.
  - `/dashboard`
  - `/dashboard/student`
  - `/dashboard/admin`
  - `/dashboard/admin/create-course`
  - `/dashboard/admin/manage-courses`
  - `/dashboard/admin/upload-notes`
  - `/dashboard/admin/manage-students`
  - `/dashboard/admin/analytics`
- The `/admin` page is an orphan route relative to the rest of the navigation structure.

### 4. Duplicate / overlapping route concerns
- There are no exact filename/path duplicates in the app router.
- There is a semantic overlap between:
  - `/admin` and
  - `/dashboard/admin`
- This overlap may confuse maintainers or users, but it is not a direct route collision.

### 5. Broken imports and suspicious module usage
- No references were found for `@/lib/api` or `@/lib/hooks`.
- The top-level alias `@/*` maps to project root, so imports from `@/lib/mock-data` resolve to `lib/mock-data.ts`, not `app/lib/mock-data.ts`.
- `app/components/FreeCourses.tsx` is an unused component.
- `app/dashboard/admin/manage-students/page.tsx` relies on a missing property in `adminStudents`.

## Affected files
- `app/courses/[slug]/page.tsx`
- `app/dashboard/admin/manage-students/page.tsx`
- `app/components/FreeCourses.tsx`
- `app/admin/page.tsx`
- `app/lib/mock-data.ts`
- `lib/api.ts`
- `lib/hooks/index.ts`
- `lib/mock-data.ts`

## Recommendations
1. Fix `app/courses/[slug]/page.tsx` by either:
   - converting it to a server component and using `params` directly,
   - or removing `use(params)` and correctly passing route params as a plain object.
2. Guard `course.originalPrice` before using it in arithmetic expressions.
3. Correct `app/dashboard/admin/manage-students/page.tsx` to render an available field such as `student.enrolled` or add `exam` to the mock student data.
4. Remove or consolidate duplicate/unused files:
   - `lib/api.ts`
   - `lib/hooks/index.ts`
   - `app/lib/mock-data.ts`
   - `app/components/FreeCourses.tsx`
5. Decide whether `/admin` should remain as a separate route or be merged into `/dashboard/admin`.
6. Consider exposing `/register` from the main navigation if registration should be discoverable.

## Notes
- `app/api/courses/route.ts` and `app/api/courses/[id]/route.ts` are distinct route handlers for list and detail API endpoints.
- `app/dashboard/layout.tsx` provides the shared dashboard shell; the admin sidebar is the dashboard navigation surface.

## Suggested next checks
- Run `npm run build` or `npx tsc --noEmit` after fixing the above pages.
- Validate whether `app/courses/[slug]/page.tsx` compiles as a client component; if not, remove `use client`.
- Confirm that any stale mock-data file is not required for legacy imports.
