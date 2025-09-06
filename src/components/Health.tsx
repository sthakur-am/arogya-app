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
  Clock,
  Stethoscope,
  Users,
  Home,
  AlertTriangle,
  CheckCircle,
  Target,
  BarChart3,
  Thermometer,
  Droplets,
  Zap
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

  // Mock health data
  const healthScore = 78;
  const healthMeasures = {
    generalHealth: {
      name: 'General Health',
      icon: Stethoscope,
      score: 82,
      color: 'green',
      measures: [
        { name: 'Blood Pressure', value: '120/80', status: 'good', target: '<140/90' },
        { name: 'Heart Rate', value: '72 bpm', status: 'good', target: '60-100 bpm' },
        { name: 'Temperature', value: '98.6°F', status: 'good', target: '97-99°F' },
        { name: 'Weight', value: '175 lbs', status: 'good', target: '160-180 lbs' },
        { name: 'BMI', value: '24.2', status: 'good', target: '18.5-24.9' }
      ]
    },
    clinicalHealth: {
      name: 'Clinical Health',
      icon: FileText,
      score: 75,
      color: 'blue',
      measures: [
        { name: 'Cholesterol', value: '180 mg/dL', status: 'good', target: '<200 mg/dL' },
        { name: 'Blood Sugar', value: '95 mg/dL', status: 'good', target: '70-100 mg/dL' },
        { name: 'HbA1c', value: '5.2%', status: 'good', target: '<5.7%' },
        { name: 'Vitamin D', value: '32 ng/mL', status: 'attention', target: '>30 ng/mL' },
        { name: 'Iron', value: '85 μg/dL', status: 'good', target: '60-170 μg/dL' }
      ]
    },
    lifestyle: {
      name: 'Lifestyle',
      icon: Activity,
      score: 68,
      color: 'purple',
      measures: [
        { name: 'Sleep Quality', value: '7.2 hrs', status: 'good', target: '7-9 hrs' },
        { name: 'Physical Activity', value: '4 days/week', status: 'attention', target: '5+ days/week' },
        { name: 'Nutrition Score', value: '72/100', status: 'good', target: '>70/100' },
        { name: 'Hydration', value: '6 glasses', status: 'attention', target: '8+ glasses' },
        { name: 'Stress Level', value: 'Moderate', status: 'attention', target: 'Low' }
      ]
    },
    sf36: {
      name: 'SF-36 Quality of Life',
      icon: Heart,
      score: 85,
      color: 'red',
      measures: [
        { name: 'Physical Functioning', value: '90/100', status: 'excellent', target: '>80/100' },
        { name: 'Mental Health', value: '82/100', status: 'good', target: '>70/100' },
        { name: 'Social Functioning', value: '88/100', status: 'good', target: '>75/100' },
        { name: 'Energy/Vitality', value: '75/100', status: 'good', target: '>70/100' },
        { name: 'Pain Level', value: 'Minimal', status: 'excellent', target: 'None/Minimal' }
      ]
    },
    sdoh: {
      name: 'Social Determinants',
      icon: Home,
      score: 72,
      color: 'orange',
      measures: [
        { name: 'Housing Stability', value: 'Stable', status: 'good', target: 'Stable' },
        { name: 'Food Security', value: 'Secure', status: 'good', target: 'Secure' },
        { name: 'Transportation', value: 'Available', status: 'good', target: 'Available' },
        { name: 'Social Support', value: 'Strong', status: 'good', target: 'Strong' },
        { name: 'Healthcare Access', value: 'Good', status: 'attention', target: 'Excellent' }
      ]
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'excellent': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'good': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'attention': return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case 'concern': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      default: return <Circle className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'bg-green-50 border-green-200';
      case 'good': return 'bg-green-50 border-green-200';
      case 'attention': return 'bg-yellow-50 border-yellow-200';
      case 'concern': return 'bg-red-50 border-red-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  const keyHealthConcerns = [
    { measure: 'Physical Activity', category: 'Lifestyle', status: 'attention', recommendation: 'Increase to 5+ days per week' },
    { measure: 'Hydration', category: 'Lifestyle', status: 'attention', recommendation: 'Drink 2 more glasses daily' },
    { measure: 'Vitamin D', category: 'Clinical Health', status: 'attention', recommendation: 'Consider supplementation' },
    { measure: 'Healthcare Access', category: 'Social Determinants', status: 'attention', recommendation: 'Explore additional options' }
  ];
  const renderOverview = () => (
    <div className="space-y-6">
      {/* Top Cards Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Concentric Circles Health Score */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Health Score Overview</h2>
            <div className="flex items-center text-green-600">
              <TrendingUp className="w-4 h-4 mr-1" />
              <span className="text-sm font-medium">+5 this month</span>
            </div>
          </div>
          
          <div className="flex items-center justify-center">
            <div className="relative w-80 h-80">
              {/* Concentric Circles */}
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 320 320">
                {/* Background circles */}
                <circle cx="160" cy="160" r="140" fill="none" stroke="#f3f4f6" strokeWidth="20" />
                <circle cx="160" cy="160" r="110" fill="none" stroke="#f3f4f6" strokeWidth="16" />
                <circle cx="160" cy="160" r="85" fill="none" stroke="#f3f4f6" strokeWidth="12" />
                <circle cx="160" cy="160" r="65" fill="none" stroke="#f3f4f6" strokeWidth="10" />
                <circle cx="160" cy="160" r="48" fill="none" stroke="#f3f4f6" strokeWidth="8" />
                
                {/* Progress circles */}
                {/* SF-36 (outermost) */}
                <circle 
                  cx="160" cy="160" r="140" 
                  fill="none" 
                  stroke="#ef4444" 
                  strokeWidth="20"
                  strokeDasharray={`${2 * Math.PI * 140}`}
                  strokeDashoffset={`${2 * Math.PI * 140 * (1 - 85/100)}`}
                  strokeLinecap="round"
                />
                {/* General Health */}
                <circle 
                  cx="160" cy="160" r="110" 
                  fill="none" 
                  stroke="#22c55e" 
                  strokeWidth="16"
                  strokeDasharray={`${2 * Math.PI * 110}`}
                  strokeDashoffset={`${2 * Math.PI * 110 * (1 - 82/100)}`}
                  strokeLinecap="round"
                />
                {/* Clinical Health */}
                <circle 
                  cx="160" cy="160" r="85" 
                  fill="none" 
                  stroke="#3b82f6" 
                  strokeWidth="12"
                  strokeDasharray={`${2 * Math.PI * 85}`}
                  strokeDashoffset={`${2 * Math.PI * 85 * (1 - 75/100)}`}
                  strokeLinecap="round"
                />
                {/* SDoH */}
                <circle 
                  cx="160" cy="160" r="65" 
                  fill="none" 
                  stroke="#f97316" 
                  strokeWidth="10"
                  strokeDasharray={`${2 * Math.PI * 65}`}
                  strokeDashoffset={`${2 * Math.PI * 65 * (1 - 72/100)}`}
                  strokeLinecap="round"
                />
                {/* Lifestyle (innermost) */}
                <circle 
                  cx="160" cy="160" r="48" 
                  fill="none" 
                  stroke="#8b5cf6" 
                  strokeWidth="8"
                  strokeDasharray={`${2 * Math.PI * 48}`}
                  strokeDashoffset={`${2 * Math.PI * 48 * (1 - 68/100)}`}
                  strokeLinecap="round"
                />
              </svg>
              
              {/* Center score */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <span className="text-4xl font-bold text-gray-900">{healthScore}</span>
                  <p className="text-sm text-gray-600 mt-1">Overall Score</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Legend */}
          <div className="grid grid-cols-2 gap-2 mt-6 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-gray-700">SF-36: 85</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-gray-700">General: 82</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-gray-700">Clinical: 75</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
              <span className="text-gray-700">SDoH: 72</span>
            </div>
            <div className="flex items-center space-x-2 col-span-2 justify-center">
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              <span className="text-gray-700">Lifestyle: 68</span>
            </div>
          </div>
        </div>
        
        {/* Progress Tiles */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Category Progress</h2>
            <BarChart3 className="w-5 h-5 text-blue-600" />
          </div>
          
          <div className="space-y-4">
            {Object.entries(healthMeasures).map(([key, category]) => (
              <div key={key} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className={`bg-${category.color}-100 p-2 rounded-lg`}>
                      <category.icon className={`w-4 h-4 text-${category.color}-600`} />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{category.name}</h3>
                      <p className="text-xs text-gray-500">
                        {category.measures.filter(m => m.status === 'attention' || m.status === 'concern').length} areas need attention
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-bold text-gray-900">{category.score}</span>
                    <div className="flex items-center text-xs">
                      <TrendingUp className="w-3 h-3 text-green-500 mr-1" />
                      <span className="text-green-600">+{Math.floor(Math.random() * 5) + 1}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className={`bg-${category.color}-500 h-2 rounded-full transition-all duration-300`}
                      style={{ width: `${category.score}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-600">{category.score}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Key Health Concerns */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Key Health Areas to Focus On</h2>
          <AlertTriangle className="w-5 h-5 text-yellow-500" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {keyHealthConcerns.map((concern, index) => (
            <div key={index} className={`p-4 rounded-lg border ${getStatusColor(concern.status)}`}>
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-2">
                  {getStatusIcon(concern.status)}
                  <h3 className="font-medium text-gray-900">{concern.measure}</h3>
                </div>
                <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded-full">
                  {concern.category}
                </span>
              </div>
              <p className="text-sm text-gray-600">{concern.recommendation}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Detailed Health Measures */}
      <div className="space-y-6">
        {Object.entries(healthMeasures).map(([key, category]) => (
          <div key={key} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className={`bg-${category.color}-100 p-3 rounded-lg`}>
                  <category.icon className={`w-6 h-6 text-${category.color}-600`} />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">{category.name}</h2>
                  <p className="text-sm text-gray-600">Score: {category.score}/100</p>
                </div>
              </div>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                View Details
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {category.measures.map((measure, index) => (
                <div key={index} className={`p-4 rounded-lg border ${getStatusColor(measure.status)}`}>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-gray-900">{measure.name}</h3>
                    {getStatusIcon(measure.status)}
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Current:</span>
                      <span className="text-sm font-medium text-gray-900">{measure.value}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Target:</span>
                      <span className="text-sm text-gray-700">{measure.target}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Health Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: 'Log Vitals', icon: Thermometer, color: 'red' },
            { name: 'Record Activity', icon: Activity, color: 'blue' },
            { name: 'Track Sleep', icon: Moon, color: 'purple' },
            { name: 'Log Meal', icon: Utensils, color: 'green' }
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