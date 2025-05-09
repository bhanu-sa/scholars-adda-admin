import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from './store/authStore';
import { getCurrentUser } from './services/api';
import AssessmentManagement from './pages/AssessmentManagement';


const Dashboard = () => {
  const navigate = useNavigate();
  const { logout, setUser, user } = useAuthStore();
  const [activeMenu, setActiveMenu] = useState('assessments');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getCurrentUser();
        setUser(userData);
      } catch (error) {
        console.error('Failed to fetch user data:', error);
        logout();
        navigate('/', { replace: true });
      }
    };

    fetchUser();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/', { replace: true });
  };

  const menuItems = [
    { id: 'users', label: 'User Management' },
    { id: 'assessments', label: 'Assessment Management' },
  ];

  const renderContent = () => {
    switch (activeMenu) {
      case 'assessments':
        return <AssessmentManagement />;
      case 'users':
        return <div>User Management Content</div>;
      default:
        return <div>Select a menu item</div>;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-4 border-b">
          <img src="/src/assets/sa-name.svg" alt="Scholars Adda" className="h-8" />
        </div>
        <nav className="mt-4">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveMenu(item.id)}
              className={`flex items-center w-full px-4 py-2 text-gray-700 ${
                activeMenu === item.id
                  ? 'bg-orange-50 text-orange-600'
                  : 'hover:bg-orange-50 hover:text-orange-600'
              }`}
            >
              <span>{item.label}</span>
            </button>
          ))}
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-2 mt-4 text-red-600 hover:bg-red-50"
          >
            <span>Logout</span>
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <header className="bg-white shadow flex items-center justify-between px-6 py-4">
          <div>
            <p className="text-gray-600">admin: {user?.email || 'Loading...'}</p>
          </div>
          <div className="flex items-center space-x-4 ">
            <input
              type="text"
              placeholder="Search..."
              className="border rounded px-3 py-1 text-sm focus:outline-none focus:ring focus:border-blue-300"
            />
            <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-white">
              {user?.email?.[0]?.toUpperCase() || 'U'}
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;