const DashboardFooter = () => {
    return (
      <footer className="bg-gray-800 text-neutral-content py-4">
        <div className="container mx-auto px-5 flex flex-col md:flex-row justify-between items-center">
          {/* Logo Section */}
          <div className="flex items-center space-x-3">
            <img src="" className="w-10" alt="" />
            <h2 className="text-lg font-semibold text-white">Earnly Dashboard</h2>
          </div>
  
          {/* Quick Links */}
          <div className="flex space-x-4 mt-3 md:mt-0 text-gray-400 text-sm">
            <a href="/dashboard/overview" className="hover:underline">Overview</a>
            <a href="/dashboard/tasks" className="hover:underline">Tasks</a>
            <a href="/dashboard/earnings" className="hover:underline">Earnings</a>
            <a href="/dashboard/profile" className="hover:underline">Profile</a>
          </div>
  
          {/* Copyright */}
          <p className="text-gray-500 text-xs mt-3 md:mt-0">
            © {new Date().getFullYear()} Earnly. All rights reserved.
          </p>
        </div>
      </footer>
    );
  };
  
  export default DashboardFooter;
  
  