import { useState } from 'react';
import { Menu, X, Home, LogOut, BarChart2, Settings, HelpCircle } from 'lucide-react';

// Dashboard component
export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // const { data, isLoading, isError } = useQuery(['tasks'], fetchTasks);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  }

  // if (isLoading) return <p>Loading...</p>;
  // if (isError) return <p>Error loading tasks</p>;

  return (
    <div className="flex h-screen bg-gray-100 w-full">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
          onClick={toggleSidebar}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-30 w-64 bg-gray-800 text-white transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
        lg:translate-x-0 lg:static lg:z-0
      `}>
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-700">
          <div className="text-xl font-bold">Dashboard</div>
          <button 
            className="p-1 rounded-md lg:hidden hover:bg-gray-700"
            onClick={toggleSidebar}
          >
            <X size={24} />
          </button>
        </div>
        
        <nav className="mt-5 px-2">
          <SidebarLink icon={<Home size={20} />} label="Home" active />
          <SidebarLink icon={<BarChart2 size={20} />} label="Project" />
          <SidebarLink icon={<Settings size={20} />} label="Settings" />
          <SidebarLink icon={<HelpCircle size={20} />} label="Help" />
          <SidebarLink icon={<LogOut size={20} />} label="Logout"  onClick={handleLogout}/>
        </nav>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="bg-white shadow-sm z-10">
          <div className="h-16 px-4 flex items-center justify-between">
            <button 
              className="p-1 rounded-md lg:hidden hover:bg-gray-200"
              onClick={toggleSidebar}
            >
              <Menu size={24} />
            </button>
            <div className="text-lg font-medium">TaskTracker Application</div>
            {/* <div className="h-8 w-8 rounded-full bg-gray-300">
              {/* User Avatar Placeholder
        
            </div> */}
          </div>
        </header>
        
        {/* Dashboard Content */}
        <main className="flex-1 overflow-auto p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            <DashboardCard title="Total Project" value="8" color="bg-blue-500" />
            <DashboardCard title="Revenue" value="$15,670" color="bg-green-500" />
            <DashboardCard title="Pending" value="24%" color="bg-purple-500" />
          </div>
          
          <div className="bg-white rounded-lg shadow p-4 mb-4">
            <h2 className="text-lg font-medium mb-4">Recent Activity</h2>
            <div className="space-y-3">
              <ActivityItem 
                title="New user registered"
                time="2 minutes ago"
                description="John Smith created a new account"
              />
              <ActivityItem 
                title="Sales report generated"
                time="1 hour ago"
                description="Weekly sales report was automatically generated"
              />
              <ActivityItem 
                title="Server maintenance"
                time="5 hours ago"
                description="Server maintenance completed successfully"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="bg-white rounded-lg shadow p-4">
              <h2 className="text-lg font-medium mb-4">Project</h2>
              <p className="text-gray-600">Sample chart or data visualization would go here.</p>
              <div className="h-48 bg-gray-100 mt-4 rounded flex items-center justify-center">
                Chart placeholder
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-4">
              <h2 className="text-lg font-medium mb-4">Notifications</h2>
              <div className="space-y-3">
                <NotificationItem 
                  title="Project Update"
                  description="New project is available for Client A"
                  type="info"
                />
                {/* <NotificationItem 
                  title="Disk Space Low"
                  description="Server running low on available disk space"
                  type="warning"
                />
                <NotificationItem 
                  title="New Feature Available"
                  description="Check out the new reporting dashboard"
                  type="success"
                /> */}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

// Helper Components
function SidebarLink({ icon, label, active = false, onClick }) {
  return (
    <a 
      href="#" 
      onClick={onClick}
      className={`
        flex items-center px-4 py-2 mt-1 text-sm rounded-md 
        ${active ? 'bg-gray-700' : 'hover:bg-gray-700'}
      `}
    >
      <span className="mr-3">{icon}</span>
      <span>{label}</span>
    </a>
  );
}

function DashboardCard({ title, value, color }) {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className={`${color} h-2`}></div>
      <div className="p-4">
        <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  );
}

function ActivityItem({ title, time, description }) {
  return (
    <div className="border-b border-gray-100 pb-2">
      <div className="flex justify-between">
        <h4 className="text-sm font-medium">{title}</h4>
        <span className="text-xs text-gray-500">{time}</span>
      </div>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
}

function NotificationItem({ title, description, type }) {
  const colors = {
    info: "border-blue-500 bg-blue-50",
    warning: "border-yellow-500 bg-yellow-50",
    success: "border-green-500 bg-green-50",
    error: "border-red-500 bg-red-50"
  };
  
  return (
    <div className={`border-l-4 p-3 rounded ${colors[type]}`}>
      <h4 className="text-sm font-medium">{title}</h4>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
}