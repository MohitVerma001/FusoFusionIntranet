export default function WelcomeSection() {
  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 border border-gray-800 shadow-lg">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-red-600 to-red-700 rounded-lg flex-shrink-0">
          <i className="ri-information-line text-white text-2xl"></i>
        </div>
        <div className="flex-1">
          <h2 className="text-xl font-bold text-white mb-3">Welcome to MFTBC & Me HR Intranet</h2>
          <p className="text-gray-300 leading-relaxed mb-4">
            The MFTBC & Me HR Intranet gives you all the information you need to get the most from the service we provide. Click on the sections below to view the topics and information relating to the sections.
          </p>
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium text-sm transition-all duration-300 cursor-pointer whitespace-nowrap flex items-center gap-2">
            <i className="ri-translate-2 text-lg"></i>
            <span>Change to Japanese</span>
          </button>
        </div>
      </div>
    </div>
  );
}
