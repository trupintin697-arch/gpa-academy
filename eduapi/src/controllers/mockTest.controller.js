import { db } from '../data/dbStore.js';

export const getMockTests = (req, res) => {
  try {
    const { category } = req.query;
    let list = db.getMockTests();

    if (category && category.toLowerCase() !== "all") {
      list = list.filter(t => 
        t.subject?.toLowerCase().includes(category.toLowerCase()) ||
        t.category?.toLowerCase() === category.toLowerCase()
      );
    }

    return res.json({ success: true, count: list.length, data: list });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const getMockTestById = (req, res) => {
  try {
    const { id } = req.params;
    const { mode } = req.query; // 'take' or 'review'
    const test = db.getMockTestById(id);
    if (!test) {
      return res.status(404).json({ success: false, message: "Mock test not found" });
    }

    // Security check: if taking the test, strip out correctAnswer and explanation
    if (mode === 'take') {
      const sanitizedQuestions = (test.questions || []).map(q => {
        const { correctAnswer, explanation, ...rest } = q;
        return rest;
      });
      return res.json({
        success: true,
        data: {
          ...test,
          questions: sanitizedQuestions
        }
      });
    }

    return res.json({ success: true, data: test });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const submitMockTest = (req, res) => {
  try {
    const { id } = req.params;
    const {
      studentId = "student@gpaacademy.in",
      selectedAnswers = {},
      timeSpent = 0,
      violationsCount = 0,
      violationTerminated = false
    } = req.body;

    const test = db.getMockTestById(id);
    if (!test) {
      return res.status(404).json({ success: false, message: "Mock test not found" });
    }

    // Server-side objective evaluation
    let correctCount = 0;
    let wrongCount = 0;
    const questions = test.questions || [];

    questions.forEach((q, idx) => {
      const studentAnswer = selectedAnswers[idx];
      if (studentAnswer !== undefined && studentAnswer !== null) {
        if (studentAnswer === q.correctAnswer) {
          correctCount++;
        } else {
          wrongCount++;
        }
      }
    });

    const attemptedCount = Object.keys(selectedAnswers).length;
    const unattempted = Math.max(0, questions.length - attemptedCount);
    // Standard competitive exam scoring: +1.0 for correct, -0.25 penalty for wrong
    const rawScore = correctCount * 1.0 - wrongCount * 0.25;
    const score = Math.max(0, parseFloat(rawScore.toFixed(2)));
    const totalMarks = test.totalMarks || (questions.length * 1) || 100;
    const accuracy = attemptedCount > 0 ? Math.round((correctCount / attemptedCount) * 100) : 0;
    const percentage = totalMarks > 0 ? Math.round((score / totalMarks) * 100) : 0;

    const resultData = {
      id: `attempt_${Date.now()}`,
      studentId,
      testId: test.id,
      testTitle: test.title,
      subject: test.subject,
      totalQuestions: questions.length,
      answeredCount: attemptedCount,
      correctCount,
      wrongCount,
      unattempted,
      score,
      totalMarks,
      accuracy,
      percentage,
      timeSpent,
      violations: violationsCount,
      terminated: violationTerminated,
      selectedAnswers,
      submittedAt: new Date().toISOString()
    };

    // Record attempt persistently
    db.recordAttempt(resultData);

    return res.status(200).json({
      success: true,
      message: "Test submitted and evaluated successfully",
      data: resultData
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const getMockTestResult = (req, res) => {
  try {
    const { id } = req.params;
    const { studentId } = req.query;
    const attempt = db.getAttemptByTest(id, studentId);

    if (!attempt) {
      // If no recorded attempt, return a fallback template
      const test = db.getMockTestById(id);
      if (!test) return res.status(404).json({ success: false, message: "Test not found" });

      return res.json({
        success: true,
        data: {
          testId: test.id,
          testTitle: test.title,
          totalQuestions: test.questions?.length || 10,
          correctCount: 8,
          wrongCount: 2,
          unattempted: 0,
          score: 7.5,
          totalMarks: test.totalMarks || 100,
          timeSpent: 3840,
          violations: 0,
          terminated: false,
          submittedAt: new Date().toISOString()
        }
      });
    }

    return res.json({ success: true, data: attempt });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const createMockTest = (req, res) => {
  try {
    const payload = req.body;
    if (!payload.title || !payload.questions || !payload.questions.length) {
      return res.status(400).json({ success: false, message: "Test title and questions are required" });
    }

    const testId = `test_${Date.now()}`;
    const newTest = {
      id: testId,
      slug: payload.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      title: payload.title,
      subject: payload.subject || "General",
      duration: parseInt(payload.duration) || 120,
      totalMarks: payload.questions.reduce((sum, q) => sum + (q.marks || 1), 0),
      totalQuestions: payload.questions.length,
      summary: payload.summary || "Faculty constructed mock test paper.",
      instructions: [
        `Duration: ${payload.duration || 120} minutes.`,
        "CBT Proctored exam room. Maintain tab focus.",
        "Marks will be calculated with standard negative marking."
      ],
      sections: payload.sections || [
        { id: "sec_1", name: payload.subject || "General", questionsCount: payload.questions.length }
      ],
      questions: payload.questions,
      batch: payload.batch || "All Students",
      createdBy: payload.createdBy || "tch_1",
      submissions: 0,
      avgScore: "Pending",
      violationsDetected: 0,
      publishedAt: new Date().toISOString()
    };

    const saved = db.addMockTest(newTest);
    return res.status(201).json({
      success: true,
      message: "Mock test paper published successfully",
      data: saved
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const getStudentHistory = (req, res) => {
  try {
    const { studentId } = req.params;
    const history = db.getAttempts(studentId);
    return res.json({ success: true, count: history.length, data: history });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
