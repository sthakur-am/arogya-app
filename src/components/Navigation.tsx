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
  Briefcase,
  Cog,
  Edit3,
  UserCircle
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
                className="w-full p-4 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-medium">
                      {user?.name?.charAt(0) || 'U'}
                    </span>
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-medium text-gray-900">{user?.name}</p>
                    <p className="text-sm text-gray-600">{user?.location}</p>
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </div>
                
                {/* Health Info Grid - Always visible */}
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="bg-gray-50 rounded-lg p-2">
                    <p className="text-xs text-gray-500 mb-1">Age</p>
                    <p className="font-semibold text-gray-900 text-sm">{user?.age || 'N/A'}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-2">
                    <p className="text-xs text-gray-500 mb-1">Sex</p>
                    <p className="font-semibold text-gray-900 text-sm capitalize">{user?.sex || 'N/A'}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-2">
                    <p className="text-xs text-gray-500 mb-1">Blood Type</p>
                    <p className="font-semibold text-gray-900 text-sm">{user?.vitals?.bloodType || 'N/A'}</p>
                  </div>
                </div>
              </button>

              {/* User Dropdown */}
              {showUserMenu && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden z-50">
                  <div className="py-2">
                    <button
                      onClick={() => setShowUserMenu(false)}
                      className="w-full flex items-center space-x-3 px-4 py-2 text-left hover:bg-gray-50 transition-colors"
                    >
                      <UserCircle className="w-4 h-4 text-gray-600" />
                      <span className="text-sm text-gray-700">View Profile</span>
                    </button>
                    <button
                      onClick={() => setShowUserMenu(false)}
                      className="w-full flex items-center space-x-3 px-4 py-2 text-left hover:bg-gray-50 transition-colors"
                    >
                      <Edit3 className="w-4 h-4 text-gray-600" />
                      <span className="text-sm text-gray-700">Edit Profile</span>
                    </button>
                    <button
                      onClick={() => setShowUserMenu(false)}
                      className="w-full flex items-center space-x-3 px-4 py-2 text-left hover:bg-gray-50 transition-colors"
                    >
                      <Cog className="w-4 h-4 text-gray-600" />
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