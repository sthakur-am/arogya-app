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
import { MessageCircle, Briefcase, User, Bell, LogOut } from 'lucide-react';

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
      {/* Sticky Toolbar */}
      <div className="sticky top-0 z-50 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        {/* Desktop Toolbar */}
        <div className="hidden md:block">
          <div className="md:ml-64 px-6 py-4">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-bold">Welcome back!</h1>
              <div className="flex items-center space-x-3">
                {/* User Button */}
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="relative p-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg transition-colors"
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-medium text-sm">
                        {user?.name?.charAt(0) || 'U'}
                      </span>
                    </div>
                    {notificationCount > 0 && (
                      <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                        {notificationCount > 9 ? '9+' : notificationCount}
                      </span>
                    )}
                  </button>

                  {/* User Dropdown */}
                  {showUserMenu && (
                    <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                      {/* Notifications Section */}
                      <div className="px-4 py-3 border-b border-gray-100">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-900">Notifications</span>
                          {notificationCount > 0 && (
                            <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">
                              {notificationCount} new
                            </span>
                          )}
                        </div>
                        <div className="max-h-48 overflow-y-auto space-y-2">
                          {unreadNotifications.length > 0 ? (
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

                {/* Chat Button */}
                <button
                  onClick={() => setShowChat(true)}
                  className="p-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg transition-colors"
                  title="Healthcare Assistant"
                >
                  <MessageCircle className="w-5 h-5 text-white" />
                </button>

                {/* Workspace Button */}
                <button
                  onClick={() => setShowWorkspace(true)}
                  className="p-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg transition-colors"
                  title="Workspace"
                >
                  <Briefcase className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Toolbar */}
        <div className="md:hidden px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {/* User Button */}
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="relative p-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg transition-colors"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-medium text-sm">
                      {user?.name?.charAt(0) || 'U'}
                    </span>
                  </div>
                  {notificationCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                      {notificationCount > 9 ? '9+' : notificationCount}
                    </span>
                  )}
                </button>

                {/* User Dropdown */}
                {showUserMenu && (
                  <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    {/* Notifications Section */}
                    <div className="px-4 py-3 border-b border-gray-100">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-900">Notifications</span>
                        {notificationCount > 0 && (
                          <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">
                            {notificationCount} new
                          </span>
                        )}
                      </div>
                      <div className="max-h-48 overflow-y-auto space-y-2">
                        {unreadNotifications.length > 0 ? (
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

              <h1 className="text-lg font-bold">Welcome back!</h1>
            </div>

            <div className="flex items-center space-x-2">
              {/* Chat Button */}
              <button
                onClick={() => setShowChat(true)}
                className="p-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg transition-colors"
                title="Healthcare Assistant"
              >
                <MessageCircle className="w-5 h-5 text-white" />
              </button>

              {/* Workspace Button */}
              <button
                onClick={() => setShowWorkspace(true)}
                className="p-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg transition-colors"
                title="Workspace"
              >
                <Briefcase className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <Navigation 
        activeTab={activeTab} 
        onTabChange={setActiveTab}
        notificationCount={unreadNotifications}
      />
      
      <main className="md:ml-64 flex-1 pb-20 md:pb-0 order-2">
        {renderActiveTab()}
      </main>

      {/* Global Chat Button */}
      <button
        onClick={() => setShowChat(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center z-40"
        title="Healthcare Assistant"
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      <Workspace 
        isOpen={showWorkspace}
        onClose={() => setShowWorkspace(false)}
      />

      <ChatAssistant 
        isOpen={showChat}
        onClose={() => setShowChat(false)}
      />
    </div>
  );
};

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;