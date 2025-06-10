import StatsOverview from "./StatsOverview";
import MarketTrends from "./MarketTrends";
import RecentActivity from "./MarketTrends";

const DashboardOverview = () => {
  return (
    <>
      {/* Stats overview */}
      <div className="mb-8">
        <StatsOverview />
      </div>
      <div className="space-y-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Chart</h2>
            <div className="flex space-x-2">
              <button className="text-sm text-gray-500 hover:text-green-600 flex items-center">
                <span className="mr-1">This Week</span>
              </button>
              <button className="text-sm text-gray-500 hover:text-green-600 flex items-center">
                <span className="mr-1">This Month</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-lg p-5 border border-gray-100">
              <h3 className="text-lg font-medium text-gray-800 mb-4">
                Performance Summary
              </h3>
              <p className="text-gray-600">
                Monitor your sales performance, inventory status, and market
                trends all in one place. 
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-5 border border-gray-100">
              <h3 className="text-lg font-medium text-gray-800 mb-4">
                Quick Actions
              </h3>
              <div className="flex flex-wrap gap-3">
                <button className="py-2 px-4 bg-white border border-gray-200 rounded-lg text-sm hover:bg-gray-50 transition-colors">
                  View Orders
                </button>
                <button className="py-2 px-4 bg-white border border-gray-200 rounded-lg text-sm hover:bg-gray-50 transition-colors">
                  Market Report
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Market Trends
          </h3>
          <MarketTrends />
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Recent Activity
          </h3>
          <RecentActivity />
        </div>
      </div>
    </>
  );
};

export default DashboardOverview;
