import React, { useState } from 'react';
import { 
  TrendingUp,
  Calendar, 
  Clock, 
  CheckSquare, 
  Heart, 
  Activity,
  ChevronRight,
  Target,
  Bell,
} from 'lucide-react';
import { useAppContext } from '../contexts/AppContext';

const Dashboard = () => {
  const { user, healthTasks, healthEvents, notifications } = useAppContext();
  const [selectedView, setSelectedView] = useState<'day' | 'week' | 'month'>('week');

  const healthScoreChange = +12; // Mock improvement
  const lastCheckIn = user?.lastCheckIn ? new Date(user.lastCheckIn) : new Date();
  
  const getTaskStatusColor = (status: string, priority: string) => {
    if (status === 'overdue') return 'border-red-200 bg-red-50';
    if (priority === 'high') return 'border-orange-200 bg-orange-50';
    return 'border-blue-200 bg-blue-50';
  };

  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case 'appointment': return <Calendar className="w-4 h-4" />;
      case 'medication': return <Heart className="w-4 h-4" />;
      case 'exercise': return <Activity className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const diffTime = date.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    if (diffDays === -1) return 'Yesterday';
    if (diffDays > 0) return `In ${diffDays} days`;
    return `${Math.abs(diffDays)} days ago`;
  };

  const unreadNotifications = notifications.filter(n => !n.read);
  const pendingTasks = healthTasks.filter(t => t.status === 'pending');
  const upcomingEvents = healthEvents.slice(0, 3);

  return (
    <div className="p-6 space-y-6 md:order-none order-3">
      {/* Health Score & Improvement */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:order-none order-2">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Health Score</h2>
            <Target className="w-5 h-5 text-blue-600" />
          </div>
          
          <div className="relative mb-6">
            {/* Health Score Dial */}
            <div className="w-48 sm:w-56 md:w-64 lg:w-72 xl:w-80 h-28 sm:h-32 md:h-36 lg:h-40 xl:h-44 mx-auto mb-4 relative flex flex-col items-center">
              <svg className="w-full h-full" viewBox="0 0 192 112">
                {/* Background arc */}
                <path
                  d="M 16 96 A 80 80 0 0 1 176 96"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  className="text-gray-200"
                />
                {/* Progress arc */}
                <path
                  d="M 16 96 A 80 80 0 0 1 176 96"
                  stroke="currentColor"
                  strokeWidth="10"
                  fill="none"
                  strokeDasharray="251.3"
                  strokeDashoffset={251.3 - (251.3 * (user?.healthScore || 78) / 100)}
                  className={`transition-all duration-1000 ease-out ${
                    (user?.healthScore || 78) < 50 ? 'text-red-500' :
                    (user?.healthScore || 78) <= 70 ? 'text-yellow-500' : 'text-green-500'
                  }`}
                  strokeLinecap="round"
                />
              </svg>
              
              {/* Score display */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center mt-6">
                  <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900">{user?.healthScore || 78}</span>
                  <div className={`flex items-center justify-center mt-1 ${
                    healthScoreChange > 0 ? 'text-green-600' :
                    healthScoreChange === 0 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    <svg 
                      className="w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 lg:w-5 lg:h-5 xl:w-6 xl:h-6 mr-1" 
                      fill="currentColor" 
                      viewBox="0 0 12 12"
                    >
                      <path d="M6 2l4 8H2l4-8z" />
                    </svg>
                    <span className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-medium text-gray-700">
                      {Math.abs(healthScoreChange)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Min/Max labels */}
            <div className="flex justify-between text-xs sm:text-xs md:text-sm lg:text-base xl:text-lg text-gray-500 mb-4 w-48 sm:w-56 md:w-64 lg:w-72 xl:w-80 mx-auto -mt-4">
              <span className="ml-5">0</span>
              <span className="mr-2">100</span>
            </div>
          </div>
          
          <div className="text-center mt-4">
            <p className="text-sm text-gray-600 mb-2">Overall Health</p>
            <div className={`flex items-center justify-center ${
              (user?.healthScore || 78) < 50 ? 'text-red-600' :
              (user?.healthScore || 78) <= 70 ? 'text-yellow-600' : 'text-green-600'
            }`}>
              <TrendingUp className="w-4 h-4 mr-1" />
              <span className="text-sm font-medium">
                {(user?.healthScore || 78) < 50 ? 'Needs attention' :
                 (user?.healthScore || 78) <= 70 ? 'Making progress' : 'Improving steadily'}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Program Progress</h2>
            <Activity className="w-5 h-5 text-green-600" />
          </div>
          
          {/* Active Program */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium text-gray-900">Youth Health Program</h3>
              <span className="text-2xl font-bold text-green-600">75%</span>
            </div>
            <div className="w-full h-3 bg-gray-200 rounded-full">
              <div className="w-3/4 h-3 bg-green-500 rounded-full transition-all duration-500"></div>
            </div>
            <p className="text-sm text-gray-500 mt-2">Currently enrolled • 3 of 4 milestones completed</p>
          </div>

          {/* Other Programs */}
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-700">Pregnancy Care</span>
              <div className="flex items-center space-x-2">
                <div className="w-12 h-2 bg-gray-200 rounded-full">
                  <div className="w-1/3 h-2 bg-pink-400 rounded-full"></div>
                </div>
                <span className="text-sm font-medium text-gray-600 w-8">33%</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-700">Senior Care</span>
              <div className="flex items-center space-x-2">
                <div className="w-12 h-2 bg-gray-200 rounded-full">
                  <div className="w-0 h-2 bg-blue-400 rounded-full"></div>
                </div>
                <span className="text-sm font-medium text-gray-600 w-8">0%</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-100">
            <div className="flex items-center justify-center text-green-600">
              <TrendingUp className="w-4 h-4 mr-2" />
              <span className="text-sm font-medium">Making great progress</span>
            </div>
          </div>
        </div>
      </div>

      {/* Health Tasks */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Health Tasks</h2>
          <div className="flex items-center text-sm text-gray-600">
            <CheckSquare className="w-4 h-4 mr-1" />
            {pendingTasks.length} pending
          </div>
        </div>

        <div className="space-y-3">
          {healthTasks.slice(0, 3).map((task) => (
            <div
              key={task.id}
              className={`p-4 rounded-lg border transition-colors hover:shadow-md ${getTaskStatusColor(task.status, task.priority)}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <h3 className="font-medium text-gray-900 mr-2">{task.title}</h3>
                    {task.priority === 'high' && (
                      <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">
                        High Priority
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{task.description}</p>
                  <div className="flex items-center text-xs text-gray-500">
                    <Clock className="w-3 h-3 mr-1" />
                    Due {formatDate(task.dueDate)}
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </div>
          ))}
        </div>

        <button className="mt-4 w-full py-2 text-center text-blue-600 hover:text-blue-700 font-medium text-sm">
          View All Tasks
        </button>
      </div>

      {/* Health Events Calendar */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Upcoming Events</h2>
          <div className="flex bg-gray-100 rounded-lg p-1">
            {['day', 'week', 'month'].map((view) => (
              <button
                key={view}
                onClick={() => setSelectedView(view as any)}
                className={`px-3 py-1 text-sm font-medium rounded-md transition-colors capitalize ${
                  selectedView === view
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {view}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          {upcomingEvents.map((event) => (
            <div key={event.id} className="flex items-center p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-lg mr-3">
                {getEventTypeIcon(event.type)}
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">{event.title}</h3>
                <p className="text-sm text-gray-600">{event.description}</p>
                <div className="flex items-center text-xs text-gray-500 mt-1">
                  <Calendar className="w-3 h-3 mr-1" />
                  {formatDate(event.date)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Updates & Notifications */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Recent Updates</h2>
          <div className="flex items-center text-sm text-gray-600">
            <Bell className="w-4 h-4 mr-1" />
            {unreadNotifications.length} new
          </div>
        </div>

        <div className="space-y-3">
          {notifications.slice(0, 3).map((notification) => (
            <div
              key={notification.id}
              className={`p-4 rounded-lg border transition-colors ${
                !notification.read 
                  ? 'bg-blue-50 border-blue-200' 
                  : 'bg-gray-50 border-gray-200'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <h3 className="font-medium text-gray-900 mr-2">{notification.title}</h3>
                    {!notification.read && (
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{notification.message}</p>
                  <div className="text-xs text-gray-500">
                    {formatDate(notification.date)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button className="mt-4 w-full py-2 text-center text-blue-600 hover:text-blue-700 font-medium text-sm">
          View All Notifications
        </button>
      </div>
    </div>
  );
};

export default Dashboard;