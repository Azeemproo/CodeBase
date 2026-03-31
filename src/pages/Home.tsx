import {Link} from 'react-router-dom';



export default function Home() {
  return (
    <main className="min-h-screen bg-[#1a1a1a] text-gray-200 pt-20 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Side: Welcome & Problem List */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[#282828] p-8 rounded-xl border border-gray-800 shadow-xl">
            <h1 className="text-4xl font-bold text-white mb-4">Welcome to CodeBase</h1>
            <p className="text-gray-400 text-lg">Level up your coding skills with our daily challenges.</p>
            <Link to="/problemset">
            <button className="mt-6 bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-semibold transition">
                Start Coding
           </button>
        </Link>

          </div>

          {/* Problem Table Mockup */}
          <div className="bg-[#282828] rounded-xl border border-gray-800 overflow-hidden">
            <div className="p-4 border-b border-gray-800 font-semibold text-gray-400 grid grid-cols-4">
              <span>Title</span>
              <span>Solution</span>
              <span>Acceptance</span>
              <span>Difficulty</span>
            </div>
            {/* Example Row */}
            <div className="p-4 hover:bg-[#323232] cursor-pointer grid grid-cols-4 border-b border-gray-800/50 transition">
              <span className="text-white">1. Two Sum</span>
              <span className="text-blue-400">View</span>
              <span>49.5%</span>
              <span className="text-green-500 font-medium">Easy</span>
            </div>
            <div className="p-4 hover:bg-[#323232] cursor-pointer grid grid-cols-4 border-b border-gray-800/50 transition">
              <span className="text-white">2. Add Two Numbers</span>
              <span className="text-blue-400">View</span>
              <span>41.2%</span>
              <span className="text-yellow-500 font-medium">Medium</span>
            </div>
          </div>
        </div>

        {/* Right Side: Stats & Calendar */}
        <div className="space-y-6">
          <div className="bg-[#282828] p-6 rounded-xl border border-gray-800">
            <h3 className="text-lg font-semibold text-white mb-4">Session Stats</h3>
            <div className="flex justify-between items-center">
              <div className="text-center">
                <p className="text-3xl font-bold text-orange-500">12</p>
                <p className="text-xs text-gray-500 uppercase">Solved</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-blue-500">156</p>
                <p className="text-xs text-gray-500 uppercase">Points</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-green-500">3</p>
                <p className="text-xs text-gray-500 uppercase">Streak</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-indigo-600 to-purple-700 p-6 rounded-xl text-white shadow-lg">
            <h3 className="font-bold">Premium</h3>
            <p className="text-sm opacity-90 mt-2">Get access to exclusive content and company-specific questions.</p>
            <button className="mt-4 w-full bg-white text-indigo-600 py-2 rounded-lg font-bold text-sm">
              Upgrade Now
            </button>
          </div>
        </div>

      </div>
    </main>
  );
}
