"use client";
import { mockTestsData, teacherAssignedTests, teacherAssignedVideos, mockUsers, adminStudents } from "@/data/mock-data";
import { avatarUrl } from "@/utils/avatar";
const TESTS_KEY = "gpa_published_tests";
const VIDEOS_KEY = "gpa_published_videos";
const HISTORY_KEY_PREFIX = "gpa_test_history_";
const PROFILE_EXTRA_PREFIX = "gpa_profile_extra_";
const USERS_KEY = "gpa_user_registry";
const VIOLATIONS_PREFIX = "gpa_violations_";
const STREAK_PREFIX = "gpa_streak_";
const RESOURCES_OPENED_PREFIX = "gpa_resources_opened_";
const MARQUEE_KEY = "gpa_marquee_items";
const EXAM_CATEGORIES_KEY = "gpa_exam_categories";
const FEATURED_COURSES_KEY = "gpa_featured_courses";
function readJSON(key) {
    if (typeof window === "undefined")
        return null;
    try {
        const raw = localStorage.getItem(key);
        return raw ? JSON.parse(raw) : null;
    }
    catch {
        return null;
    }
}
function writeJSON(key, value) {
    if (typeof window === "undefined")
        return;
    try {
        localStorage.setItem(key, JSON.stringify(value));
    }
    catch {
        // storage unavailable — content simply won't persist this session
    }
}
function seedTests() {
    const legacyById = new Map(teacherAssignedTests.map((t) => [t.id, t]));
    const seeded = mockTestsData.map((t) => {
        const legacy = legacyById.get(t.id);
        return {
            id: t.id,
            title: t.title,
            subject: t.subject,
            duration: t.duration,
            totalMarks: t.totalMarks,
            totalQuestions: t.totalQuestions,
            summary: t.summary,
            instructions: t.instructions,
            sections: t.sections,
            questions: t.questions,
            batch: "All Students",
            createdBy: "tch_1",
            submissions: legacy?.submissions ?? 0,
            avgScore: legacy?.avgScore ?? "Pending",
            violationsDetected: legacy?.violationsDetected ?? 0,
            publishedAt: new Date(2026, 0, 1).toISOString(),
        };
    });
    writeJSON(TESTS_KEY, seeded);
    return seeded;
}
function seedVideos() {
    const seeded = teacherAssignedVideos.map((v) => ({
        id: v.id,
        title: v.title,
        youtubeUrl: v.youtubeUrl,
        batch: v.batch,
        createdBy: "tch_1",
        views: v.views,
        publishedAt: new Date(2026, 0, 1).toISOString(),
    }));
    writeJSON(VIDEOS_KEY, seeded);
    return seeded;
}
export function getPublishedTests() {
    return readJSON(TESTS_KEY) ?? seedTests();
}
export function addPublishedTest(test) {
    const tests = [test, ...getPublishedTests()];
    writeJSON(TESTS_KEY, tests);
    return tests;
}
export function getTestById(id) {
    return getPublishedTests().find((t) => t.id === id);
}
export function getPublishedVideos() {
    return readJSON(VIDEOS_KEY) ?? seedVideos();
}
export function addPublishedVideo(video) {
    const videos = [video, ...getPublishedVideos()];
    writeJSON(VIDEOS_KEY, videos);
    return videos;
}
export function getAttemptHistory(studentId) {
    return readJSON(HISTORY_KEY_PREFIX + studentId) ?? [];
}
export function recordAttempt(studentId, summary) {
    const existing = getAttemptHistory(studentId).filter((a) => a.testId !== summary.testId);
    const history = [summary, ...existing];
    writeJSON(HISTORY_KEY_PREFIX + studentId, history);
    const tests = getPublishedTests();
    const idx = tests.findIndex((t) => t.id === summary.testId);
    if (idx !== -1) {
        const test = tests[idx];
        const prevAvg = parseFloat(test.avgScore);
        const nextAvg = test.submissions > 0 && !Number.isNaN(prevAvg)
            ? (prevAvg * test.submissions + summary.score) / (test.submissions + 1)
            : summary.score;
        tests[idx] = {
            ...test,
            submissions: test.submissions + 1,
            avgScore: `${nextAvg.toFixed(1)}/${test.totalMarks}`,
        };
        writeJSON(TESTS_KEY, tests);
    }
    return history;
}
export function getProfileExtra(userId) {
    return readJSON(PROFILE_EXTRA_PREFIX + userId) ?? {};
}
export function setProfileExtra(userId, extra) {
    const merged = { ...getProfileExtra(userId), ...extra };
    writeJSON(PROFILE_EXTRA_PREFIX + userId, merged);
    return merged;
}
function seedUsers() {
    const fromRoster = mockUsers.map((u) => ({
        id: u.id, name: u.name, email: u.email, role: u.role, avatar: u.profileImage,
        joinedAt: new Date(2026, 0, 1).toISOString(), banned: false,
    }));
    const fromStudents = adminStudents
        .filter((s) => !fromRoster.some((u) => u.email === s.email))
        .map((s) => ({
        id: s.id, name: s.name, email: s.email, role: "student", avatar: avatarUrl(s.name),
        joinedAt: new Date(2026, 0, 1).toISOString(), banned: s.status !== "Active",
    }));
    const seeded = [...fromRoster, ...fromStudents];
    writeJSON(USERS_KEY, seeded);
    return seeded;
}
export function getAllUsers() {
    return readJSON(USERS_KEY) ?? seedUsers();
}
export function registerUser(u) {
    const all = getAllUsers();
    const existing = all.find((x) => x.id === u.id);
    const merged = { ...u, joinedAt: existing?.joinedAt ?? new Date().toISOString(), banned: existing?.banned ?? false, banReason: existing?.banReason };
    writeJSON(USERS_KEY, [merged, ...all.filter((x) => x.id !== u.id)]);
    return merged;
}
export function isBanned(userId) {
    return getAllUsers().find((u) => u.id === userId)?.banned ?? false;
}
export function setBanStatus(userId, banned, reason) {
    const all = getAllUsers().map((u) => (u.id === userId ? { ...u, banned, banReason: banned ? reason : undefined } : u));
    writeJSON(USERS_KEY, all);
    return all;
}
export const defaultMarqueeItems = [
    { title: "BANKING (SBI & IBPS PO)", badge: "LIVE" },
    { title: "SSC CGL / CHSL 2026", badge: "HOT" },
    { title: "RAILWAY RRB NTPC", badge: "TRENDING" },
    { title: "UPSC CSAT (PAPER 2)", badge: "ADVANCED" },
    { title: "CAMPUS PLACEMENT 2026", badge: "NEW" },
    { title: "VEDIC SPEED MATHS", badge: "100% TRICKS" },
    { title: "TOPIC-WISE MOCK TESTS", badge: "120 MIN CBT" },
];
export function getMarqueeItems() {
    return readJSON(MARQUEE_KEY) ?? defaultMarqueeItems;
}
export function setMarqueeItems(items) {
    writeJSON(MARQUEE_KEY, items);
    return items;
}
export const defaultExamCategories = [
    {
        label: "Banking Exams",
        description: "Comprehensive syllabus for SBI PO, IBPS PO, Clerk, RBI Assistant, and RRB Officer Scale I.",
        path: "/courses?category=banking",
    },
    {
        label: "SSC Exams",
        description: "SSC CGL, CHSL, CPO, MTS, and GD with structured test series and shortcut tricks.",
        path: "/courses?category=ssc",
    },
    {
        label: "Railway Exams",
        description: "Specialized coaching for RRB NTPC, Group D, ALP, and Technician with timed mock exams.",
        path: "/courses?category=railway",
    },
    {
        label: "UPSC CSAT",
        description: "High-impact CSAT preparation covering Comprehension, Reasoning, and Data Interpretation.",
        path: "/courses?category=csat",
    },
];
export function getExamCategories() {
    return readJSON(EXAM_CATEGORIES_KEY) ?? defaultExamCategories;
}
export function setExamCategories(items) {
    writeJSON(EXAM_CATEGORIES_KEY, items);
    return items;
}
export const defaultFeaturedCourses = [
    {
        id: "course_1",
        slug: "vedic-maths-speed-tricks",
        category: "Banking",
        title: "Vedic Maths & Speed Calculation Mastery",
        description: "Master lightning-fast mental calculations, multiplication shortcuts, square roots, and percentage approximations by Gyan Prapti Academy.",
        duration: "6 Weeks (24 Lectures)",
        lessons: 8,
        rating: 4.9,
        price: 99900,
        originalPrice: 199900,
    },
    {
        id: "course_2",
        slug: "quantitative-aptitude-foundation",
        category: "SSC",
        title: "Quantitative Aptitude for Banking & SSC CGL",
        description: "Complete numerical ability coverage: Number Systems, Ratio & Proportion, Profit & Loss, Simple & Compound Interest, Time & Work.",
        duration: "10 Weeks (40 Lectures)",
        lessons: 10,
        rating: 4.95,
        price: 149900,
        originalPrice: 299900,
    },
    {
        id: "course_3",
        slug: "logical-reasoning-pro",
        category: "Railway",
        title: "Logical Reasoning & Analytical Puzzles",
        description: "Crack complex floor puzzles, seating arrangements, syllogisms, blood relations, and coding-decoding for competitive exams.",
        duration: "8 Weeks (32 Lectures)",
        lessons: 8,
        rating: 4.85,
        price: 129900,
        originalPrice: 249900,
    },
];
export function getFeaturedCourses() {
    return readJSON(FEATURED_COURSES_KEY) ?? defaultFeaturedCourses;
}
export function setFeaturedCourses(items) {
    writeJSON(FEATURED_COURSES_KEY, items);
    return items;
}
function dayKey(date) {
    return date.toISOString().slice(0, 10);
}
export function getStreakData(studentId) {
    return readJSON(STREAK_PREFIX + studentId) ?? { current: 0, longest: 0, lastActiveDay: null };
}
export function touchStreak(studentId) {
    const today = dayKey(new Date());
    const existing = getStreakData(studentId);
    if (existing.lastActiveDay === today)
        return existing;
    const yesterday = dayKey(new Date(Date.now() - 86400000));
    const current = existing.lastActiveDay === yesterday ? existing.current + 1 : 1;
    const updated = { current, longest: Math.max(existing.longest, current), lastActiveDay: today };
    writeJSON(STREAK_PREFIX + studentId, updated);
    return updated;
}
export function hasOpenedResources(studentId) {
    return readJSON(RESOURCES_OPENED_PREFIX + studentId) ?? false;
}
export function markResourcesOpened(studentId) {
    writeJSON(RESOURCES_OPENED_PREFIX + studentId, true);
    return true;
}
export function getViolationCount(userId) {
    return readJSON(VIOLATIONS_PREFIX + userId) ?? 0;
}
export function flagViolation(userId) {
    const count = getViolationCount(userId) + 1;
    writeJSON(VIOLATIONS_PREFIX + userId, count);
    return count;
}
