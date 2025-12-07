export default function InternalJobPostings() {
  const jobPostings = [
    {
      id: 1,
      title: 'Senior Product Manager',
      department: 'Product Development',
      location: 'Tokyo, Japan',
      type: 'Full-time',
      deadline: '2025.01.31',
      icon: 'ri-briefcase-line',
    },
    {
      id: 2,
      title: 'HR Business Partner',
      department: 'Human Resources',
      location: 'Kawasaki, Japan',
      type: 'Full-time',
      deadline: '2025.02.15',
      icon: 'ri-user-star-line',
    },
    {
      id: 3,
      title: 'Data Analyst',
      department: 'IT & Analytics',
      location: 'Tokyo, Japan',
      type: 'Full-time',
      deadline: '2025.02.28',
      icon: 'ri-bar-chart-line',
    },
  ];

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 border border-gray-800 shadow-lg sticky top-32">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 flex items-center justify-center bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg">
          <i className="ri-briefcase-4-line text-white text-xl"></i>
        </div>
        <div>
          <h2 className="text-lg font-bold text-white">What's New in Internal Job Postings</h2>
        </div>
      </div>

      <div className="space-y-3">
        {jobPostings.map((job) => (
          <div
            key={job.id}
            className="p-4 bg-gray-800/50 hover:bg-gray-800 rounded-lg border border-gray-700 hover:border-blue-600/50 transition-all duration-300 cursor-pointer group"
          >
            <div className="flex items-start gap-3 mb-3">
              <div className="w-9 h-9 flex items-center justify-center bg-gray-700 group-hover:bg-blue-600/20 rounded-lg transition-all duration-300">
                <i className={`${job.icon} text-gray-400 group-hover:text-blue-500 text-lg`}></i>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-white font-semibold text-sm group-hover:text-blue-500 transition-colors duration-300 mb-1">
                  {job.title}
                </h3>
                <p className="text-xs text-gray-400">{job.department}</p>
              </div>
            </div>
            <div className="space-y-1.5 text-xs text-gray-400">
              <div className="flex items-center gap-2">
                <i className="ri-map-pin-line text-gray-500"></i>
                <span>{job.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <i className="ri-time-line text-gray-500"></i>
                <span>{job.type}</span>
              </div>
              <div className="flex items-center gap-2">
                <i className="ri-calendar-line text-gray-500"></i>
                <span>Deadline: {job.deadline}</span>
              </div>
            </div>
            <button className="mt-3 w-full px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs font-medium transition-all duration-300 cursor-pointer whitespace-nowrap">
              Apply Now
            </button>
          </div>
        ))}
      </div>

      <button className="mt-4 w-full px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white rounded-lg text-sm font-medium transition-all duration-300 cursor-pointer whitespace-nowrap">
        View All Postings
      </button>
    </div>
  );
}
