import React, { useState } from 'react';
import { AppProvider, useAppContext } from './contexts/AppContext';
import LoginSignup from './components/LoginSignup';
import SignupFlow from './components/SignupFlow';
import EmotionSelector from './components/EmotionSelector';
import Dashboard from './components/Dashboard';
import Health from './components/Health';
import Profile from './components/Profile';
import Network from './components/Network';
import Services from './components/Services';
import Navigation from './components/Navigation';
import Workspace from './components/Workspace';
import ChatAssistant from './components/ChatAssistant';
import HealthUpdateModal from './components/HealthUpdateModal';
import { MessageCircle, LogOut, Briefcase, Plus } from 'lucide-react';

const AppContent = () => {
  const { 
    isAuthenticated, 
    showLogin, 
    showEmotionSelector, 
    user,
    notifications,
    showChat,
    showWorkspace,
    setShowChat,
    setShowWorkspace,
    logout
  } = useAppContext();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showHealthUpdate, setShowHealthUpdate] = useState(false);

  const unreadNotifications = notifications.filter(n => !n.read).length;
  const notificationCount = unreadNotifications;

  if (!isAuthenticated) {
    return showLogin ? <LoginSignup /> : <SignupFlow />;
  }

  if (showEmotionSelector) {
    return <EmotionSelector />;
  }

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'health':
        return <Health />;
      case 'profile':
        return <Profile />;
      case 'network':
        return <Network />;
      case 'services':
        return <Services />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:block">
      <Navigation 
        activeTab={activeTab} 
        onTabChange={setActiveTab}
        notificationCount={unreadNotifications}
      />
      
      <main className="md:ml-64 flex-1 pb-20 md:pb-0 order-2">
        {/* Sticky Toolbar */}
        <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200/50 shadow-sm">
          {/* Desktop Toolbar */}
          <div className="hidden md:block">
            <div className="px-6 py-3">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => setShowHealthUpdate(true)}
                  className="flex-1 flex items-center space-x-3 px-4 py-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-colors group mr-4"
                >
                  <div className="bg-blue-100 p-2 rounded-lg group-hover:bg-blue-200 transition-colors">
                    <Plus className="w-4 h-4 text-blue-600" />
                  </div>
                  <span className="text-gray-700 group-hover:text-gray-900">Add health update...</span>
                </button>

                <div className="flex items-center space-x-2">
                  {/* Workspace Button */}
                  <button
                    onClick={() => setShowWorkspace(true)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    title="Workspace"
                  >
                    <Briefcase className="w-5 h-5 text-gray-600" />
                  </button>

                  {/* Chat Button */}
                  <button
                    onClick={() => setShowChat(true)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    title="Healthcare Assistant"
                  >
                    <MessageCircle className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Toolbar */}
          <div className="md:hidden px-4 py-2">
            <div className="flex items-center justify-between">
              {/* User Button */}
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-medium text-sm">
                    {user?.name?.charAt(0) || 'U'}
                  </span>
                </div>
                {unreadNotifications > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {unreadNotifications > 9 ? '9+' : unreadNotifications}
                  </span>
                )}
              </button>

              <div className="flex items-center space-x-1">
                {/* Workspace Button */}
                <button
                  onClick={() => setShowWorkspace(true)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  title="Workspace"
                >
                  <Briefcase className="w-5 h-5 text-gray-600" />
                </button>
                {/* Chat Button */}
                <button
                  onClick={() => setShowChat(true)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  title="Healthcare Assistant"
                >
                  <MessageCircle className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Mobile User Dropdown */}
            {showUserMenu && (
              <div className="absolute top-full left-4 right-4 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                {/* Notifications Section */}
                <div className="px-4 py-3 border-b border-gray-100">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-900">Notifications</span>
                    {unreadNotifications > 0 && (
                      <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">
                        {unreadNotifications} new
                      </span>
                    )}
                  </div>
                  <div className="max-h-48 overflow-y-auto space-y-2">
                    {unreadNotifications > 0 ? (
                      notifications.filter(n => !n.read).slice(0, 3).map((notification) => (
                        <div key={notification.id} className="p-2 bg-blue-50 rounded-lg">
                          <p className="text-xs font-medium text-gray-900">{notification.title}</p>
                          <p className="text-xs text-gray-600 truncate">{notification.message}</p>
                        </div>
                      ))
                    ) : (
                      <p className="text-xs text-gray-500">No new notifications</p>
                    )}
                  </div>
                  {unreadNotifications > 3 && (
                    <button className="text-xs text-blue-600 hover:text-blue-700 mt-2">
                      View all notifications
                    </button>
                  )}
                </div>

                <button
                  onClick={() => {
                    logout();
                    setShowUserMenu(false);
                  }}
                  className="w-full flex items-center space-x-2 px-4 py-2 text-left hover:bg-gray-50 transition-colors text-red-600"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="text-sm">Sign Out</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {renderActiveTab()}
      </main>

      <ChatAssistant isOpen={showChat} onClose={() => setShowChat(false)} />
      <Workspace isOpen={showWorkspace} onClose={() => setShowWorkspace(false)} />
      <HealthUpdateModal isOpen={showHealthUpdate} onClose={() => setShowHealthUpdate(false)} />
    </div>
  );
};

const App = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

export default App;