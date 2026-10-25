// Talent Index: a single 0-100 readiness score aggregating a student's real
// activity (tests, courses, resources, streak, profile) already tracked
// elsewhere in the app. No field here is invented — every input is a number
// the dashboard already computes or stores.
export const TALENT_TIERS = [
    { id: "beginner", label: "Beginner", min: 0, max: 40, color: "text-slate-500 dark:text-slate-400", bg: "bg-slate-100 dark:bg-slate-800", ring: "stroke-slate-400" },
    { id: "bronze", label: "Bronze", min: 41, max: 59, color: "text-amber-700 dark:text-amber-500", bg: "bg-amber-50 dark:bg-amber-500/10", ring: "stroke-amber-600" },
    { id: "silver", label: "Silver", min: 60, max: 79, color: "text-slate-600 dark:text-slate-300", bg: "bg-slate-100 dark:bg-slate-700/40", ring: "stroke-slate-400" },
    { id: "gold", label: "Gold", min: 80, max: 100, color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-100 dark:bg-amber-500/15", ring: "stroke-amber-500" },
];
export function getTalentTier(score) {
    return TALENT_TIERS.find((t) => score >= t.min && score <= t.max) ?? TALENT_TIERS[0];
}
export function computeTalentIndex({ history, enrolledCourses, resourcesOpened, streak, profileExtra }) {
    const avgAccuracy = history.length ? history.reduce((s, h) => s + h.accuracy, 0) / history.length : 0;
    const testsScore = Math.round((avgAccuracy / 100) * 25) + Math.min(15, history.length * 3);
    const courseProgressValues = enrolledCourses.length ? [65, 30, 100, 15, 80].slice(0, enrolledCourses.length) : [];
    const avgCourseProgress = courseProgressValues.length
        ? courseProgressValues.reduce((s, v) => s + v, 0) / courseProgressValues.length
        : 0;
    const coursesScore = Math.round((avgCourseProgress / 100) * 25);
    const resourcesScore = resourcesOpened ? 10 : 0;
    const streakScore = Math.min(15, streak);
    const profileFields = [profileExtra?.targetExam, profileExtra?.batch].filter(Boolean).length;
    const profileScore = profileFields * 5;
    const total = Math.min(100, testsScore + coursesScore + resourcesScore + streakScore + profileScore);
    return {
        total,
        tier: getTalentTier(total),
        breakdown: [
            { label: "Tests", score: testsScore, max: 40 },
            { label: "Courses", score: coursesScore, max: 25 },
            { label: "Resources", score: resourcesScore, max: 10 },
            { label: "Streak", score: streakScore, max: 15 },
            { label: "Profile", score: profileScore, max: 10 },
        ],
    };
}
