import React from 'react';
import { useState } from 'react';
import { 
  LayoutDashboard, 
  Heart, 
  User, 
  Users, 
  Settings,
  ChevronDown,
  LogOut,
  MessageCircle,
  Briefcase
} from 'lucide-react';
import { useAppContext } from '../contexts/AppContext';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  notificationCount?: number;
}

const Navigation = ({ activeTab, onTabChange, notificationCount = 0 }: NavigationProps) => {
  const { user, logout, notifications, setShowChat, setShowWorkspace } = useAppContext();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const unreadNotifications = notifications.filter(n => !n.read);

  const tabs = [
    { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard },
    { id: 'health', name: 'Health', icon: Heart },
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'network', name: 'Network', icon: Users },
    { id: 'services', name: 'Services', icon: Settings },
  ];

  return (
    <>
      {/* Desktop Left Sidebar Navigation */}
      <nav className="hidden md:block fixed left-0 top-0 h-full w-64 bg-white shadow-lg border-r border-gray-200 z-30">
        <div className="flex flex-col h-full">
          {/* User Section at Top */}
          <div className="p-6 border-b border-gray-100">
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="w-full flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-medium">
                      {user?.name?.charAt(0) || 'U'}
                    </span>
                  </div>
                  {unreadNotifications.length > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                      {unreadNotifications.length > 9 ? '9+' : unreadNotifications.length}
                    </span>
                  )}
                </div>
                <div className="flex-1 text-left">
                  <p className="font-medium text-gray-900">{user?.name}</p>
                  <p className="text-sm text-gray-600">{user?.location}</p>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </button>

              {/* User Dropdown */}
              {showUserMenu && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  {/* Notifications Section */}
                  <div className="px-4 py-3 border-b border-gray-100">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-900">Notifications</span>
                      {unreadNotifications.length > 0 && (
                        <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">
                          {unreadNotifications.length} new
                        </span>
                      )}
                    </div>
                    <div className="max-h-48 overflow-y-auto space-y-2">
                      {unreadNotifications.length > 0 ? (
                        unreadNotifications.slice(0, 3).map((notification) => (
                          <div key={notification.id} className="p-2 bg-blue-50 rounded-lg">
                            <p className="text-xs font-medium text-gray-900">{notification.title}</p>
                            <p className="text-xs text-gray-600 truncate">{notification.message}</p>
                          </div>
                        ))
                      ) : (
                        <p className="text-xs text-gray-500">No new notifications</p>
                      )}
                    </div>
                    {unreadNotifications.length > 3 && (
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
          
          {/* Navigation Menu */}
          <div className="flex-1 p-6">
            <div className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => onTabChange(tab.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'bg-blue-50 text-blue-700 border border-blue-200'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  <span>{tab.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Product Banner at Bottom */}
          <div className="p-6">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-4 text-white">
              <div className="flex items-center space-x-2 mb-3">
                <Heart className="w-5 h-5" />
                <span className="font-bold">HealthCare Pro</span>
              </div>
              <p className="text-sm text-blue-100 mb-4">
                Your personalized healthcare companion
              </p>
              <div className="flex space-x-2">
                <button
                  onClick={() => setShowChat(true)}
                  className="flex-1 bg-white bg-opacity-20 hover:bg-opacity-30 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  Chat
                </button>
                <button
                  onClick={() => setShowWorkspace(true)}
                  className="flex-1 bg-white bg-opacity-20 hover:bg-opacity-30 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  Workspace
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Tool Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40">
        <div className="grid grid-cols-5 h-16">
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
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-blue-600 rounded-t-full"></div>
              )}
            </button>
          ))}
        </div>
      </nav>
    </>
  );
};

export default Navigation;