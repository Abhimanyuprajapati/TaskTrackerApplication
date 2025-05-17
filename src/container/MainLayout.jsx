import { useState } from 'react';
import { Menu, X, Home, LogOut, BarChart2, Settings, HelpCircle } from 'lucide-react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserCircle } from 'lucide-react';

export default function MainLayout () {
 
  const { profilePic } = useAuth();
     const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);    

    const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  }; 

    const handleRedireact = () =>{
    navigate('/project');
  }
    const handleLogout = () => {
    sessionStorage.removeItem('token');
    window.location.href = '/login';
  }
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
  <SidebarLink icon={<Home size={20} />} label="Home" to="/" />
  <SidebarLink icon={<BarChart2 size={20} />} label="Project" to="/project" />
  <SidebarLink icon={<Settings size={20} />} label="Settings" to="/settings" />
  <SidebarLink icon={<HelpCircle size={20} />} label="Help" to="/help" />
   <SidebarLink 
    icon={<LogOut size={20} />} 
    label="Logout" 
    customClick={handleLogout}
  />
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
    <div className="h-8 w-8 rounded-full overflow-hidden">
      {profilePic ? (
        <img
          src={profilePic}
          alt="Profile"
          className="h-full w-full object-cover"
        />
      ) : (
        <UserCircle className="text-gray-400 w-full h-full" />
      )}
    </div>
          </div>
        </header>
        
         {/* Page content injected here */}
        <main className="flex-1 overflow-auto p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

function SidebarLink({ icon, label, to, customClick }) {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = location.pathname === to;

  const handleClick = (e) => {
    e.preventDefault();
    if (customClick) {
      customClick(); // Call custom logic for logout
    } else {
      navigate(to);  // Default behavior for regular links
    }
  };

  return (
    <a 
      href={to || '#'} 
      onClick={handleClick}
      className={`flex items-center px-4 py-2 mt-1 text-sm rounded-md 
        ${isActive ? 'bg-gray-700 text-white' : 'hover:bg-gray-700 text-gray-300'}`}
    >
      <span className="mr-3">{icon}</span>
      <span>{label}</span>
    </a>
  );
}
