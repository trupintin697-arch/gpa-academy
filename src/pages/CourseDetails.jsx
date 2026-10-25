import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { submitEnrollment } from '@/api/apiClient';
import { Star, Users, Clock, Award, BookOpen, Download, Play, Lock, ChevronDown, ShoppingCart, ArrowLeft, CheckCircle2, } from 'lucide-react';
import { mockCourses, mockUsers } from '@/data/mock-data';
export default function CourseDetailsPage({ params }) {
    const router = useRouter();
    const { user } = useAuth();
    const [expandedModule, setExpandedModule] = useState('module_1');
    const [selectedLesson, setSelectedLesson] = useState(null);
    const [isEnrolled, setIsEnrolled] = useState(false);
    const [isEnrolling, setIsEnrolling] = useState(false);
    const resolvedParams = params ?? null;
    const slug = resolvedParams?.slug || 'sbi-po-prelims-mastery';
    // Get course from mock data by slug (or fallback to first course)
    const course = mockCourses.find((c) => c.slug === slug) || mockCourses[0];
    const instructor = mockUsers.find((u) => u.id === course?.instructorId) || mockUsers[1] || {
        name: "Dr. Rajesh Kumar",
        title: "Senior Faculty, Quantitative Aptitude & Speed Maths",
        avatar: "/gpa-logo-clean.png",
    };
    useEffect(() => {
        if (!course)
            return;
        try {
            const stored = localStorage.getItem("gpa_enrolled_courses");
            if (stored) {
                const list = JSON.parse(stored);
                if (list.includes(course.id) || list.includes(course.slug)) {
                    setIsEnrolled(true);
                }
            }
        }
        catch { }
    }, [course]);
    const handleEnroll = async () => {
        if (!course)
            return;
        setIsEnrolling(true);
        try {
            const studentId = user?.email || user?.id || "student@gpaacademy.in";
            await submitEnrollment(studentId, course.id);
            const stored = localStorage.getItem("gpa_enrolled_courses");
            const list = stored ? JSON.parse(stored) : ["course_sbi_po_2026", "course_ssc_cgl_chsl"];
            if (!list.includes(course.id)) {
                list.push(course.id);
                localStorage.setItem("gpa_enrolled_courses", JSON.stringify(list));
            }
            setIsEnrolled(true);
        }
        catch (e) {
            console.error(e);
        }
        finally {
            setIsEnrolling(false);
        }
    };
    if (!course || !instructor) {
        return (<div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-100 mb-4">Course not found</h1>
          <Link href="/courses" className="text-purple-400 hover:text-purple-300">
            ← Back to Courses
          </Link>
        </div>
      </div>);
    }
    // Generate mock lessons for this course
    const courseLessons = Array.from({ length: Math.min(12, course.lessons) }, (_, i) => ({
        id: `lesson_${i + 1}`,
        title: `Module ${Math.floor(i / 4) + 1}: Lesson ${(i % 4) + 1}`,
        duration: 30 + Math.random() * 40,
        isFree: i < 2,
        order: i + 1,
    }));
    // Group lessons into modules
    const modules = Array.from({ length: Math.ceil(courseLessons.length / 4) }, (_, i) => ({
        id: `module_${i + 1}`,
        title: `Module ${i + 1}`,
        lessons: courseLessons.slice(i * 4, (i + 1) * 4),
    }));
    const originalPrice = course.originalPrice ?? course.price;
    const discountPercent = course.originalPrice && course.originalPrice > course.price
        ? Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)
        : 0;
    const categoryColors = {
        BANKING: 'from-blue-500/20 to-blue-600/20',
        SSC: 'from-purple-500/20 to-purple-600/20',
        RAILWAY: 'from-orange-500/20 to-orange-600/20',
        UPSC_CSAT: 'from-pink-500/20 to-pink-600/20',
    };
    const categoryEmoji = {
        BANKING: '🏦',
        SSC: '📊',
        RAILWAY: '🚂',
        UPSC_CSAT: '🎓',
    };
    return (<div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Background gradient animation */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Back Button */}
      <div className="sticky top-0 z-40 bg-slate-900/80 backdrop-blur-xl border-b border-slate-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/courses" className="inline-flex items-center gap-2 text-slate-400 hover:text-slate-200 transition-colors">
            <ArrowLeft size={20}/>
            Back to Courses
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Course Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* Course Banner */}
            <div className={`bg-gradient-to-br ${categoryColors[course.category]} border border-slate-700/50 rounded-xl overflow-hidden backdrop-blur-xl h-96`}>
              <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-8xl mb-4">{categoryEmoji[course.category]}</div>
                  <h1 className="text-4xl font-bold text-slate-100">{course.title}</h1>
                </div>
              </div>
            </div>

            {/* Course Meta */}
            <div className="flex flex-wrap gap-6 items-center">
              <div className="flex items-center gap-2">
                <Star className="text-yellow-400 fill-yellow-400" size={20}/>
                <span className="text-lg font-semibold text-slate-100">{course.rating}</span>
                <span className="text-slate-400">({course.totalRatings.toLocaleString()} reviews)</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <Users size={20}/>
                <span>{course.lessons} lessons</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <Clock size={20}/>
                <span>{course.duration}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <Award size={20}/>
                <span>{course.level}</span>
              </div>
            </div>

            {/* Instructor Info */}
            <div className="bg-slate-900/40 border border-slate-700/50 rounded-xl p-6 backdrop-blur-xl">
              <h3 className="text-lg font-semibold text-slate-100 mb-4">Instructor</h3>
              <div className="flex items-center gap-4">
                <img src={instructor.profileImage || "/default-avatar.png"} alt={instructor.name} className="w-16 h-16 rounded-full border-2 border-purple-500/50"/>
                <div>
                  <h4 className="text-lg font-semibold text-slate-100">{instructor.name}</h4>
                  <p className="text-slate-400">{instructor.role}</p>
                  <p className="text-sm text-slate-500 mt-1">{instructor.email}</p>
                </div>
              </div>
            </div>

            {/* Course Description */}
            <div className="bg-slate-900/40 border border-slate-700/50 rounded-xl p-6 backdrop-blur-xl">
              <h3 className="text-lg font-semibold text-slate-100 mb-4">About this course</h3>
              <p className="text-slate-300 leading-relaxed mb-6">{course.description}</p>

              <div>
                <h4 className="text-base font-semibold text-slate-100 mb-4">What you'll learn:</h4>
                <ul className="space-y-3">
                  {course.highlights.map((highlight, idx) => (<li key={idx} className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-purple-500 mt-2 flex-shrink-0"></div>
                      <span className="text-slate-300">{highlight}</span>
                    </li>))}
                </ul>
              </div>
            </div>

            {/* Curriculum */}
            <div className="bg-slate-900/40 border border-slate-700/50 rounded-xl backdrop-blur-xl overflow-hidden">
              <div className="p-6 border-b border-slate-700/50">
                <h3 className="text-lg font-semibold text-slate-100">Curriculum</h3>
              </div>

              <div className="divide-y divide-slate-700/50">
                {modules.map((module) => (<div key={module.id}>
                    <button onClick={() => setExpandedModule(expandedModule === module.id ? null : module.id)} className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-800/50 transition-colors group">
                      <div className="flex items-center gap-3">
                        <ChevronDown size={20} className={`text-slate-400 transition-transform ${expandedModule === module.id ? 'rotate-180' : ''}`}/>
                        <span className="font-semibold text-slate-100">{module.title}</span>
                        <span className="text-sm text-slate-400">
                          {module.lessons.length} lessons
                        </span>
                      </div>
                      <span className="text-sm text-slate-400">
                        {module.lessons.reduce((sum, lesson) => sum + Math.round(lesson.duration), 0)} min
                      </span>
                    </button>

                    {expandedModule === module.id && (<div className="bg-slate-800/30">
                        {module.lessons.map((lesson, idx) => (<button key={lesson.id} onClick={() => setSelectedLesson(lesson.id)} className={`w-full px-12 py-3 flex items-center justify-between text-left hover:bg-slate-800/50 transition-colors border-t border-slate-700/30 ${selectedLesson === lesson.id ? 'bg-purple-500/20' : ''}`}>
                            <div className="flex items-center gap-3 flex-1">
                              {lesson.isFree ? (<Play size={16} className="text-emerald-400 flex-shrink-0"/>) : (<Lock size={16} className="text-slate-500 flex-shrink-0"/>)}
                              <span className="text-slate-300 text-sm">{lesson.title}</span>
                              {lesson.isFree && (<span className="text-xs px-2 py-1 bg-emerald-500/20 text-emerald-300 rounded-full">
                                  Preview
                                </span>)}
                            </div>
                            <span className="text-xs text-slate-500">
                              {Math.round(lesson.duration)} min
                            </span>
                          </button>))}
                      </div>)}
                  </div>))}
              </div>
            </div>

            {/* Course Highlights */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-900/40 border border-slate-700/50 rounded-xl p-4 backdrop-blur-xl flex items-start gap-3">
                <BookOpen className="text-purple-400 flex-shrink-0 mt-1" size={20}/>
                <div>
                  <h4 className="font-semibold text-slate-100">Full Course Access</h4>
                  <p className="text-sm text-slate-400">Lifetime access to all course materials</p>
                </div>
              </div>
              <div className="bg-slate-900/40 border border-slate-700/50 rounded-xl p-4 backdrop-blur-xl flex items-start gap-3">
                <Download className="text-purple-400 flex-shrink-0 mt-1" size={20}/>
                <div>
                  <h4 className="font-semibold text-slate-100">Downloadable Resources</h4>
                  <p className="text-sm text-slate-400">PDFs, notes, and practice materials</p>
                </div>
              </div>
              <div className="bg-slate-900/40 border border-slate-700/50 rounded-xl p-4 backdrop-blur-xl flex items-start gap-3">
                <Award className="text-purple-400 flex-shrink-0 mt-1" size={20}/>
                <div>
                  <h4 className="font-semibold text-slate-100">Certificate</h4>
                  <p className="text-sm text-slate-400">Receive certificate upon completion</p>
                </div>
              </div>
              <div className="bg-slate-900/40 border border-slate-700/50 rounded-xl p-4 backdrop-blur-xl flex items-start gap-3">
                <Star className="text-purple-400 flex-shrink-0 mt-1" size={20}/>
                <div>
                  <h4 className="font-semibold text-slate-100">Expert Support</h4>
                  <p className="text-sm text-slate-400">Get help from instructors and peers</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="lg:col-span-1">
            {/* Sticky Price Card */}
            <div className="sticky top-24 bg-slate-900/40 border border-slate-700/50 rounded-xl p-6 backdrop-blur-xl space-y-6">
              {/* Price */}
              <div>
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="text-4xl font-bold text-slate-100">
                    ₹{(course.price / 100).toFixed(0)}
                  </span>
                  <span className="text-lg text-slate-500 line-through">
                    ₹{(originalPrice / 100).toFixed(0)}
                  </span>
                </div>
                <div className="inline-block px-3 py-1 bg-emerald-500/20 text-emerald-300 text-sm font-semibold rounded-full">
                  {discountPercent}% OFF
                </div>
              </div>

              {/* Highlights */}
              <div className="space-y-3 pt-6 border-t border-slate-700/50">
                <div className="flex items-center gap-3">
                  <BookOpen size={18} className="text-purple-400"/>
                  <span className="text-sm text-slate-300">{course.lessons} Lessons</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock size={18} className="text-purple-400"/>
                  <span className="text-sm text-slate-300">{course.duration}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Award size={18} className="text-purple-400"/>
                  <span className="text-sm text-slate-300">Certificate</span>
                </div>
                <div className="flex items-center gap-3">
                  <Users size={18} className="text-purple-400"/>
                  <span className="text-sm text-slate-300">{course.totalRatings.toLocaleString()} Students</span>
                </div>
              </div>

              {/* Buy / Enroll Button */}
              {isEnrolled ? (<Link href={`/courses/${course.slug}/learn`} className="w-full py-3.5 px-6 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30">
                  <CheckCircle2 size={18}/>
                  Enrolled • Continue Learning
                </Link>) : (<button type="button" onClick={handleEnroll} disabled={isEnrolling} className="w-full py-3.5 px-6 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white font-bold rounded-2xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-red-600/30 hover:scale-[1.02]">
                  <Play size={18}/>
                  {isEnrolling ? "Enrolling..." : "Enroll Now & Start Learning"}
                </button>)}

              {/* Free Preview Button */}
              <Link href={`/courses/${course.slug}/learn`} className="w-full py-3 px-6 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-slate-200 font-bold rounded-2xl transition-all duration-200 flex items-center justify-center gap-2">
                Preview Video Lectures
              </Link>

              {/* Info Box */}
              <div className="bg-slate-800/30 border border-slate-700/50 rounded-lg p-4 text-xs text-slate-400">
                <p>💡 <span className="text-slate-300">30-day money-back guarantee</span> if you&apos;re not satisfied.</p>
              </div>
            </div>

            {/* Free Preview Section */}
            <div className="mt-6 bg-slate-900/40 border border-slate-700/50 rounded-xl p-6 backdrop-blur-xl">
              <h3 className="text-lg font-semibold text-slate-100 mb-4">Free Preview</h3>
              <div className="space-y-3">
                {courseLessons
            .filter((lesson) => lesson.isFree)
            .map((lesson) => (<button key={lesson.id} className="w-full px-4 py-3 bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 rounded-lg transition-colors text-left">
                      <div className="flex items-center gap-3">
                        <Play size={16} className="text-emerald-400 flex-shrink-0"/>
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-slate-200 truncate">{lesson.title}</p>
                          <p className="text-xs text-slate-500">{Math.round(lesson.duration)} min</p>
                        </div>
                      </div>
                    </button>))}
              </div>
              <p className="text-xs text-slate-400 mt-4">
                ✨ Learn the fundamentals before committing. No credit card required.
              </p>
            </div>

            {/* Course Features */}
            <div className="mt-6 bg-slate-900/40 border border-slate-700/50 rounded-xl p-6 backdrop-blur-xl">
              <h3 className="text-lg font-semibold text-slate-100 mb-4">Course Level</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Level</span>
                  <span className="px-3 py-1 bg-purple-500/20 text-purple-300 text-xs font-semibold rounded-full">
                    {course.level}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Rating</span>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (<Star key={i} size={14} className={i < Math.floor(course.rating)
                ? 'text-yellow-400 fill-yellow-400'
                : 'text-slate-600'}/>))}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Students</span>
                  <span className="text-slate-200 font-medium">{course.totalRatings.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="border-t border-slate-700/50 bg-slate-900/40 backdrop-blur-xl sticky bottom-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between flex-wrap gap-4">
          <div>
            <p className="text-slate-300">
              <span className="font-bold text-slate-100">₹{(course.price / 100).toFixed(0)}</span>
              <span className="text-slate-500 line-through ml-2">₹{(originalPrice / 100).toFixed(0)}</span>
            </p>
          </div>
          {isEnrolled ? (<Link href={`/courses/${course.slug}/learn`} className="px-8 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg transition-all duration-200 flex items-center gap-2">
              <CheckCircle2 size={18}/>
              Continue Learning
            </Link>) : (<button type="button" onClick={handleEnroll} disabled={isEnrolling} className="px-8 py-2 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white font-bold rounded-lg transition-all duration-200 flex items-center gap-2">
              <ShoppingCart size={18}/>
              {isEnrolling ? "Enrolling..." : "Enroll Now"}
            </button>)}
        </div>
      </div>
    </div>);
}
