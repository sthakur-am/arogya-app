import React from 'react';
import { 
  LayoutDashboard, 
  Heart, 
  User, 
  Users, 
  Settings,
  Bell,
  Briefcase,
  MessageCircle
} from 'lucide-react';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  notificationCount?: number;
  onWorkspaceClick: () => void;
  onChatClick: () => void;
}

const Navigation = ({ activeTab, onTabChange, notificationCount = 0, onWorkspaceClick, onChatClick }: NavigationProps) => {
  const tabs = [
    { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard },
    { id: 'health', name: 'Health', icon: Heart },
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'network', name: 'Network', icon: Users },
    { id: 'services', name: 'Services', icon: Settings },
  ];

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900">HealthCare Pro</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => onTabChange(tab.id)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span>{tab.name}</span>
                </button>
              ))}
              
              <button 
                onClick={onWorkspaceClick}
                className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg"
                title="Workspace"
              >
                <Briefcase className="w-5 h-5" />
              </button>

              <button 
                onClick={onChatClick}
                className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg"
                title="Healthcare Assistant"
              >
                <MessageCircle className="w-5 h-5" />
              </button>

              <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg">
                <Bell className="w-5 h-5" />
                {notificationCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {notificationCount > 9 ? '9+' : notificationCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
        <div className="grid grid-cols-7 h-16">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center justify-center space-y-1 ${
                activeTab === tab.id
                  ? 'text-blue-600'
                  : 'text-gray-600'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              <span className="text-xs font-medium">{tab.name}</span>
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-blue-600 rounded-t-full"></div>
              )}
            </button>
          ))}
          
          <button
            onClick={onWorkspaceClick}
            className="flex flex-col items-center justify-center space-y-1 text-gray-600"
          >
            <Briefcase className="w-5 h-5" />
            <span className="text-xs font-medium">Work</span>
          </button>
          
          <button
            onClick={onChatClick}
            className="flex flex-col items-center justify-center space-y-1 text-gray-600"
          >
            <MessageCircle className="w-5 h-5" />
            <span className="text-xs font-medium">Chat</span>
          </button>
        </div>
      </nav>
    </>
  );
};

export default Navigation;