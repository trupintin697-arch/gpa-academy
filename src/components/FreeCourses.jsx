export default function FreeCourses() {
    return (<section className="max-w-7xl mx-auto py-24">

      <h2 className="text-4xl font-bold mb-12">
        Free Courses
      </h2>

      <div className="grid md:grid-cols-3 gap-8">

        {[1, 2, 3].map((course) => (<div key={course} className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden">
            <div className="h-48 bg-slate-800"></div>

            <div className="p-6">
              <h3 className="font-bold text-xl">
                Free Course {course}
              </h3>

              <button className="mt-4 bg-green-600 px-4 py-2 rounded-lg">
                Watch Free
              </button>
            </div>
          </div>))}

      </div>
    </section>);
}
