/**
 * API Client & Network Service
 * Handles unified API requests to Next.js API endpoints with graceful offline/client fallback
 */
import { getPublishedTests, addPublishedTest, getTestById as getLocalTestById, getPublishedVideos, addPublishedVideo, recordAttempt as recordLocalAttempt } from "@/utils/content-store";
import { mockCourses, freeNotes } from "@/data/mock-data";
const BASE_API_URL = typeof window !== "undefined" ? "/api" : (process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api");
// ================= COURSES =================
export async function fetchCourses(category, query) {
    try {
        const params = new URLSearchParams();
        if (category && category.toLowerCase() !== "all")
            params.set("category", category);
        if (query)
            params.set("q", query);
        const res = await fetch(`${BASE_API_URL}/courses?${params.toString()}`, { cache: "no-store" });
        if (!res.ok)
            throw new Error("Failed to fetch courses");
        const json = await res.json();
        return json.data || [];
    }
    catch (error) {
        console.warn("fetchCourses fallback to mockCourses:", error);
        let list = [...mockCourses];
        if (category && category.toLowerCase() !== "all") {
            list = list.filter((c) => c.category.toLowerCase() === category.toLowerCase());
        }
        return list;
    }
}
export async function fetchCourseById(idOrSlug) {
    try {
        const res = await fetch(`${BASE_API_URL}/courses/${idOrSlug}`, { cache: "no-store" });
        if (!res.ok)
            throw new Error(`Failed to fetch course ${idOrSlug}`);
        const json = await res.json();
        return json.data || null;
    }
    catch (error) {
        console.warn("fetchCourseById fallback to mockCourses:", error);
        return mockCourses.find((c) => c.id === idOrSlug || c.slug === idOrSlug) || null;
    }
}
// ================= ENROLLMENTS =================
export async function fetchEnrollments(userId) {
    try {
        const res = await fetch(`${BASE_API_URL}/enrollments?userId=${encodeURIComponent(userId)}`, {
            headers: { "x-user-id": userId },
            cache: "no-store",
        });
        if (!res.ok)
            throw new Error("Failed to fetch enrollments");
        const json = await res.json();
        return json.data || [];
    }
    catch (error) {
        console.warn("fetchEnrollments fallback:", error);
        // Return mock enrolled courses for demo
        return [
            { id: "enr_1", userId, courseId: "course_sbi_po_2026", course: mockCourses[0], progress: 42 },
            { id: "enr_2", userId, courseId: "course_ssc_cgl_chsl", course: mockCourses[1], progress: 18 },
        ];
    }
}
export async function submitEnrollment(userId, courseId) {
    try {
        const res = await fetch(`${BASE_API_URL}/enrollments`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId, courseId }),
        });
        return await res.json();
    }
    catch (error) {
        console.error("submitEnrollment error:", error);
        return { success: true, message: "Enrolled in course (offline mode)" };
    }
}
// ================= MOCK TESTS =================
export async function fetchMockTests(category) {
    try {
        const params = new URLSearchParams();
        if (category && category.toLowerCase() !== "all")
            params.set("category", category);
        const res = await fetch(`${BASE_API_URL}/mock-tests?${params.toString()}`, { cache: "no-store" });
        if (!res.ok)
            throw new Error("Failed to fetch mock tests");
        const json = await res.json();
        return json.data || getPublishedTests();
    }
    catch (error) {
        console.warn("fetchMockTests fallback to local store:", error);
        return getPublishedTests();
    }
}
export async function fetchMockTestById(id) {
    try {
        const res = await fetch(`${BASE_API_URL}/mock-tests/${id}`, { cache: "no-store" });
        if (!res.ok)
            throw new Error(`Failed to fetch mock test ${id}`);
        const json = await res.json();
        return json.data || getLocalTestById(id);
    }
    catch (error) {
        console.warn("fetchMockTestById fallback to local store:", error);
        return getLocalTestById(id);
    }
}
export async function submitMockTest(payload) {
    try {
        const res = await fetch(`${BASE_API_URL}/mock-tests/${payload.testId}/submit`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });
        const json = await res.json();
        if (json.success && json.data) {
            // Also sync to localStorage attempt history
            recordLocalAttempt(payload.studentId, {
                testId: payload.testId,
                testTitle: json.data.testTitle,
                score: json.data.score,
                totalMarks: json.data.totalMarks,
                accuracy: json.data.accuracy,
                timeSpent: json.data.timeSpent,
                submittedAt: json.data.submittedAt,
            });
            if (typeof window !== "undefined") {
                localStorage.setItem(`gpa_test_result_${payload.testId}`, JSON.stringify(json.data));
            }
            return json.data;
        }
    }
    catch (error) {
        console.warn("submitMockTest server call failed, evaluating locally:", error);
    }
    // Local fallback evaluation
    const test = getLocalTestById(payload.testId);
    let correctCount = 0;
    let wrongCount = 0;
    test?.questions.forEach((q, idx) => {
        const sel = payload.selectedAnswers[idx];
        if (sel !== undefined) {
            if (sel === q.correctAnswer)
                correctCount++;
            else
                wrongCount++;
        }
    });
    const score = Math.max(0, correctCount * 1.0 - wrongCount * 0.25);
    const attemptedCount = Object.keys(payload.selectedAnswers).length;
    const accuracy = attemptedCount > 0 ? Math.round((correctCount / attemptedCount) * 100) : 0;
    const resultData = {
        testId: payload.testId,
        testTitle: test?.title || "Mock Test",
        totalQuestions: test?.questions.length || 0,
        answeredCount: attemptedCount,
        correctCount,
        wrongCount,
        unattempted: (test?.questions.length || 0) - attemptedCount,
        score: parseFloat(score.toFixed(2)),
        totalMarks: test?.totalMarks || 100,
        accuracy,
        timeSpent: payload.timeSpent,
        violations: payload.violationsCount ?? 0,
        terminated: payload.violationTerminated ?? false,
        selectedAnswers: payload.selectedAnswers,
        submittedAt: new Date().toISOString(),
    };
    recordLocalAttempt(payload.studentId, {
        testId: payload.testId,
        testTitle: resultData.testTitle,
        score: resultData.score,
        totalMarks: resultData.totalMarks,
        accuracy: resultData.accuracy,
        timeSpent: resultData.timeSpent,
        submittedAt: resultData.submittedAt,
    });
    if (typeof window !== "undefined") {
        localStorage.setItem(`gpa_test_result_${payload.testId}`, JSON.stringify(resultData));
    }
    return resultData;
}
export async function fetchMockTestResult(testId, studentId) {
    try {
        const params = studentId ? `?studentId=${encodeURIComponent(studentId)}` : "";
        const res = await fetch(`${BASE_API_URL}/mock-tests/${testId}/result${params}`, { cache: "no-store" });
        if (!res.ok)
            throw new Error("Failed to fetch test result");
        const json = await res.json();
        return json.data;
    }
    catch (error) {
        console.warn("fetchMockTestResult fallback to localStorage:", error);
        if (typeof window !== "undefined") {
            const stored = localStorage.getItem(`gpa_test_result_${testId}`);
            if (stored)
                return JSON.parse(stored);
        }
        return null;
    }
}
// ================= TEACHER APIS =================
export async function publishTeacherTest(payload) {
    try {
        const res = await fetch(`${BASE_API_URL}/mock-tests`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });
        const json = await res.json();
        if (json.success && json.data) {
            addPublishedTest(json.data);
            return json.data;
        }
    }
    catch (error) {
        console.warn("publishTeacherTest API error, saving locally:", error);
    }
    // Local fallback
    return addPublishedTest(payload);
}
export async function fetchTeacherVideos(batch) {
    try {
        const params = batch ? `?batch=${encodeURIComponent(batch)}` : "";
        const res = await fetch(`${BASE_API_URL}/teacher/videos${params}`, { cache: "no-store" });
        if (!res.ok)
            throw new Error("Failed to fetch videos");
        const json = await res.json();
        return json.data || getPublishedVideos();
    }
    catch (error) {
        console.warn("fetchTeacherVideos fallback:", error);
        return getPublishedVideos();
    }
}
export async function publishTeacherVideo(payload) {
    try {
        const res = await fetch(`${BASE_API_URL}/teacher/videos`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });
        const json = await res.json();
        if (json.success && json.data) {
            addPublishedVideo(json.data);
            return json.data;
        }
    }
    catch (error) {
        console.warn("publishTeacherVideo API error, saving locally:", error);
    }
    return addPublishedVideo({
        id: `vid_${Date.now()}`,
        title: payload.title,
        youtubeUrl: payload.youtubeUrl,
        batch: payload.batch,
        createdBy: payload.createdBy || "tch_1",
        views: 0,
        publishedAt: new Date().toISOString(),
    });
}
export async function fetchTeacherSubmissions() {
    try {
        const res = await fetch(`${BASE_API_URL}/teacher/submissions`, { cache: "no-store" });
        if (!res.ok)
            throw new Error("Failed to fetch submissions");
        const json = await res.json();
        return json.data || [];
    }
    catch (error) {
        console.warn("fetchTeacherSubmissions error:", error);
        return [];
    }
}
// ================= STUDY NOTES =================
export async function fetchNotes(category) {
    try {
        const params = category && category.toLowerCase() !== "all" ? `?category=${encodeURIComponent(category)}` : "";
        const res = await fetch(`${BASE_API_URL}/notes${params}`, { cache: "no-store" });
        if (!res.ok)
            throw new Error("Failed to fetch notes");
        const json = await res.json();
        return json.data || freeNotes;
    }
    catch (error) {
        console.warn("fetchNotes error, using freeNotes:", error);
        return freeNotes;
    }
}
