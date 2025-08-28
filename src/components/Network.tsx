import React from 'react';
import { Users, UserPlus, MessageCircle, Heart, Award, Calendar, MapPin, Phone, Star, Filter, Search } from 'lucide-react';
import { useAppContext } from '../contexts/AppContext';

const Network = () => {
  const { healthProviders } = useAppContext();

  const connections = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      role: 'Primary Care Physician',
      avatar: 'SJ',
      status: 'online',
      lastContact: '2 days ago'
    },
    {
      id: 2,
      name: 'Mike Chen',
      role: 'Fitness Buddy',
      avatar: 'MC',
      status: 'offline',
      lastContact: '1 week ago'
    },
    {
      id: 3,
      name: 'Lisa Rodriguez',
      role: 'Nutritionist',
      avatar: 'LR',
      status: 'online',
      lastContact: '3 days ago'
    }
  ];

  const healthGroups = [
    {
      id: 1,
      name: 'Diabetes Support Group',
      members: 24,
      description: 'Connect with others managing diabetes'
    },
    {
      id: 2,
      name: 'Heart Health Warriors',
      members: 18,
      description: 'Share tips for cardiovascular wellness'
    },
    {
      id: 3,
      name: 'Fitness Enthusiasts',
      members: 32,
      description: 'Motivate each other to stay active'
    }
  ];

  const achievements = [
    { name: 'Health Streak', icon: Award, color: 'gold' },
    { name: 'Community Helper', icon: Heart, color: 'red' },
    { name: 'Fitness Goal', icon: Users, color: 'blue' }
  ];

  const getProviderIcon = (type: string) => {
    switch (type) {
      case 'primary-care': return '🏥';
      case 'specialist': return '👨‍⚕️';
      case 'nursing': return '👩‍⚕️';
      case 'lab': return '🔬';
      case 'pharmacy': return '💊';
      default: return '🏥';
    }
  };

  const getProviderTypeLabel = (type: string) => {
    switch (type) {
      case 'primary-care': return 'Primary Care';
      case 'specialist': return 'Specialist';
      case 'nursing': return 'Nursing';
      case 'lab': return 'Laboratory';
      case 'pharmacy': return 'Pharmacy';
      default: return 'Healthcare';
    }
  };
  return (
    <div className="p-6 space-y-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Network</h1>
        <p className="text-gray-600">Connect with healthcare providers and wellness community</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
          <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
            <Users className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{connections.length}</h3>
          <p className="text-gray-600">Connections</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
          <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
            <MessageCircle className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">12</h3>
          <p className="text-gray-600">Messages</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
          <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
            <Heart className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">8</h3>
          <p className="text-gray-600">Shared Goals</p>
        </div>
      </div>

      {/* Healthcare Providers */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Healthcare Providers</h2>
          <div className="flex space-x-2">
            <button className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Filter className="w-4 h-4" />
              <span className="text-sm">Filter</span>
            </button>
            <button className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Search className="w-4 h-4" />
              <span className="text-sm">Search</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {healthProviders.map((provider) => (
            <div key={provider.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-3">
                  <div className="text-2xl">{getProviderIcon(provider.type)}</div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{provider.name}</h3>
                    <p className="text-sm text-gray-600">
                      {getProviderTypeLabel(provider.type)}
                      {provider.specialty && ` • ${provider.specialty}`}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium text-gray-900 ml-1">{provider.rating}</span>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>{provider.address}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Phone className="w-4 h-4 mr-2" />
                  <span>{provider.phone}</span>
                </div>
                <div className="text-sm text-gray-600">
                  <span className="font-medium">Distance:</span> {provider.distance}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className={`w-2 h-2 rounded-full mr-2 ${
                    provider.acceptingPatients ? 'bg-green-500' : 'bg-red-500'
                  }`}></div>
                  <span className="text-sm text-gray-600">
                    {provider.acceptingPatients ? 'Accepting Patients' : 'Not Accepting'}
                  </span>
                </div>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm hover:bg-blue-200 transition-colors">
                    Contact
                  </button>
                  <button className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm hover:bg-green-200 transition-colors">
                    Book
                  </button>
                </div>
              </div>

              {provider.insuranceAccepted.length > 0 && (
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <p className="text-xs text-gray-500 mb-1">Insurance Accepted:</p>
                  <div className="flex flex-wrap gap-1">
                    {provider.insuranceAccepted.slice(0, 3).map((insurance, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                        {insurance}
                      </span>
                    ))}
                    {provider.insuranceAccepted.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                        +{provider.insuranceAccepted.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      {/* My Connections */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">My Connections</h2>
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <UserPlus className="w-4 h-4" />
            <span>Add Connection</span>
          </button>
        </div>

        <div className="space-y-4">
          {connections.map((connection) => (
            <div key={connection.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-medium">{connection.avatar}</span>
                  </div>
                  <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                    connection.status === 'online' ? 'bg-green-500' : 'bg-gray-400'
                  }`}></div>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{connection.name}</h3>
                  <p className="text-sm text-gray-600">{connection.role}</p>
                  <p className="text-xs text-gray-500">Last contact: {connection.lastContact}</p>
                </div>
              </div>
              <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                <MessageCircle className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Health Groups */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Health Groups</h2>
          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            Browse All Groups
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {healthGroups.map((group) => (
            <div key={group.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <h3 className="font-medium text-gray-900 mb-2">{group.name}</h3>
              <p className="text-sm text-gray-600 mb-3">{group.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">{group.members} members</span>
                <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs hover:bg-blue-200 transition-colors">
                  Join
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Achievements</h2>
        <div className="flex space-x-4">
          {achievements.map((achievement, index) => (
            <div key={index} className="flex items-center space-x-2 px-4 py-2 bg-yellow-50 rounded-lg border border-yellow-200">
              <achievement.icon className={`w-5 h-5 text-${achievement.color}-600`} />
              <span className="text-sm font-medium text-gray-900">{achievement.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Network;