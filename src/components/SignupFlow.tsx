import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, User, MapPin, Heart, Calendar } from 'lucide-react';
import { useAppContext } from '../contexts/AppContext';

interface SignupData {
  email: string;
  name: string;
  age: string;
  sex: 'male' | 'female' | 'other' | '';
  location: string;
  smoker: boolean | null;
  drinker: boolean | null;
  healthHabits: string[];
}

const SignupFlow = () => {
  const { currentStep, setCurrentStep, signup, setShowLogin } = useAppContext();
  const [formData, setFormData] = useState<SignupData>({
    email: '',
    name: '',
    age: '',
    sex: '',
    location: '',
    smoker: null,
    drinker: null,
    healthHabits: []
  });

  const healthHabitsOptions = [
    'Regular Exercise',
    'Healthy Diet',
    'Adequate Sleep',
    'Stress Management',
    'Regular Checkups',
    'Meditation',
    'Yoga'
  ];

  const handleNext = () => {
    if (currentStep < 2) {
      setCurrentStep(currentStep + 1);
    } else {
      // Complete signup
      signup({
        email: formData.email,
        name: formData.name,
        age: parseInt(formData.age),
        sex: formData.sex as 'male' | 'female' | 'other',
        location: formData.location,
        smoker: formData.smoker || false,
        drinker: formData.drinker || false,
        healthHabits: formData.healthHabits
      });
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateHealthHabits = (habit: string) => {
    const newHabits = formData.healthHabits.includes(habit)
      ? formData.healthHabits.filter(h => h !== habit)
      : [...formData.healthHabits, habit];
    setFormData({ ...formData, healthHabits: newHabits });
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 0:
        return formData.email.trim() && formData.name.trim() && formData.age && formData.sex && formData.location.trim();
      case 1:
      case 2:
        return true;
      default:
        return false;
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-8 h-8 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Basic Information</h2>
              <p className="text-gray-600">Tell us a bit about yourself</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="Enter your email address"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Enter your full name"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Age *</label>
                  <input
                    type="number"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="Age"
                    min="1"
                    max="120"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Sex *</label>
                  <select
                    value={formData.sex}
                    onChange={(e) => setFormData({ ...formData, sex: e.target.value as any })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  >
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location *</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="Enter your city, state"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Health Habits</h2>
              <p className="text-gray-600">Help us understand your lifestyle better</p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">Do you smoke?</label>
                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, smoker: false })}
                    className={`flex-1 py-3 px-4 border rounded-lg text-center transition-colors ${
                      formData.smoker === false
                        ? 'border-green-500 bg-green-50 text-green-700'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    No
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, smoker: true })}
                    className={`flex-1 py-3 px-4 border rounded-lg text-center transition-colors ${
                      formData.smoker === true
                        ? 'border-red-500 bg-red-50 text-red-700'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    Yes
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">Do you drink alcohol?</label>
                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, drinker: false })}
                    className={`flex-1 py-3 px-4 border rounded-lg text-center transition-colors ${
                      formData.drinker === false
                        ? 'border-green-500 bg-green-50 text-green-700'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    No
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, drinker: true })}
                    className={`flex-1 py-3 px-4 border rounded-lg text-center transition-colors ${
                      formData.drinker === true
                        ? 'border-yellow-500 bg-yellow-50 text-yellow-700'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    Yes
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-purple-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Health Habits</h2>
              <p className="text-gray-600">Select habits that apply to you (optional)</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {healthHabitsOptions.map((habit) => (
                <button
                  key={habit}
                  type="button"
                  onClick={() => updateHealthHabits(habit)}
                  className={`p-4 border rounded-lg text-left transition-colors ${
                    formData.healthHabits.includes(habit)
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center">
                    <div className={`w-4 h-4 rounded border-2 mr-3 ${
                      formData.healthHabits.includes(habit)
                        ? 'bg-blue-500 border-blue-500'
                        : 'border-gray-300'
                    }`}>
                      {formData.healthHabits.includes(habit) && (
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-sm"></div>
                        </div>
                      )}
                    </div>
                    <span className="font-medium">{habit}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Step {currentStep + 1} of 3</span>
            <span className="text-sm font-medium text-gray-500">{Math.round(((currentStep + 1) / 3) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / 3) * 100}%` }}
            ></div>
          </div>
        </div>

        {renderStep()}

        {/* Navigation buttons */}
        <div className="flex justify-between mt-8">
          <button
            type="button"
            onClick={currentStep === 0 ? () => setShowLogin(true) : handleBack}
            className={`flex items-center px-6 py-3 rounded-lg transition-colors ${
              currentStep === 0
                ? 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
            }`}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {currentStep === 0 ? 'Login' : 'Back'}
          </button>

          <button
            type="button"
            onClick={handleNext}
            disabled={!isStepValid()}
            className={`flex items-center px-6 py-3 rounded-lg font-medium transition-colors ${
              isStepValid()
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {currentStep === 2 ? 'Complete' : 'Next'}
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignupFlow;