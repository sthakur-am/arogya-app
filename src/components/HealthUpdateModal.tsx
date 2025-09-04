import React, { useState } from 'react';
import { X, Plus, Pill, Syringe, FileText, Heart, Activity, Calendar } from 'lucide-react';
import { useSupabaseContext } from '../contexts/SupabaseContext';

interface HealthUpdateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const HealthUpdateModal = ({ isOpen, onClose }: HealthUpdateModalProps) => {
  const { 
    createMedication, 
    createHealthRecord, 
    createImmunization, 
    createVitals, 
    createExerciseLog, 
    createAppointment 
  } = useSupabaseContext();
  const [step, setStep] = useState<'select' | 'form'>('select');
  const [selectedType, setSelectedType] = useState<string>('');
  const [formData, setFormData] = useState<any>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateTypes = [
    {
      id: 'medication',
      name: 'New Medication',
      description: 'Add a new prescription or medication',
      icon: Pill,
      color: 'blue'
    },
    {
      id: 'immunization',
      name: 'Immunization',
      description: 'Record a vaccination or immunization',
      icon: Syringe,
      color: 'green'
    },
    {
      id: 'vitals',
      name: 'Vital Signs',
      description: 'Update blood pressure, weight, etc.',
      icon: Heart,
      color: 'red'
    },
    {
      id: 'exercise',
      name: 'Exercise Activity',
      description: 'Log workout or physical activity',
      icon: Activity,
      color: 'purple'
    },
    {
      id: 'appointment',
      name: 'Medical Appointment',
      description: 'Schedule or record an appointment',
      icon: Calendar,
      color: 'orange'
    },
    {
      id: 'record',
      name: 'Health Record',
      description: 'Add test results or medical documents',
      icon: FileText,
      color: 'indigo'
    }
  ];

  const handleTypeSelect = (type: string) => {
    setSelectedType(type);
    setStep('form');
    setFormData({});
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSaveToDatabase();
  };

