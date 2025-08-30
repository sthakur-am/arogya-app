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
          
          <div className="relative">
            <div className="w-32 h-32 mx-auto mb-4">
              <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  className="text-gray-200"
                />
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 50}`}
                  strokeDashoffset={`${2 * Math.PI * 50 * (1 - (user?.healthScore || 78) / 100)}`}
                  className="text-blue-600 transition-all duration-1000 ease-out"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-gray-900">{user?.healthScore || 78}</span>
              </div>
            </div>
            
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-2">Overall Health</p>
              <div className="flex items-center justify-center text-green-600">
                <TrendingUp className="w-4 h-4 mr-1" />
                <span className="text-sm font-medium">Improving steadily</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">This Week's Progress</h2>
            <Activity className="w-5 h-5 text-green-600" />
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Exercise Goals</span>
              <div className="flex items-center">
                <div className="w-20 h-2 bg-gray-200 rounded-full mr-2">
                  <div className="w-3/4 h-2 bg-green-500 rounded-full"></div>
                </div>
                <span className="text-sm font-medium text-gray-900">75%</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Medication Adherence</span>
              <div className="flex items-center">
                <div className="w-20 h-2 bg-gray-200 rounded-full mr-2">
                  <div className="w-full h-2 bg-blue-500 rounded-full"></div>
                </div>
                <span className="text-sm font-medium text-gray-900">100%</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Sleep Quality</span>
              <div className="flex items-center">
                <div className="w-20 h-2 bg-gray-200 rounded-full mr-2">
                  <div className="w-4/5 h-2 bg-purple-500 rounded-full"></div>
                </div>
                <span className="text-sm font-medium text-gray-900">80%</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex items-center text-green-600">
              <TrendingUp className="w-4 h-4 mr-2" />
              <span className="text-sm font-medium">+{healthScoreChange} points improvement</span>
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