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
        onWorkspaceClick={() => setShowWorkspace(true)}
        onChatClick={() => setShowChat(true)}
      />
      
      <main className="pb-16 md:pb-0">
        {renderActiveTab()}
      </main>

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