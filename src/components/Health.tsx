import React, { useState } from 'react';
import { 
  Heart, 
  Activity, 
  Moon, 
  Utensils, 
  Calendar, 
  TrendingUp,
  Plus,
  FileText,
  Clock
} from 'lucide-react';

const Health = () => {
  const [selectedCategory, setSelectedCategory] = useState('overview');

  const categories = [
    { id: 'overview', name: 'Overview', icon: Heart },
    { id: 'activity', name: 'Activity', icon: Activity },
    { id: 'sleep', name: 'Sleep', icon: Moon },
    { id: 'nutrition', name: 'Nutrition', icon: Utensils },
    { id: 'records', name: 'Records', icon: FileText },
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-red-100 p-3 rounded-lg">
              <Heart className="w-6 h-6 text-red-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">72</span>
          </div>
          <h3 className="font-medium text-gray-900">Heart Rate</h3>
          <p className="text-sm text-gray-600">Average BPM</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-blue-100 p-3 rounded-lg">
              <Activity className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">8.2k</span>
          </div>
          <h3 className="font-medium text-gray-900">Steps</h3>
          <p className="text-sm text-gray-600">Today's count</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-purple-100 p-3 rounded-lg">
              <Moon className="w-6 h-6 text-purple-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">7.5h</span>
          </div>
          <h3 className="font-medium text-gray-900">Sleep</h3>
          <p className="text-sm text-gray-600">Last night</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-green-100 p-3 rounded-lg">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">78</span>
          </div>
          <h3 className="font-medium text-gray-900">Health Score</h3>
          <p className="text-sm text-gray-600">Overall rating</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: 'Log Meal', icon: Utensils, color: 'green' },
            { name: 'Record Sleep', icon: Moon, color: 'purple' },
            { name: 'Add Exercise', icon: Activity, color: 'blue' },
            { name: 'Health Check', icon: Heart, color: 'red' }
          ].map((action) => (
            <button
              key={action.name}
              className={`p-4 rounded-lg border-2 border-dashed border-${action.color}-200 hover:border-${action.color}-300 hover:bg-${action.color}-50 transition-colors group`}
            >
              <action.icon className={`w-6 h-6 text-${action.color}-600 mx-auto mb-2`} />
              <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                {action.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  const renderPlaceholder = (title: string) => (
    <div className="text-center py-12">
      <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
        <Plus className="w-8 h-8 text-gray-400" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">{title} Coming Soon</h3>
      <p className="text-gray-600 max-w-sm mx-auto">
        This section is under development. Check back soon for detailed {title.toLowerCase()} tracking.
      </p>
    </div>
  );

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Health Overview</h1>
        <p className="text-gray-600">Track and monitor your health metrics</p>
      </div>

      {/* Category Navigation */}
      <div className="flex space-x-1 mb-6 bg-gray-100 rounded-lg p-1 overflow-x-auto">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap transition-colors ${
              selectedCategory === category.id
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <category.icon className="w-4 h-4" />
            <span>{category.name}</span>
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="min-h-96">
        {selectedCategory === 'overview' && renderOverview()}
        {selectedCategory === 'activity' && renderPlaceholder('Activity Tracking')}
        {selectedCategory === 'sleep' && renderPlaceholder('Sleep Analysis')}
        {selectedCategory === 'nutrition' && renderPlaceholder('Nutrition Tracking')}
        {selectedCategory === 'records' && renderPlaceholder('Health Records')}
      </div>
    </div>
  );
};

export default Health;