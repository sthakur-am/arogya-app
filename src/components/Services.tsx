import React from 'react';
import { 
  Calendar, 
  Pill, 
  Stethoscope, 
  FileText, 
  Phone, 
  Video,
  MapPin,
  Clock,
  Star,
  ExternalLink
} from 'lucide-react';

const Services = () => {
  const services = [
    {
      id: 1,
      title: 'Telemedicine Consultations',
      description: 'Connect with healthcare providers remotely',
      icon: Video,
      category: 'Consultation',
      availability: '24/7 Available',
      price: 'From $25'
    },
    {
      id: 2,
      title: 'Prescription Management',
      description: 'Manage and refill prescriptions online',
      icon: Pill,
      category: 'Medication',
      availability: 'Business Hours',
      price: 'Included'
    },
    {
      id: 3,
      title: 'Lab Test Booking',
      description: 'Schedule laboratory tests and view results',
      icon: FileText,
      category: 'Testing',
      availability: 'Mon-Fri',
      price: 'Varies'
    },
    {
      id: 4,
      title: 'Find Healthcare Providers',
      description: 'Locate nearby doctors and specialists',
      icon: MapPin,
      category: 'Directory',
      availability: 'Always',
      price: 'Free'
    },
    {
      id: 5,
      title: 'Emergency Hotline',
      description: '24/7 emergency medical assistance',
      icon: Phone,
      category: 'Emergency',
      availability: '24/7',
      price: 'Included'
    },
    {
      id: 6,
      title: 'Health Monitoring',
      description: 'Continuous health data tracking',
      icon: Stethoscope,
      category: 'Monitoring',
      availability: 'Continuous',
      price: 'Premium'
    }
  ];

  const featuredProviders = [
    {
      id: 1,
      name: 'Dr. Emily Carter',
      specialty: 'General Practitioner',
      rating: 4.9,
      reviews: 127,
      image: 'EC',
      nextAvailable: 'Today 2:30 PM'
    },
    {
      id: 2,
      name: 'Dr. Michael Zhang',
      specialty: 'Cardiologist',
      rating: 4.8,
      reviews: 89,
      image: 'MZ',
      nextAvailable: 'Tomorrow 10:00 AM'
    },
    {
      id: 3,
      name: 'Dr. Sarah Williams',
      specialty: 'Dermatologist',
      rating: 4.9,
      reviews: 156,
      image: 'SW',
      nextAvailable: 'Thursday 3:15 PM'
    }
  ];

  const quickActions = [
    { name: 'Book Appointment', icon: Calendar, color: 'blue' },
    { name: 'Refill Prescription', icon: Pill, color: 'green' },
    { name: 'Emergency Call', icon: Phone, color: 'red' },
    { name: 'View Lab Results', icon: FileText, color: 'purple' }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Healthcare Services</h1>
        <p className="text-gray-600">Access comprehensive healthcare services and providers</p>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <button
              key={index}
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

      {/* Available Services */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Available Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div key={service.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow group">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-blue-100 p-3 rounded-lg group-hover:bg-blue-200 transition-colors">
                  <service.icon className="w-6 h-6 text-blue-600" />
                </div>
                <span className="text-sm font-medium text-gray-600">{service.category}</span>
              </div>
              
              <h3 className="font-semibold text-gray-900 mb-2">{service.title}</h3>
              <p className="text-sm text-gray-600 mb-4">{service.description}</p>
              
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="w-4 h-4 mr-2" />
                  {service.availability}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-900">{service.price}</span>
                  <button className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center">
                    Access <ExternalLink className="w-3 h-3 ml-1" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Providers */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Featured Providers</h2>
          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            View All Providers
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProviders.map((provider) => (
            <div key={provider.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-medium">{provider.image}</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{provider.name}</h3>
                  <p className="text-sm text-gray-600">{provider.specialty}</p>
                </div>
              </div>
              
              <div className="flex items-center mb-3">
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium text-gray-900 ml-1">{provider.rating}</span>
                </div>
                <span className="text-sm text-gray-500 ml-2">({provider.reviews} reviews)</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  <Clock className="w-4 h-4 inline mr-1" />
                  {provider.nextAvailable}
                </div>
                <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm hover:bg-blue-200 transition-colors">
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Emergency Contact */}
      <div className="bg-red-50 border border-red-200 rounded-xl p-6">
        <div className="flex items-center space-x-4">
          <div className="bg-red-100 p-3 rounded-lg">
            <Phone className="w-6 h-6 text-red-600" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-red-900">Emergency Services</h3>
            <p className="text-red-700">Need immediate medical attention?</p>
          </div>
          <button className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium">
            Call 911
          </button>
        </div>
      </div>
    </div>
  );
};

export default Services;