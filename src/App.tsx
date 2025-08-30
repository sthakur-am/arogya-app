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
import { MessageCircle, LogOut, Briefcase } from 'lucide-react';

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
                <h1 className="text-lg font-semibold text-gray-900">Welcome back!</h1>

                <div className="flex items-center space-x-2">
                  {/* Chat Button */}
                  <button
                    onClick={() => setShowChat(true)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    title="Healthcare Assistant"
                  >
                    <MessageCircle className="w-5 h-5 text-gray-600" />
                  </button>

                  {/* Workspace Button */}
                  <button
                    onClick={() => setShowWorkspace(true)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    title="Workspace"
                  >
                    <Briefcase className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Toolbar */}
          <div className="md:hidden px-4 py-2">
            <div className="flex items-center justify-between">
              <h1 className="text-base font-semibold text-gray-900">Welcome back!</h1>
              <div className="flex items-center space-x-1">
                {/* Chat Button */}
                <button
                  onClick={() => setShowChat(true)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  title="Healthcare Assistant"
                >
                  <MessageCircle className="w-5 h-5 text-gray-600" />
                </button>
                {/* Workspace Button */}
                <button
                  onClick={() => setShowWorkspace(true)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  title="Workspace"
                >
                  <Briefcase className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {renderActiveTab()}
      </main>

      {showChat && <ChatAssistant />}
      {showWorkspace && <Workspace />}
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