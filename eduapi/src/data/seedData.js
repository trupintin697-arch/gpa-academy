// @ts-nocheck
export const CourseLevel = { BEGINNER: "BEGINNER", INTERMEDIATE: "INTERMEDIATE", ADVANCED: "ADVANCED" };
export const ExamCategory = { BANKING: "BANKING", SSC: "SSC", RAILWAYS: "RAILWAYS", UPSC_CSAT: "UPSC_CSAT", CAMPUS_PLACEMENT: "CAMPUS_PLACEMENT", VEDIC_MATHS: "VEDIC_MATHS" };
export const avatarUrl = (seed) => `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(seed || "gpa")}`;
export const GPA_YOUTUBE_CHANNEL = "https://www.youtube.com/@gpa-gyanpraptiacademy";
// Mock Users
export const mockUsers = [
    {
        id: "std_1",
        email: "student@gpaacademy.in",
        name: "Ritika Singh",
        role: "student",
        profileImage: avatarUrl("Ritika"),
        phone: "+91-9876543210",
    },
    {
        id: "tch_1",
        email: "faculty@gpaacademy.in",
        name: "Dr. Rajesh Kumar",
        role: "teacher",
        profileImage: avatarUrl("Rajesh"),
        phone: "+91-9876543212",
    },
    {
        id: "adm_1",
        email: "admin@gpaacademy.in",
        name: "Principal Administrator",
        role: "admin",
        profileImage: avatarUrl("Admin"),
        phone: "+91-9876543200",
    },
];
// Gyan Prapti Academy YouTube Integrated Courses
export const mockCourses = [
    {
        id: "course_1",
        slug: "vedic-maths-speed-tricks",
        title: "Vedic Maths & Speed Calculation Mastery",
        description: "Master lightning-fast mental calculations, multiplication shortcuts, square roots, and percentage approximations by Gyan Prapti Academy.",
        category: ExamCategory.BANKING,
        level: CourseLevel.BEGINNER,
        price: 99900,
        originalPrice: 199900,
        duration: "6 Weeks (24 Lectures)",
        rating: 4.9,
        totalRatings: 1840,
        lessons: 8,
        tests: 4,
        highlights: ["Speed multiplication tricks", "Fast square roots & cube roots", "Mental percentage shortcuts", "GPA official formula book"],
        instructorId: "tch_1",
        isPublished: true,
        youtubePlaylistId: "vedic-maths-gpa",
        youtubeEmbedId: "dQw4w9WgXcQ", // fallback standard embed
        videos: [
            { id: "v1", title: "Part 01: Number System & Speed Calculations", duration: "48:15", youtubeUrl: "https://www.youtube.com/watch?v=P6ift-kfenw", isFree: true },
            { id: "v2", title: "Part 02: Divisibility Rules & Remainder Theorem", duration: "52:10", youtubeUrl: "https://www.youtube.com/watch?v=jO9u6wUj5mc", isFree: true },
            { id: "v3", title: "Part 04: Remainder Theorem Advanced Concepts", duration: "44:30", youtubeUrl: "https://www.youtube.com/watch?v=flraIS-NFOU", isFree: false },
            { id: "v4", title: "Part 08: Unit Digit Masterclass & Tricks", duration: "55:10", youtubeUrl: "https://www.youtube.com/watch?v=Eb81148glqM", isFree: false },
        ],
    },
    {
        id: "course_2",
        slug: "quantitative-aptitude-foundation",
        title: "Quantitative Aptitude for Banking & SSC CGL",
        description: "Complete numerical ability coverage: Number Systems, Ratio & Proportion, Profit & Loss, Simple & Compound Interest, Time & Work.",
        category: ExamCategory.SSC,
        level: CourseLevel.INTERMEDIATE,
        price: 149900,
        originalPrice: 299900,
        duration: "10 Weeks (40 Lectures)",
        rating: 4.95,
        totalRatings: 2310,
        lessons: 10,
        tests: 6,
        highlights: ["Complete formula breakdown", "1500+ Practice MCQs", "Live doubt clearing sessions", "Sectional speed drills"],
        instructorId: "tch_1",
        isPublished: true,
        youtubePlaylistId: "PL0T9gBG-ITZOhE2yi1GE9FI1giJv-GsD7",
        youtubeEmbedId: "H8sIPNW3waQ",
        videos: [
            { id: "v1", title: "Part 01: Profit, Loss & Discount Foundation", duration: "46:10", youtubeUrl: "https://www.youtube.com/watch?v=H8sIPNW3waQ", isFree: true },
            { id: "v2", title: "Part 02: Profit & Loss Dishonest Dealer Tricks", duration: "43:50", youtubeUrl: "https://www.youtube.com/watch?v=eKqgsyqXzVk", isFree: true },
            { id: "v3", title: "Part 03: Percentage to Fraction Conversions", duration: "44:15", youtubeUrl: "https://www.youtube.com/watch?v=HPnFw5MiLfU", isFree: false },
            { id: "v4", title: "Part 04: Income, Expenditure & Discount Practice", duration: "49:40", youtubeUrl: "https://www.youtube.com/watch?v=9zFNvh8qBMs", isFree: false },
        ],
    },
    {
        id: "course_3",
        slug: "logical-reasoning-pro",
        title: "Logical Reasoning & Analytical Puzzles",
        description: "Crack complex floor puzzles, seating arrangements, syllogisms, blood relations, and coding-decoding for competitive exams.",
        category: ExamCategory.RAILWAY,
        level: CourseLevel.INTERMEDIATE,
        price: 129900,
        originalPrice: 249900,
        duration: "8 Weeks (32 Lectures)",
        rating: 4.85,
        totalRatings: 1420,
        lessons: 8,
        tests: 5,
        highlights: ["High level floor & box puzzles", "Only A Few syllogism rules", "Input-output step shortcuts", "Visual reasoning sheets"],
        instructorId: "tch_1",
        isPublished: true,
        youtubePlaylistId: "PL0T9gBG-ITZMrfjhCOpM0fYfxuIseD7ZG",
        youtubeEmbedId: "JuqHVu19U1A",
        videos: [
            { id: "v1", title: "Part 03: Syllogisms Core Concepts & Venn Diagrams", duration: "42:30", youtubeUrl: "https://www.youtube.com/watch?v=JuqHVu19U1A", isFree: true },
            { id: "v2", title: "Part 05: Syllogisms Possibility & 'Only A Few' Cases", duration: "48:15", youtubeUrl: "https://www.youtube.com/watch?v=fldl5Wd4pho", isFree: true },
            { id: "v3", title: "Placement 2021: Mixture & Alligation Solved", duration: "38:00", youtubeUrl: "https://www.youtube.com/watch?v=jEVKWocx2XE", isFree: false },
            { id: "v4", title: "Placement 2021: Profit & Loss Speed Tricks", duration: "42:30", youtubeUrl: "https://www.youtube.com/watch?v=HMPeuxqAbRM", isFree: false },
        ],
    },
    {
        id: "course_4",
        slug: "upsc-csat-paper2-accelerator",
        title: "UPSC CSAT Paper-II Comprehensive Strategy",
        description: "Targeted 80+ marks roadmap for UPSC Prelims Paper 2 covering Reading Comprehension, Decision Making, Quant & Analytical Reasoning.",
        category: ExamCategory.CSAT,
        level: CourseLevel.ADVANCED,
        price: 199900,
        originalPrice: 399900,
        duration: "12 Weeks (48 Lectures)",
        rating: 4.92,
        totalRatings: 870,
        lessons: 12,
        tests: 8,
        highlights: ["PYQ Analysis (2014-2024)", "Reading Comprehension critical tone guide", "Time-saving elimination methods", "Proctored full-length mocks"],
        instructorId: "tch_1",
        isPublished: true,
        youtubePlaylistId: "upsc-csat-gpa",
        youtubeEmbedId: "dQw4w9WgXcQ",
        videos: [
            { id: "v1", title: "Lec 01: CSAT Syllabus Breakdown & Minimum Qualifying Strategy", duration: "48:00", youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", isFree: true },
            { id: "v2", title: "Lec 02: Reading Comprehension - Inference vs Assumption", duration: "44:30", youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", isFree: true },
            { id: "v3", title: "Lec 03: Permutation & Combination without Complex Formulas", duration: "52:10", youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", isFree: false },
        ],
    },
];
export const premiumCourses = mockCourses;
// Detailed Testbook-Grade Online Proctored Mock Tests
export const mockTestsData = [
    {
        id: "test_1",
        slug: "sbi-po-prelims-live-mock",
        title: "SBI PO Prelims Full Mock Test 01",
        subject: "Banking & Insurance",
        duration: 120, // 120 minutes as requested
        totalMarks: 100,
        totalQuestions: 10,
        price: 19900,
        formattedPrice: "₹199",
        summary: "Simulated 120-minute CBT proctored test with Quantitative, Reasoning, and English sectional pattern.",
        instructions: [
            "Total duration is 120 minutes (2 Hours).",
            "Camera proctoring is ACTIVE. Live webcam preview is required.",
            "Leaving fullscreen, switching tabs, or minimizing the window will trigger anti-cheating warnings and terminate your test.",
            "Each correct answer awards +1 mark; incorrect answers deduct -0.25 marks.",
        ],
        sections: [
            { id: "sec_quant", name: "Quantitative Aptitude", questionsCount: 4 },
            { id: "sec_reasoning", name: "Reasoning Ability", questionsCount: 3 },
            { id: "sec_english", name: "English Language", questionsCount: 3 },
        ],
        questions: [
            {
                id: 1,
                sectionId: "sec_quant",
                sectionName: "Quantitative Aptitude",
                question: "A train running at a speed of 72 km/h crosses a 200 m long platform in 22 seconds. What is the length of the train?",
                options: [
                    "A) 240 meters",
                    "B) 220 meters",
                    "C) 200 meters",
                    "D) 180 meters"
                ],
                correctAnswer: 0,
                explanation: "Speed in m/s = 72 * (5/18) = 20 m/s. Total distance in 22 s = 20 * 22 = 440 m. Length of train = Total distance - Platform length = 440 - 200 = 240 meters."
            },
            {
                id: 2,
                sectionId: "sec_quant",
                sectionName: "Quantitative Aptitude",
                question: "If a sum of money doubles itself at simple interest in 8 years, what is the annual rate of interest?",
                options: [
                    "A) 10.5%",
                    "B) 12.5%",
                    "C) 14%",
                    "D) 15%"
                ],
                correctAnswer: 1,
                explanation: "Let Principal = P. Amount = 2P => Simple Interest (SI) = P. SI = (P * R * T) / 100 => P = (P * R * 8) / 100 => R = 100 / 8 = 12.5% per annum."
            },
            {
                id: 3,
                sectionId: "sec_quant",
                sectionName: "Quantitative Aptitude",
                question: "A shopkeeper marks an article 40% above the cost price and allows a discount of 20% on the marked price. Find his profit percentage.",
                options: [
                    "A) 12%",
                    "B) 15%",
                    "C) 18%",
                    "D) 20%"
                ],
                correctAnswer: 0,
                explanation: "Let CP = 100. MP = 140. SP = 140 * 0.80 = 112. Profit = SP - CP = 112 - 100 = 12%."
            },
            {
                id: 4,
                sectionId: "sec_quant",
                sectionName: "Quantitative Aptitude",
                question: "Vedic Math Shortcut: What is the square of 105 using Ekadhikena Purvena?",
                options: [
                    "A) 11025",
                    "B) 11225",
                    "C) 10525",
                    "D) 11050"
                ],
                correctAnswer: 0,
                explanation: "For numbers ending in 5: Left part = 10 * (10 + 1) = 110. Right part = 5^2 = 25. Result = 11025."
            },
            {
                id: 5,
                sectionId: "sec_reasoning",
                sectionName: "Reasoning Ability",
                question: "In a certain code language, 'EXAM' is coded as 'FYBN'. How is 'SUCCESS' coded in that language?",
                options: [
                    "A) TVDDFTT",
                    "B) TVDDFFT",
                    "C) TVDDFST",
                    "D) TVDDETT"
                ],
                correctAnswer: 0,
                explanation: "Each letter is shifted forward by +1: S->T, U->V, C->D, C->D, E->F, S->T, S->T. So code is TVDDFTT."
            },
            {
                id: 6,
                sectionId: "sec_reasoning",
                sectionName: "Reasoning Ability",
                question: "Statements: All bags are books. Some books are pens. Conclusions: I. Some bags are pens. II. Some pens are books.",
                options: [
                    "A) Only conclusion I follows",
                    "B) Only conclusion II follows",
                    "C) Both I and II follow",
                    "D) Neither follows"
                ],
                correctAnswer: 1,
                explanation: "Some books are pens directly implies Some pens are books (Conclusion II follows). Bags and pens do not overlap necessarily."
            },
            {
                id: 7,
                sectionId: "sec_reasoning",
                sectionName: "Reasoning Ability",
                question: "Pointing to a man in a photograph, a woman said, 'His mother is the only daughter of my mother.' How is the woman related to the man?",
                options: [
                    "A) Sister",
                    "B) Aunt",
                    "C) Mother",
                    "D) Grandmother"
                ],
                correctAnswer: 2,
                explanation: "The only daughter of the woman's mother is the woman herself. Therefore, she is the mother of the man in the photograph."
            },
            {
                id: 8,
                sectionId: "sec_english",
                sectionName: "English Language",
                question: "Identify the word that is most nearly OPPOSITE in meaning to 'METICULOUS':",
                options: [
                    "A) Scrupulous",
                    "B) Careless",
                    "C) Punctual",
                    "D) Diligent"
                ],
                correctAnswer: 1,
                explanation: "'Meticulous' means showing great attention to detail; very careful and precise. Its opposite is 'Careless'."
            },
            {
                id: 9,
                sectionId: "sec_english",
                sectionName: "English Language",
                question: "Choose the grammatically correct sentence:",
                options: [
                    "A) Neither the teacher nor the students was present in the hall.",
                    "B) Neither the teacher nor the students were present in the hall.",
                    "C) Neither the teacher nor the students is present in the hall.",
                    "D) Neither the teacher or the students was present in the hall."
                ],
                correctAnswer: 1,
                explanation: "When subjects are joined by 'neither...nor', the verb agrees with the closer subject. 'Students' is plural, so 'were' is correct."
            },
            {
                id: 10,
                sectionId: "sec_english",
                sectionName: "English Language",
                question: "Select the correctly spelt word:",
                options: [
                    "A) Embarrasment",
                    "B) Embarrassment",
                    "C) Embarasment",
                    "D) Embarassment"
                ],
                correctAnswer: 1,
                explanation: "The correct spelling is 'Embarrassment' (double 'r' and double 's')."
            },
        ]
    },
    {
        id: "test_2",
        slug: "ssc-cgl-tier1-all-india-live",
        title: "SSC CGL Tier-1 All India Speed Mock",
        subject: "SSC Combined Graduate Level",
        duration: 120,
        totalMarks: 200,
        totalQuestions: 10,
        price: 14900,
        formattedPrice: "₹149",
        summary: "High-yield mock test curated with latest TCS exam interface, AI webcam proctoring, and timer.",
        instructions: [
            "Duration: 120 minutes (2 Hours).",
            "Proctoring enabled: Tab switching and minimizing window will auto-submit exam.",
            "+2 marks for correct answer, -0.5 marks for negative answer.",
        ],
        sections: [
            { id: "sec_quant", name: "Quantitative Aptitude", questionsCount: 4 },
            { id: "sec_reasoning", name: "General Intelligence & Reasoning", questionsCount: 3 },
            { id: "sec_english", name: "English Language", questionsCount: 3 },
        ],
        questions: [
            {
                id: 1,
                sectionId: "sec_quant",
                sectionName: "Quantitative Aptitude",
                question: "If x + 1/x = 5, find the value of x^2 + 1/x^2:",
                options: ["A) 23", "B) 25", "C) 27", "D) 21"],
                correctAnswer: 0,
                explanation: "x^2 + 1/x^2 = (x + 1/x)^2 - 2 = 5^2 - 2 = 25 - 2 = 23."
            },
            {
                id: 2,
                sectionId: "sec_quant",
                sectionName: "Quantitative Aptitude",
                question: "A can finish a work in 12 days and B in 18 days. Working together, how many days will they take?",
                options: ["A) 7.2 days", "B) 6.5 days", "C) 8 days", "D) 9 days"],
                correctAnswer: 0,
                explanation: "Combined rate = (1/12) + (1/18) = (3 + 2)/36 = 5/36. Days required = 36/5 = 7.2 days."
            },
            {
                id: 3,
                sectionId: "sec_quant",
                sectionName: "Quantitative Aptitude",
                question: "The average of 7 consecutive numbers is 20. The largest of these numbers is:",
                options: ["A) 23", "B) 24", "C) 22", "D) 20"],
                correctAnswer: 0,
                explanation: "In an odd number of consecutive integers, the average is the middle number. Middle (4th) = 20. Numbers: 17, 18, 19, 20, 21, 22, 23. Largest = 23."
            },
            {
                id: 4,
                sectionId: "sec_quant",
                sectionName: "Quantitative Aptitude",
                question: "What is the value of sin^2(30°) + cos^2(30°)?",
                options: ["A) 0", "B) 1", "C) 0.5", "D) 2"],
                correctAnswer: 1,
                explanation: "By standard trigonometric identity, sin^2(θ) + cos^2(θ) = 1 for any angle θ."
            },
            {
                id: 5,
                sectionId: "sec_reasoning",
                sectionName: "General Intelligence & Reasoning",
                question: "Find the odd one out: 64, 125, 216, 343, 512, 729, 1000, 1331, 1728",
                options: ["A) 64", "B) 729", "C) 1000", "D) All are perfect cubes"],
                correctAnswer: 3,
                explanation: "All the given numbers are perfect cubes: 4^3, 5^3, 6^3, 7^3, 8^3, 9^3, 10^3, 11^3, 12^3."
            },
            {
                id: 6,
                sectionId: "sec_reasoning",
                sectionName: "General Intelligence & Reasoning",
                question: "If 1st January 2024 was Monday, what day was 31st December 2024? (2024 is a leap year)",
                options: ["A) Monday", "B) Tuesday", "C) Wednesday", "D) Sunday"],
                correctAnswer: 1,
                explanation: "A leap year has 366 days (52 weeks + 2 odd days). Thus the year ends on the next day of the week it started. Starts Monday => Ends Tuesday."
            },
            {
                id: 7,
                sectionId: "sec_reasoning",
                sectionName: "General Intelligence & Reasoning",
                question: "Complete the series: 3, 7, 15, 31, 63, ?",
                options: ["A) 127", "B) 125", "C) 129", "D) 131"],
                correctAnswer: 0,
                explanation: "Pattern: *2 + 1. (3*2+1=7, 7*2+1=15, 15*2+1=31, 31*2+1=63, 63*2+1 = 127)."
            },
            {
                id: 8,
                sectionId: "sec_english",
                sectionName: "English Language",
                question: "Select the synonym of 'CANDID':",
                options: ["A) Frank", "B) Deceptive", "C) Secretive", "D) Arrogant"],
                correctAnswer: 0,
                explanation: "'Candid' means truthful and straightforward; frank."
            },
            {
                id: 9,
                sectionId: "sec_english",
                sectionName: "English Language",
                question: "Fill in the blank: The meeting has been _______ until next Monday.",
                options: ["A) put out", "B) put off", "C) put on", "D) put away"],
                correctAnswer: 1,
                explanation: "'Put off' means to postpone or delay."
            },
            {
                id: 10,
                sectionId: "sec_english",
                sectionName: "English Language",
                question: "One word substitution: 'A person who looks at the bright side of things':",
                options: ["A) Pessimist", "B) Optimist", "C) Altruist", "D) Pacifist"],
                correctAnswer: 1,
                explanation: "An 'Optimist' is a person who tends to be hopeful and confident about the future."
            },
        ]
    },
    {
        id: "test_3",
        slug: "upsc-csat-paper2-grand-mock",
        title: "UPSC CSAT Paper-II Grand Practice Test",
        subject: "Civil Services Aptitude Test",
        duration: 120,
        totalMarks: 200,
        totalQuestions: 10,
        price: 24900,
        formattedPrice: "₹249",
        summary: "Simulate actual UPSC CSAT 120-min paper with negative marking and webcam integrity supervision.",
        instructions: [
            "Duration: 120 minutes.",
            "Proctored: Web camera and anti-tab switch detection active.",
            "Passing benchmark: 33% (66 marks out of 200).",
        ],
        sections: [
            { id: "sec_quant", name: "Basic Numeracy", questionsCount: 4 },
            { id: "sec_reasoning", name: "Analytical Ability", questionsCount: 3 },
            { id: "sec_english", name: "Reading Comprehension", questionsCount: 3 },
        ],
        questions: [
            {
                id: 1,
                sectionId: "sec_quant",
                sectionName: "Basic Numeracy",
                question: "How many numbers between 100 and 1000 have the digit 7 in the unit place?",
                options: ["A) 90", "B) 80", "C) 100", "D) 99"],
                correctAnswer: 0,
                explanation: "The hundreds place has 9 choices (1-9), tens place has 10 choices (0-9), unit place is fixed (7). Total = 9 * 10 * 1 = 90."
            },
            {
                id: 2,
                sectionId: "sec_quant",
                sectionName: "Basic Numeracy",
                question: "What is the remainder when (7^105) is divided by 10?",
                options: ["A) 7", "B) 9", "C) 3", "D) 1"],
                correctAnswer: 0,
                explanation: "Cyclicity of powers of 7: 7^1=7, 7^2=9, 7^3=3, 7^4=1 (cycle of 4). 105 mod 4 = 1. Therefore unit digit and remainder is 7."
            },
            {
                id: 3,
                sectionId: "sec_quant",
                sectionName: "Basic Numeracy",
                question: "A clock gains 5 minutes in 24 hours. If set right on Sunday 12 noon, what will it show on Tuesday 12 noon?",
                options: ["A) 12:10 PM", "B) 12:05 PM", "C) 12:15 PM", "D) 12:20 PM"],
                correctAnswer: 0,
                explanation: "Time elapsed = 48 hours = 2 days. Gain in 48 hours = 2 * 5 = 10 minutes. Time shown = 12:10 PM."
            },
            {
                id: 4,
                sectionId: "sec_quant",
                sectionName: "Basic Numeracy",
                question: "In how many ways can 5 books be arranged on a shelf if 2 specific books must always be together?",
                options: ["A) 48", "B) 24", "C) 120", "D) 72"],
                correctAnswer: 0,
                explanation: "Tie the 2 books together as 1 unit. Total units to arrange = 4! = 24. The 2 books can swap places in 2! = 2 ways. Total = 24 * 2 = 48."
            },
            {
                id: 5,
                sectionId: "sec_reasoning",
                sectionName: "Analytical Ability",
                question: "Six persons A, B, C, D, E, F are sitting in a row. B is between F and D. E is between A and C. A does not stand next to F or D. C does not stand next to D. F is next to which person?",
                options: ["A) B", "B) E", "C) C", "D) D"],
                correctAnswer: 0,
                explanation: "Arrangement: C - E - A - F - B - D. F is between A and B."
            },
            {
                id: 6,
                sectionId: "sec_reasoning",
                sectionName: "Analytical Ability",
                question: "If '+' means '*', '-' means '/', '*' means '+' and '/' means '-', what is the value of: 20 + 5 * 10 - 2 / 5?",
                options: ["A) 100", "B) 105", "C) 95", "D) 110"],
                correctAnswer: 0,
                explanation: "Replacing operators: 20 * 5 + 10 / 2 - 5 = 100 + 5 - 5 = 100."
            },
            {
                id: 7,
                sectionId: "sec_reasoning",
                sectionName: "Analytical Ability",
                question: "A man walks 5 km North, turns right and walks 3 km, turns right and walks 5 km. In which direction is he from his starting point?",
                options: ["A) East", "B) West", "C) North", "D) South"],
                correctAnswer: 0,
                explanation: "5 km North, 3 km East, 5 km South brings him 3 km directly East of his starting position."
            },
            {
                id: 8,
                sectionId: "sec_english",
                sectionName: "Reading Comprehension",
                question: "Read the passage snippet: 'True education must produce self-reliance, moral conviction and courage.' What is the author's primary emphasis?",
                options: [
                    "A) Rote learning of formulas",
                    "B) Character building and independence",
                    "C) Securing high salary packages",
                    "D) Memorization of historical dates"
                ],
                correctAnswer: 1,
                explanation: "Self-reliance and moral conviction denote character building and personal independence."
            },
            {
                id: 9,
                sectionId: "sec_english",
                sectionName: "Reading Comprehension",
                question: "Select the antonym for 'EPHEMERAL':",
                options: ["A) Transient", "B) Eternal", "C) Fleeting", "D) Short-lived"],
                correctAnswer: 1,
                explanation: "'Ephemeral' means lasting for a very short time. Its antonym is 'Eternal'."
            },
            {
                id: 10,
                sectionId: "sec_english",
                sectionName: "Reading Comprehension",
                question: "Choose the correct idiom meaning: 'To burn the midnight oil'",
                options: [
                    "A) To waste fuel",
                    "B) To work or study late into the night",
                    "C) To create pollution",
                    "D) To set things on fire"
                ],
                correctAnswer: 1,
                explanation: "'To burn the midnight oil' means to study or work until late at night."
            },
        ]
    }
];
export const mockMockTests = mockTestsData;
export const mockTests = mockTestsData.map((test) => ({
    id: test.id,
    title: test.title,
    subject: test.subject,
    duration: `${test.duration} mins`,
    price: test.formattedPrice,
    summary: test.summary,
    questionsCount: test.totalQuestions,
    marks: test.totalMarks,
}));
// Official Gyan Prapti Academy YouTube Playlists (Direct from @gpa-gyanpraptiacademy)
export const gpaPlaylists = [
    {
        id: "pl_aptitude",
        title: "Aptitude - Number System (संख्या पद्धति)",
        hindiTitle: "संख्या पद्धति (Number System) Basic to Best Concepts",
        category: "Aptitude",
        type: "VIDEO",
        format: "VIDEO",
        videoCount: 12,
        badge: "12 Videos",
        description: "Complete Number System series: Introduction, Divisibility Rules, Remainder Theorem, and Unit Digits by GPA Mentors.",
        tagline: "LIVE 08:00 PM • Basic to Advance",
        sharedBy: {
            name: "Dr. Rajesh Kumar",
            initial: "R",
            avatarBg: "bg-red-600",
        },
        playlistId: "PL0T9gBG-ITZMmy7GPz2-Kmostciv4dePw",
        youtubeEmbedId: "P6ift-kfenw",
        youtubeUrl: "https://www.youtube.com/embed/P6ift-kfenw",
        thumbnailUrl: "https://i.ytimg.com/vi/P6ift-kfenw/hqdefault.jpg",
        lectures: [
            { id: "apt_1", title: "Part-01: Introduction with Number System", duration: "48:15", videoId: "P6ift-kfenw" },
            { id: "apt_2", title: "Part-02: Test of Divisibility Rules", duration: "52:10", videoId: "jO9u6wUj5mc" },
            { id: "apt_3", title: "Part-04: Remainder Theorem Session 1", duration: "44:30", videoId: "flraIS-NFOU" },
            { id: "apt_4", title: "Part-05: Remainder Theorem Session 2", duration: "41:20", videoId: "m1nXlowSrIo" },
            { id: "apt_5", title: "Part-06: Remainder Theorem Session 3", duration: "46:50", videoId: "vCrwO6-pD24" },
            { id: "apt_6", title: "Part-07: Remainder Theorem Session 4", duration: "39:40", videoId: "LvO6-9VQE44" },
            { id: "apt_7", title: "Part-08: Unit Digit Masterclass", duration: "55:10", videoId: "Eb81148glqM" },
        ],
    },
    {
        id: "pl_reasoning",
        title: "Logical Reasoning - Syllogism (न्यायसंगत तर्क)",
        hindiTitle: "न्यायसंगत तर्क (Syllogism) Basic to Best Concepts",
        category: "Logical Reasoning",
        type: "VIDEO",
        format: "VIDEO",
        videoCount: 4,
        badge: "4 Videos",
        description: "100% Short Tricks for Syllogism: Venn diagram rules, 'Only a few', and possibility cases by GPA Mentors.",
        tagline: "LIVE 06:45 PM • 100% New Tricks",
        sharedBy: {
            name: "Prof. Ankit Verma",
            initial: "A",
            avatarBg: "bg-blue-600",
        },
        playlistId: "PL0T9gBG-ITZMrfjhCOpM0fYfxuIseD7ZG",
        youtubeEmbedId: "JuqHVu19U1A",
        youtubeUrl: "https://www.youtube.com/embed/JuqHVu19U1A",
        thumbnailUrl: "https://i.ytimg.com/vi/JuqHVu19U1A/hqdefault.jpg",
        lectures: [
            { id: "rea_1", title: "Part-03: Syllogism Session & Concepts", duration: "42:30", videoId: "JuqHVu19U1A" },
            { id: "rea_2", title: "Part-05: Syllogism Advanced Practice", duration: "48:15", videoId: "fldl5Wd4pho" },
        ],
    },
    {
        id: "pl_profit_loss",
        title: "Profit, Loss & Discount (लाभ, हानि और बट्टा)",
        hindiTitle: "लाभ, हानि और बट्टा (Arithmetic Series)",
        category: "Aptitude",
        type: "VIDEO",
        format: "VIDEO",
        videoCount: 3,
        badge: "3 Videos",
        description: "Master Cost Price, Selling Price, Marked Price, and successive discount arithmetic tricks with GPA.",
        tagline: "LIVE 09:00 PM • Basic to Best Concepts",
        sharedBy: {
            name: "Dr. Rajesh Kumar",
            initial: "R",
            avatarBg: "bg-red-600",
        },
        playlistId: "PL0T9gBG-ITZOhE2yi1GE9FI1giJv-GsD7",
        youtubeEmbedId: "H8sIPNW3waQ",
        youtubeUrl: "https://www.youtube.com/embed/H8sIPNW3waQ",
        thumbnailUrl: "https://i.ytimg.com/vi/H8sIPNW3waQ/hqdefault.jpg",
        lectures: [
            { id: "pl_1", title: "Part-01: Profit, Loss & Discount Foundation", duration: "46:10", videoId: "H8sIPNW3waQ" },
            { id: "pl_2", title: "Part-02: Dishonest Dealer & Discount Formulae", duration: "43:50", videoId: "eKqgsyqXzVk" },
            { id: "pl_3", title: "Part-03: Advanced Practice & Solved MCQs", duration: "50:20", videoId: "17ZrzxiteHg" },
        ],
    },
    {
        id: "pl_percentage",
        title: "Percentage (प्रतिशत) Basic to Advance",
        hindiTitle: "प्रतिशत (Percentage) Arithmetic Session",
        category: "Aptitude",
        type: "VIDEO",
        format: "VIDEO",
        videoCount: 2,
        badge: "2 Videos",
        description: "Percentage fraction conversions, price-consumption formula, and population calculation shortcuts.",
        tagline: "LIVE 08:00 PM • Basic to Advance",
        sharedBy: {
            name: "Dr. Rajesh Kumar",
            initial: "R",
            avatarBg: "bg-red-600",
        },
        playlistId: "PL0T9gBG-ITZNjJJlkeeLaonBUwNgKWgYW",
        youtubeEmbedId: "HPnFw5MiLfU",
        youtubeUrl: "https://www.youtube.com/embed/HPnFw5MiLfU",
        thumbnailUrl: "https://i.ytimg.com/vi/HPnFw5MiLfU/hqdefault.jpg",
        lectures: [
            { id: "per_1", title: "Part-01: Fraction to Percentage Conversion", duration: "44:15", videoId: "HPnFw5MiLfU" },
            { id: "per_2", title: "Part-02: Income & Expenditure Problems", duration: "49:40", videoId: "9zFNvh8qBMs" },
        ],
    },
    {
        id: "pl_placement",
        title: "Placement Questions 2021 (TCS & Infosys)",
        hindiTitle: "Key Priority of Success (Placement Solved Papers)",
        category: "Placement",
        type: "VIDEO",
        format: "VIDEO",
        videoCount: 4,
        badge: "4 Videos",
        description: "Campus placement quantitative aptitude, mixture & alligation, and profit-loss previous year papers.",
        tagline: "TCS & Infosys Questions Solved",
        sharedBy: {
            name: "Er. Vikram Patel",
            initial: "V",
            avatarBg: "bg-amber-600",
        },
        playlistId: "PL0T9gBG-ITZM-UeSASw7UhNtQSQnzNOAx",
        youtubeEmbedId: "jEVKWocx2XE",
        youtubeUrl: "https://www.youtube.com/embed/jEVKWocx2XE",
        thumbnailUrl: "https://i.ytimg.com/vi/jEVKWocx2XE/hqdefault.jpg",
        lectures: [
            { id: "plc_1", title: "Placement 2021: Mixture and Alligation", duration: "38:00", videoId: "jEVKWocx2XE" },
            { id: "plc_2", title: "Placement 2021: Profit and Loss Problems", duration: "42:30", videoId: "HMPeuxqAbRM" },
        ],
    },
    {
        id: "pl_motivation",
        title: "Journey from Failure to Success (GPA Series)",
        hindiTitle: "Aspirant Motivation & Strategy Sessions",
        category: "Strategy & Motivation",
        type: "VIDEO",
        format: "VIDEO",
        videoCount: 6,
        badge: "6 Videos",
        description: "Exam strategy, mental fortitude, and preparation roadmap for banking and SSC aspirants by GPA Mentors.",
        tagline: "GPA Exclusive Guidance",
        sharedBy: {
            name: "GPA Mentors Council",
            initial: "G",
            avatarBg: "bg-purple-600",
        },
        playlistId: "PL0T9gBG-ITZN-24FU2TPbAsd2_I-qxiOD",
        youtubeEmbedId: "NJuPEnBRasY",
        youtubeUrl: "https://www.youtube.com/embed/NJuPEnBRasY",
        thumbnailUrl: "https://i.ytimg.com/vi/NJuPEnBRasY/hqdefault.jpg",
        lectures: [
            { id: "mot_1", title: "Episode 18: Journey from Failure to Success", duration: "25:30", videoId: "NJuPEnBRasY" },
            { id: "mot_2", title: "Episode 17: Staying Consistent during Exam Prep", duration: "28:15", videoId: "uWyNoIsFiOg" },
            { id: "mot_3", title: "Episode 16: Overcoming Anxiety & Exam Fear", duration: "31:00", videoId: "G6_IFOzNvFY" },
            { id: "mot_4", title: "Episode 15: Time Management & Daily Routine", duration: "22:45", videoId: "BdlI4ZxWL9I" },
        ],
    },
];
// E-Library & Study Notes Data (Matching Reference UI with PDF, Video, Audio, Doc, Link)
export const mockNotes = [
    ...gpaPlaylists,
    {
        id: "note_pdf_1",
        title: "Vedic Maths Quick Calculation & Mental Shortcuts",
        type: "PDF",
        format: "PDF",
        subject: "Quantitative Aptitude",
        size: "2.4 MB",
        downloads: "14.2K",
        downloadLink: "/free-notes/vedic-maths.pdf",
        description: "Complete 16 Vedic Sutras and sub-sutras with fast multiplication, square roots, and division shortcuts for competitive exams.",
        sharedBy: {
            name: "Dr. Rajesh Kumar",
            initial: "R",
            avatarBg: "bg-red-500",
        },
    },
    {
        id: "note_doc_1",
        title: "UPSC CSAT Reasoning & Analogy Short Notes",
        type: "DOC",
        format: "DOC",
        subject: "CSAT Paper II",
        size: "1.8 MB",
        downloads: "8.7K",
        downloadLink: "/free-notes/csat-reasoning.pdf",
        description: "High-yield formulas for Permutations, Combinations, Probability, Syllogisms, and Logical Deduction rules.",
        sharedBy: {
            name: "Dr. Sarah Mitchell",
            initial: "S",
            avatarBg: "bg-emerald-500",
        },
    },
    {
        id: "note_audio_1",
        title: "Banking & SSC English Grammar Golden Rules",
        type: "AUDIO",
        format: "AUDIO",
        subject: "English Language",
        duration: "28 Mins",
        downloadLink: "/free-notes/english-grammar.pdf",
        description: "Audio lecture breaking down 120 essential grammar rules for spotting errors, sentence improvement, and cloze tests.",
        sharedBy: {
            name: "Elena Rodri",
            initial: "E",
            avatarBg: "bg-purple-500",
        },
    },
    {
        id: "note_link_1",
        title: "Gyan Prapti Academy Official YouTube Video Archive",
        type: "LINK",
        format: "LINK",
        subject: "Video Library",
        url: GPA_YOUTUBE_CHANNEL,
        description: "Direct portal link to official Gyan Prapti Academy YouTube channel playlists, live sessions, and solved question sets.",
        sharedBy: {
            name: "GPA Academic Council",
            initial: "G",
            avatarBg: "bg-amber-500",
        },
    },
];
export const freeNotes = mockNotes;
// Homepage and Dashboard Static Data
export const homepageStats = [
    { value: "15K+", label: "Active Learners" },
    { value: "120+", label: "GPA YouTube Lectures" },
    { value: "98%", label: "Exam Success Rate" },
    { value: "45K+", label: "Mock Tests Attempted" },
];
export const examCategories = [
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
export const testimonials = [
    {
        quote: "Gyan Prapti Academy's Vedic Maths speed calculation techniques saved me 15 vital minutes in the SBI PO prelims exam!",
        name: "Ananya Singh",
        role: "SBI PO 2024 Selectee",
    },
    {
        quote: "The proctored mock tests feel exactly like the actual TCS exam hall. The instant scorecard is a game-changer.",
        name: "Vikram Patel",
        role: "SSC CGL 2024 Top Ranker",
    },
    {
        quote: "Dr. Rajesh Kumar's CSAT aptitude series on YouTube gave me the conceptual clarity I needed to clear UPSC Prelims.",
        name: "Neha Reddy",
        role: "UPSC CSE Aspirant",
    },
];
export const faqItems = [
    {
        question: "How does the proctored mock test work?",
        answer: "Our Testbook-style test room includes a 120-minute timer, live camera preview, fullscreen mode, and auto-submit anti-cheating detection if you switch tabs or minimize the window.",
    },
    {
        question: "Can teachers assign YouTube video lectures to students?",
        answer: "Yes! Faculty members have their own dedicated dashboard to assign specific YouTube video lectures from the GPA channel and create custom MCQ tests.",
    },
    {
        question: "Are the courses linked to the official Gyan Prapti Academy YouTube channel?",
        answer: "Yes, our video lessons are integrated with playlists from @gpa-gyanpraptiacademy, enriched with downloadable PDF notes and sectional practice drills.",
    },
];
// Student Enrolled Data
export const studentDashboardCourses = [
    {
        title: "Vedic Maths & Speed Calculation Mastery",
        slug: "vedic-maths-speed-tricks",
        progress: 75,
        nextLesson: "Lec 03: Instant Square Root Shortcuts",
        totalLessons: 8,
        youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
    {
        title: "Quantitative Aptitude for Banking & SSC CGL",
        slug: "quantitative-aptitude-foundation",
        progress: 45,
        nextLesson: "Lec 02: Percentages & Effective Rate Formulae",
        totalLessons: 10,
        youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
    {
        title: "UPSC CSAT Paper-II Comprehensive Strategy",
        slug: "upsc-csat-paper2-accelerator",
        progress: 30,
        nextLesson: "Lec 02: Reading Comprehension - Inference vs Assumption",
        totalLessons: 12,
        youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
];
// Teacher Assigned Items
export const teacherAssignedTests = [
    {
        id: "test_1",
        title: "SBI PO Prelims Full Mock Test 01",
        duration: "120 Mins",
        assignedTo: "Batch A - 2024",
        submissions: 34,
        avgScore: "74.5/100",
        violationsDetected: 2,
    },
    {
        id: "test_2",
        title: "SSC CGL Tier-1 All India Speed Mock",
        duration: "120 Mins",
        assignedTo: "SSC Super 50",
        submissions: 48,
        avgScore: "142/200",
        violationsDetected: 0,
    },
];
export const teacherAssignedVideos = [
    {
        id: "vid_1",
        title: "Vedic Math: 3-Digit Multiplication in 5 Seconds",
        channel: "Gyan Prapti Academy",
        youtubeUrl: "https://www.youtube.com/@gpa-gyanpraptiacademy",
        batch: "All Banking Aspirants",
        views: 124,
    },
    {
        id: "vid_2",
        title: "CSAT 2024 Strategy & Syllabus Analysis",
        channel: "Gyan Prapti Academy",
        youtubeUrl: "https://www.youtube.com/@gpa-gyanpraptiacademy",
        batch: "UPSC CSAT Batch",
        views: 89,
    },
];
export const adminStudents = [
    { id: "1", name: "Ritika Singh", email: "ritika@gpaacademy.in", enrolled: 3, status: "Active" },
    { id: "2", name: "Vikram Patel", email: "vikram@gpaacademy.in", enrolled: 2, status: "Active" },
    { id: "3", name: "Ananya Reddy", email: "ananya@gpaacademy.in", enrolled: 1, status: "Inactive" },
];
export const analyticsStats = [
    { label: "Total Enrollments", value: "3,427" },
    { label: "Revenue", value: "₹34,27,000" },
    { label: "Avg Course Rating", value: "4.8" },
    { label: "Active Learners", value: "1,834" },
];
export const getCourseBySlug = (slug) => mockCourses.find((c) => c.slug === slug);


export const defaultMarqueeItems = [
  { title: "BANKING (SBI & IBPS PO)", badge: "LIVE" },
  { title: "SSC CGL / CHSL 2026", badge: "HOT" },
  { title: "RAILWAY RRB NTPC", badge: "TRENDING" },
  { title: "UPSC CSAT (PAPER 2)", badge: "ADVANCED" },
  { title: "CAMPUS PLACEMENT 2026", badge: "NEW" },
  { title: "VEDIC SPEED MATHS", badge: "100% TRICKS" },
  { title: "TOPIC-WISE MOCK TESTS", badge: "120 MIN CBT" },
];

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
