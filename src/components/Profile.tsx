import React from 'react';
import { 
  User, 
  MapPin, 
  Calendar, 
  Heart, 
  Shield, 
  Settings,
  Edit3,
  LogOut,
  Plus,
  Download,
  Share2,
  Activity,
  Pill,
  FileText,
  AlertTriangle
} from 'lucide-react';
import { useAppContext } from '../contexts/AppContext';

const Profile = () => {
  const { user, logout } = useAppContext();

  const handleExportPDF = () => {
    // In a real app, this would generate and download a PDF
    alert('PDF export functionality would be implemented here');
  };

  const handleShareProfile = () => {
    // In a real app, this would generate a shareable link
    alert('Profile sharing functionality would be implemented here');
  };

  const profileSections = [
    {
      title: 'Personal Information',
      items: [
        { label: 'Email', value: user?.email, icon: User },
        { label: 'Full Name', value: user?.name, icon: User },
        { label: 'Age', value: user?.age, icon: Calendar },
        { label: 'Sex', value: user?.sex, icon: User },
        { label: 'Location', value: user?.location, icon: MapPin },
      ]
    },
    {
      title: 'Health Information',
      items: [
        { label: 'Health Score', value: user?.healthScore, icon: Heart },
        { label: 'Smoker', value: user?.smoker ? 'Yes' : 'No', icon: Shield },
        { label: 'Drinker', value: user?.drinker ? 'Yes' : 'No', icon: Shield },
        { label: 'Last Check-in', value: user?.lastCheckIn ? new Date(user.lastCheckIn).toLocaleDateString() : 'N/A', icon: Calendar },
      ]
    }
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Profile</h1>
        <p className="text-gray-600">Manage your personal and health information</p>
      </div>

      <div className="space-y-6">
        {/* Profile Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold text-white">
                {user?.name?.charAt(0) || 'U'}
              </span>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{user?.name}</h2>
              <p className="text-gray-600">{user?.location}</p>
              <div className="flex items-center mt-2">
                <div className="w-4 h-4 bg-green-500 rounded-full mr-2"></div>
                <span className="text-sm text-gray-600">Active</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Edit3 className="w-4 h-4" />
              <span>Edit Profile</span>
            </button>
            <button 
              onClick={handleExportPDF}
              className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Export PDF</span>
            </button>
            <button 
              onClick={handleShareProfile}
              className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              <Share2 className="w-4 h-4" />
              <span>Share Profile</span>
            </button>
          </div>
        </div>

        {/* Profile Information */}
        {profileSections.map((section, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">{section.title}</h3>
            <div className="space-y-4">
              {section.items.map((item, itemIndex) => (
                <div key={itemIndex} className="flex items-center justify-between py-2">
                  <div className="flex items-center space-x-3">
                    <item.icon className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-700">{item.label}</span>
                  </div>
                  <span className="font-medium text-gray-900">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Vitals */}
        {user?.vitals && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Vitals</h3>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                Update
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {Object.entries(user.vitals).map(([key, value]) => (
                <div key={key} className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center space-x-2 mb-1">
                    <Activity className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-medium text-gray-700 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                  </div>
                  <span className="text-lg font-semibold text-gray-900">{value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Allergies */}
        {user?.allergies && user.allergies.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Allergies & Issues</h3>
              <button className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-sm font-medium">
                <Plus className="w-4 h-4" />
                <span>Add</span>
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {user.allergies.map((allergy, index) => (
                <span
                  key={index}
                  className="flex items-center space-x-1 px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium"
                >
                  <AlertTriangle className="w-3 h-3" />
                  <span>{allergy}</span>
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Current Medications */}
        {user?.medications && user.medications.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Current Medications</h3>
              <button className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-sm font-medium">
                <Plus className="w-4 h-4" />
                <span>Add</span>
              </button>
            </div>
            <div className="space-y-3">
              {user.medications.map((medication) => (
                <div key={medication.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <div className="bg-blue-100 p-2 rounded-lg">
                        <Pill className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{medication.name}</h4>
                        <p className="text-sm text-gray-600">{medication.dosage} - {medication.frequency}</p>
                        <p className="text-xs text-gray-500">
                          Started: {medication.startDate.toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <button className="text-gray-400 hover:text-gray-600">
                      <Edit3 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Health Records */}
        {user?.healthRecords && user.healthRecords.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Health Records</h3>
              <button className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-sm font-medium">
                <Plus className="w-4 h-4" />
                <span>Add Record</span>
              </button>
            </div>
            <div className="space-y-3">
              {user.healthRecords.map((record) => (
                <div key={record.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <div className="bg-green-100 p-2 rounded-lg">
                        <FileText className="w-4 h-4 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{record.title}</h4>
                        <p className="text-sm text-gray-600 capitalize">{record.type}</p>
                        <p className="text-xs text-gray-500">
                          {record.date.toLocaleDateString()} • {record.provider}
                        </p>
                      </div>
                    </div>
                    <button className="text-gray-400 hover:text-gray-600">
                      <Edit3 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Health History */}
        {user?.healthHistory && user.healthHistory.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Health History</h3>
              <button className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-sm font-medium">
                <Plus className="w-4 h-4" />
                <span>Add Condition</span>
              </button>
            </div>
            <div className="space-y-3">
              {user.healthHistory.map((condition) => (
                <div key={condition.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <div className={`p-2 rounded-lg ${
                        condition.status === 'active' ? 'bg-red-100' :
                        condition.status === 'chronic' ? 'bg-yellow-100' : 'bg-green-100'
                      }`}>
                        <Heart className={`w-4 h-4 ${
                          condition.status === 'active' ? 'text-red-600' :
                          condition.status === 'chronic' ? 'text-yellow-600' : 'text-green-600'
                        }`} />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{condition.condition}</h4>
                        <p className="text-sm text-gray-600 capitalize">{condition.status}</p>
                        <p className="text-xs text-gray-500">
                          Diagnosed: {condition.diagnosedDate.toLocaleDateString()}
                        </p>
                        {condition.notes && (
                          <p className="text-xs text-gray-600 mt-1">{condition.notes}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button className="text-gray-400 hover:text-gray-600">
                        <Edit3 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {/* Health Habits */}
        {user?.healthHabits && user.healthHabits.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Health Habits</h3>
            <div className="flex flex-wrap gap-2">
              {user.healthHabits.map((habit, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium"
                >
                  {habit}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Settings & Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Settings</h3>
          <div className="space-y-3">
            <button className="w-full flex items-center justify-between p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
              <div className="flex items-center space-x-3">
                <Settings className="w-5 h-5 text-gray-400" />
                <span className="text-gray-700">Preferences</span>
              </div>
              <span className="text-gray-400">→</span>
            </button>
            
            <button className="w-full flex items-center justify-between p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
              <div className="flex items-center space-x-3">
                <Shield className="w-5 h-5 text-gray-400" />
                <span className="text-gray-700">Privacy & Security</span>
              </div>
              <span className="text-gray-400">→</span>
            </button>
            
            <button 
              onClick={logout}
              className="w-full flex items-center justify-between p-3 text-left hover:bg-red-50 rounded-lg transition-colors text-red-600"
            >
              <div className="flex items-center space-x-3">
                <LogOut className="w-5 h-5" />
                <span>Sign Out</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;