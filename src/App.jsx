import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation, useParams } from "react-router-dom";
import { ThemeProvider } from "@/context/ThemeContext";
import { AuthProvider } from "@/context/AuthContext";

// Pages
import Home from "@/pages/Home";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Courses from "@/pages/Courses";
import CourseDetailsPage from "@/pages/CourseDetails";
import CourseLearnPage from "@/pages/CourseLearn";
import FreeNotes from "@/pages/FreeNotes";
import MockTests from "@/pages/MockTests";
import TakeTestPage from "@/pages/TakeTest";
import TestResultPage from "@/pages/TestResult";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import StudentDashboard from "@/pages/StudentDashboard";
import TeacherDashboard from "@/pages/TeacherDashboard";
import AdminDashboard from "@/pages/AdminDashboard";
import ProfileForm from "@/components/ProfileForm";

// Dashboard subpages & Layout
import DashboardHomePage from "@/pages/DashboardHome";
import DashboardLayout from "@/components/DashboardLayout";
import ManageCoursesPage from "@/pages/ManageCourses";
import CreateCoursePage from "@/pages/CreateCourse";
import NotFound from "@/pages/NotFound";

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const id = hash.replace("#", "");
      // slight delay to ensure destination elements are mounted
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
          return;
        }
        window.scrollTo(0, 0);
      }, 50);
      return;
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

function CourseDetailsRoute() {
  const params = useParams();
  return <CourseDetailsPage params={params} />;
}

function CourseLearnRoute() {
  const params = useParams();
  return <CourseLearnPage params={params} />;
}

function TakeTestRoute() {
  const params = useParams();
  return <TakeTestPage params={params} />;
}

function TestResultRoute() {
  const params = useParams();
  return <TestResultPage params={params} />;
}

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <ScrollToTop />
          <Routes>
            {/* Public Pages */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/courses/:slug" element={<CourseDetailsRoute />} />
            <Route path="/courses/:slug/learn" element={<CourseLearnRoute />} />
            <Route path="/free-notes" element={<FreeNotes />} />
            <Route path="/current-affairs" element={<FreeNotes defaultSubject="General Awareness" />} />
            <Route path="/mock-tests" element={<MockTests />} />
            <Route path="/mock-tests/:id/take" element={<TakeTestRoute />} />
            <Route path="/mock-tests/:id/result" element={<TestResultRoute />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Dashboard & Portals */}
            <Route
              path="/dashboard"
              element={
                <DashboardLayout>
                  <DashboardHomePage />
                </DashboardLayout>
              }
            />
            <Route
              path="/dashboard/student"
              element={
                <DashboardLayout requiredRole="student">
                  <StudentDashboard />
                </DashboardLayout>
              }
            />
            <Route
              path="/dashboard/student/profile"
              element={
                <DashboardLayout requiredRole="student">
                  <ProfileForm role="student" />
                </DashboardLayout>
              }
            />
            <Route
              path="/dashboard/teacher"
              element={
                <DashboardLayout requiredRole="teacher">
                  <TeacherDashboard />
                </DashboardLayout>
              }
            />
            <Route
              path="/dashboard/teacher/profile"
              element={
                <DashboardLayout requiredRole="teacher">
                  <ProfileForm role="teacher" />
                </DashboardLayout>
              }
            />
            <Route
              path="/dashboard/admin"
              element={
                <DashboardLayout requiredRole="admin">
                  <AdminDashboard />
                </DashboardLayout>
              }
            />
            <Route
              path="/dashboard/admin/manage-courses"
              element={
                <DashboardLayout requiredRole="admin">
                  <ManageCoursesPage />
                </DashboardLayout>
              }
            />
            <Route
              path="/dashboard/admin/create-course"
              element={
                <DashboardLayout requiredRole="admin">
                  <CreateCoursePage />
                </DashboardLayout>
              }
            />
            <Route
              path="/dashboard/admin/manage-students"
              element={<Navigate to="/dashboard/admin?tab=students" replace />}
            />
            <Route
              path="/dashboard/admin/manage-teachers"
              element={<Navigate to="/dashboard/admin?tab=teachers" replace />}
            />
            <Route
              path="/dashboard/admin/upload-notes"
              element={<Navigate to="/free-notes" replace />}
            />
            <Route
              path="/dashboard/admin/analytics"
              element={<Navigate to="/dashboard/admin" replace />}
            />
            <Route path="/admin" element={<Navigate to="/dashboard/admin" replace />} />

            {/* 404 Catch-All */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