  const handleSaveToDatabase = async () => {
    setIsSubmitting(true);
    
    try {
      let result;
      
      switch (selectedType) {
        case 'medication':
          result = await createMedication({
            name: formData.name,
            dosage: formData.dosage,
            frequency: formData.frequency,
            start_date: formData.startDate,
            prescribing_doctor: formData.doctor,
            notes: formData.notes
          });
          break;
          
        case 'immunization':
          result = await createImmunization({
            vaccine_name: formData.name,
            administered_date: formData.date,
            provider: formData.provider,
            notes: formData.notes
          });
          break;
          
        case 'vitals':
          result = await createVitals({
            weight: formData.weight,
            blood_pressure_systolic: formData.bloodPressure ? parseInt(formData.bloodPressure.split('/')[0]) : null,
            blood_pressure_diastolic: formData.bloodPressure ? parseInt(formData.bloodPressure.split('/')[1]) : null,
            heart_rate: formData.heartRate ? parseInt(formData.heartRate.replace(' bpm', '')) : null,
            temperature: formData.temperature ? parseFloat(formData.temperature.replace('°F', '')) : null,
            recorded_date: formData.date,
            notes: formData.notes
          });
          break;
          
        case 'exercise':
          result = await createExerciseLog({
            activity_type: formData.type,
            duration_minutes: parseInt(formData.duration),
            intensity: formData.intensity,
            exercise_date: formData.date,
            notes: formData.notes
          });
          break;
          
        case 'appointment':
          const appointmentDateTime = new Date(`${formData.date}T${formData.time}`).toISOString();
          result = await createAppointment({
            title: `${formData.type} - ${formData.provider}`,
            description: formData.notes,
            appointment_date: appointmentDateTime,
            type: formData.type.toLowerCase().replace(' ', '-'),
            location: formData.provider,
            notes: formData.notes
          });
          break;
          
        case 'record':
          result = await createHealthRecord({
            type: formData.type,
            title: formData.title,
            description: formData.description,
            date: formData.date,
            provider: formData.provider
          });
          break;
          
        default:
          throw new Error('Unknown update type');
      }
      
      if (result?.error) {
        throw result.error;
      }
      
      // Success - close modal and reset
      onClose();
      setStep('select');
      setSelectedType('');
      setFormData({});
      
    } catch (error) {
      console.error('Error saving health update:', error);
      alert('Failed to save health update. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    setStep('select');
    setSelectedType('');
    setFormData({});
  };

  const renderForm = () => {
    const selectedTypeData = updateTypes.find(t => t.id === selectedType);
    
    switch (selectedType) {
      case 'medication':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Medication Name *</label>
              <input
                type="text"
                value={formData.name || ''}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., Lisinopril"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Dosage *</label>
                <input
                  type="text"
                  value={formData.dosage || ''}
                  onChange={(e) => setFormData({ ...formData, dosage: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., 10mg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Frequency *</label>
                <select
                  value={formData.frequency || ''}
                  onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Select frequency</option>
                  <option value="Once daily">Once daily</option>
                  <option value="Twice daily">Twice daily</option>
                  <option value="Three times daily">Three times daily</option>
                  <option value="As needed">As needed</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Start Date *</label>
              <input
                type="date"
                value={formData.startDate || ''}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>
        );

      case 'immunization':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Vaccine Name *</label>
              <input
                type="text"
                value={formData.name || ''}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., COVID-19, Flu Shot"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date Administered *</label>
              <input
                type="date"
                value={formData.date || ''}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Healthcare Provider</label>
              <input
                type="text"
                value={formData.provider || ''}
                onChange={(e) => setFormData({ ...formData, provider: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., City Health Center"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
              <textarea
                value={formData.notes || ''}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Any additional notes..."
                rows={3}
              />
            </div>
          </div>
        );

      case 'vitals':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Weight</label>
                <input
                  type="text"
                  value={formData.weight || ''}
                  onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., 175 lbs"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Blood Pressure</label>
                <input
                  type="text"
                  value={formData.bloodPressure || ''}
                  onChange={(e) => setFormData({ ...formData, bloodPressure: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., 120/80"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Heart Rate</label>
                <input
                  type="text"
                  value={formData.heartRate || ''}
                  onChange={(e) => setFormData({ ...formData, heartRate: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., 72 bpm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Temperature</label>
                <input
                  type="text"
                  value={formData.temperature || ''}
                  onChange={(e) => setFormData({ ...formData, temperature: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., 98.6°F"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date Recorded *</label>
              <input
                type="date"
                value={formData.date || ''}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>
        );

      case 'exercise':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Activity Type *</label>
              <select
                value={formData.type || ''}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Select activity</option>
                <option value="Running">Running</option>
                <option value="Walking">Walking</option>
                <option value="Cycling">Cycling</option>
                <option value="Swimming">Swimming</option>
                <option value="Yoga">Yoga</option>
                <option value="Weight Training">Weight Training</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Duration (minutes) *</label>
                <input
                  type="number"
                  value={formData.duration || ''}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="30"
                  min="1"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Intensity</label>
                <select
                  value={formData.intensity || ''}
                  onChange={(e) => setFormData({ ...formData, intensity: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select intensity</option>
                  <option value="Low">Low</option>
                  <option value="Moderate">Moderate</option>
                  <option value="High">High</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date *</label>
              <input
                type="date"
                value={formData.date || ''}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
              <textarea
                value={formData.notes || ''}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="How did you feel? Any observations..."
                rows={3}
              />
            </div>
          </div>
        );

      case 'appointment':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Appointment Type *</label>
              <select
                value={formData.type || ''}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Select type</option>
                <option value="General Checkup">General Checkup</option>
                <option value="Specialist Visit">Specialist Visit</option>
                <option value="Follow-up">Follow-up</option>
                <option value="Emergency">Emergency</option>
                <option value="Consultation">Consultation</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Healthcare Provider *</label>
              <input
                type="text"
                value={formData.provider || ''}
                onChange={(e) => setFormData({ ...formData, provider: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., Dr. Sarah Johnson"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date *</label>
                <input
                  type="date"
                  value={formData.date || ''}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Time *</label>
                <input
                  type="time"
                  value={formData.time || ''}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
              <textarea
                value={formData.notes || ''}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Reason for visit, symptoms, etc..."
                rows={3}
              />
            </div>
          </div>
        );

      case 'record':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Record Type *</label>
              <select
                value={formData.type || ''}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Select type</option>
                <option value="test">Lab Test Results</option>
                <option value="surgery">Surgery</option>
                <option value="admission">Hospital Admission</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
              <input
                type="text"
                value={formData.title || ''}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., Blood Work Results"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date *</label>
              <input
                type="date"
                value={formData.date || ''}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Healthcare Provider</label>
              <input
                type="text"
                value={formData.provider || ''}
                onChange={(e) => setFormData({ ...formData, provider: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., City Medical Center"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Details about the record..."
                rows={3}
              />
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center py-8">
            <p className="text-gray-600">Form for {selectedTypeData?.name} coming soon...</p>
          </div>
        );
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">
            {step === 'select' ? 'Add Health Update' : updateTypes.find(t => t.id === selectedType)?.name}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="overflow-y-auto max-h-[calc(90vh-140px)]">
          {step === 'select' ? (
            /* Type Selection */
            <div className="p-6">
              <p className="text-gray-600 mb-6">What type of health update would you like to add?</p>
              <div className="space-y-3">
                {updateTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => handleTypeSelect(type.id)}
                    className={`w-full flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:border-${type.color}-300 hover:bg-${type.color}-50 transition-colors group`}
                  >
                    <div className={`bg-${type.color}-100 p-3 rounded-lg group-hover:bg-${type.color}-200 transition-colors`}>
                      <type.icon className={`w-5 h-5 text-${type.color}-600`} />
                    </div>
                    <div className="flex-1 text-left">
                      <h3 className="font-medium text-gray-900">{type.name}</h3>
                      <p className="text-sm text-gray-600">{type.description}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* Form */
            <form onSubmit={handleSubmit} className="p-6">
              {renderForm()}
              
              <div className="flex space-x-3 mt-6 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={handleBack}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  disabled={isSubmitting}
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Saving...' : 'Save Update'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default HealthUpdateModal;