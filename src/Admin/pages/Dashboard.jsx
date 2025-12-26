const Dashboard = () => {
  return (
    <>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-rose-700">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">
          Welcome back, here’s what’s happening today 🌸
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {[
          { title: "Followers", value: 12, icon: "👥" },
          { title: "Car Decoration", value: 8, icon: "🚗" },
          { title: "Birthday Decoration", value: 15, icon: "🎂" },
          { title: "Total Products", value: 35, icon: "📦" },
        ].map((item, index) => (
          <div
            key={index}
            className="bg-rose-50 rounded-2xl shadow-sm p-6
            hover:shadow-lg transition duration-300 border border-rose-100"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-rose-500 text-sm font-medium">
                  {item.title}
                </h3>
                <p className="text-3xl font-bold text-rose-700 mt-1">
                  {item.value}
                </p>
              </div>
              <span className="text-4xl bg-rose-100 p-3 rounded-full">
                {item.icon}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-2xl shadow-sm p-6 border border-rose-100">
        <h2 className="text-xl font-semibold text-rose-700 mb-5">
          Recent Activity
        </h2>

        <ul className="space-y-4 text-sm text-gray-600">
          <li className="flex items-center gap-3 border-b pb-3">
            <span className="bg-rose-100 text-rose-600 p-2 rounded-full">➕</span>
            <span>New Birthday Decoration Added</span>
          </li>

          <li className="flex items-center gap-3 border-b pb-3">
            <span className="bg-rose-100 text-rose-600 p-2 rounded-full">✏️</span>
            <span>Car Decoration Updated</span>
          </li>

          <li className="flex items-center gap-3">
            <span className="bg-rose-100 text-rose-600 p-2 rounded-full">❌</span>
            <span>Follower Item Deleted</span>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Dashboard;
