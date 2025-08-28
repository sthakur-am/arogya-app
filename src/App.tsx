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
import { MessageCircle } from 'lucide-react';

const AppContent = () => {
  const { 
    isAuthenticated, 
    showLogin, 
    showEmotionSelector, 
    notifications,
    showChat,
    showWorkspace,
    setShowChat,
    setShowWorkspace
  } = useAppContext();
  const [activeTab, setActiveTab] = useState('dashboard');

  const unreadNotifications = notifications.filter(n => !n.read).length;

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
    <div className="min-h-screen bg-gray-50">
      <Navigation 
        activeTab={activeTab} 
        onTabChange={setActiveTab}
        notificationCount={unreadNotifications}
      />
      
      <main className="pb-16 md:pb-0">
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