import React, { useState } from 'react';
import { 
  Calendar, 
  Target, 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  Circle,
  Award,
  Users,
  Activity,
  Heart,
  Baby,
  User
} from 'lucide-react';
import { useAppContext } from '../contexts/AppContext';

const Program = () => {
  const { user } = useAppContext();
  const [selectedProgram, setSelectedProgram] = useState<string | null>(null);

  // Mock healthcare programs data
  const healthcarePrograms = [
    {
      id: 'youth-health',
      name: 'Youth Health Program',
      description: 'Comprehensive health program for young adults (18-35)',
      icon: Activity,
      color: 'blue',
      enrolled: true,
      progress: 75,
      startDate: '2024-01-15',
      duration: '6 months',
      activities: [
        { id: 1, name: 'Monthly Health Checkup', completed: true, dueDate: '2024-01-30' },
        { id: 2, name: 'Fitness Assessment', completed: true, dueDate: '2024-02-15' },
        { id: 3, name: 'Nutrition Counseling', completed: false, dueDate: '2024-03-01' },
        { id: 4, name: 'Mental Health Screening', completed: false, dueDate: '2024-03-15' }
      ],
      milestones: [
        { id: 1, name: 'Complete Initial Assessment', achieved: true, date: '2024-01-20' },
        { id: 2, name: 'Achieve Fitness Goals', achieved: false, targetDate: '2024-04-01' },
        { id: 3, name: 'Complete Program', achieved: false, targetDate: '2024-07-15' }
      ],
      schedule: [
        { day: 'Monday', time: '9:00 AM', activity: 'Fitness Session' },
        { day: 'Wednesday', time: '2:00 PM', activity: 'Nutrition Consultation' },
        { day: 'Friday', time: '10:00 AM', activity: 'Health Monitoring' }
      ]
    },
    {
      id: 'pregnancy-care',
      name: 'Pregnancy Care Program',
      description: 'Comprehensive prenatal and postnatal care program',
      icon: Baby,
      color: 'pink',
      enrolled: false,
      progress: 0,
      startDate: null,
      duration: '9 months',
      activities: [
        { id: 1, name: 'Prenatal Checkups', completed: false, dueDate: 'Weekly' },
        { id: 2, name: 'Ultrasound Scans', completed: false, dueDate: 'Monthly' },
        { id: 3, name: 'Nutrition Planning', completed: false, dueDate: 'Ongoing' },
        { id: 4, name: 'Birth Preparation Classes', completed: false, dueDate: 'Trimester 3' }
      ],
      milestones: [
        { id: 1, name: 'First Trimester Completion', achieved: false, targetDate: 'Week 12' },
        { id: 2, name: 'Second Trimester Completion', achieved: false, targetDate: 'Week 24' },
        { id: 3, name: 'Safe Delivery', achieved: false, targetDate: 'Week 40' }
      ],
      schedule: [
        { day: 'Tuesday', time: '10:00 AM', activity: 'Prenatal Checkup' },
        { day: 'Thursday', time: '3:00 PM', activity: 'Nutrition Counseling' },
        { day: 'Saturday', time: '11:00 AM', activity: 'Birth Preparation Class' }
      ]
    },
    {
      id: 'senior-care',
      name: 'Senior Care Program',
      description: 'Specialized healthcare program for adults 65+',
      icon: User,
      color: 'green',
      enrolled: false,
      progress: 0,
      startDate: null,
      duration: 'Ongoing',
      activities: [
        { id: 1, name: 'Regular Health Monitoring', completed: false, dueDate: 'Weekly' },
        { id: 2, name: 'Medication Management', completed: false, dueDate: 'Daily' },
        { id: 3, name: 'Physical Therapy', completed: false, dueDate: 'Bi-weekly' },
        { id: 4, name: 'Social Activities', completed: false, dueDate: 'Weekly' }
      ],
      milestones: [
        { id: 1, name: 'Complete Health Assessment', achieved: false, targetDate: 'Month 1' },
        { id: 2, name: 'Establish Care Plan', achieved: false, targetDate: 'Month 2' },
        { id: 3, name: '6-Month Review', achieved: false, targetDate: 'Month 6' }
      ],
      schedule: [
        { day: 'Monday', time: '9:00 AM', activity: 'Health Monitoring' },
        { day: 'Wednesday', time: '11:00 AM', activity: 'Physical Therapy' },
        { day: 'Friday', time: '2:00 PM', activity: 'Social Activities' }
      ]
    }
  ];

  const enrolledPrograms = healthcarePrograms.filter(program => program.enrolled);

  const renderProgramCard = (program: any) => (
    <div
      key={program.id}
      className={`bg-white rounded-xl shadow-sm border border-gray-100 p-6 cursor-pointer transition-all hover:shadow-md ${
        selectedProgram === program.id ? 'ring-2 ring-blue-500' : ''
      }`}
      onClick={() => setSelectedProgram(selectedProgram === program.id ? null : program.id)}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`bg-${program.color}-100 p-3 rounded-lg`}>
            <program.icon className={`w-6 h-6 text-${program.color}-600`} />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{program.name}</h3>
            <p className="text-sm text-gray-600">{program.description}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {program.enrolled ? (
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
              Enrolled
            </span>
          ) : (
            <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium hover:bg-blue-200 transition-colors">
              Enroll
            </button>
          )}
        </div>
      </div>

      {program.enrolled && (
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Progress</span>
            <span className="text-sm font-medium text-gray-900">{program.progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`bg-${program.color}-500 h-2 rounded-full transition-all duration-300`}
              style={{ width: `${program.progress}%` }}
            ></div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
        <div>
          <span className="font-medium">Duration:</span> {program.duration}
        </div>
        {program.startDate && (
          <div>
            <span className="font-medium">Started:</span> {new Date(program.startDate).toLocaleDateString()}
          </div>
        )}
      </div>

      {selectedProgram === program.id && (
        <div className="mt-6 pt-6 border-t border-gray-100">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Activities */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                Activities
              </h4>
              <div className="space-y-2">
                {program.activities.map((activity: any) => (
                  <div key={activity.id} className="flex items-center space-x-2">
                    {activity.completed ? (
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    ) : (
                      <Circle className="w-4 h-4 text-gray-400" />
                    )}
                    <div className="flex-1">
                      <p className={`text-sm ${activity.completed ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
                        {activity.name}
                      </p>
                      <p className="text-xs text-gray-500">Due: {activity.dueDate}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Milestones */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                <Award className="w-4 h-4 mr-2 text-yellow-600" />
                Milestones
              </h4>
              <div className="space-y-2">
                {program.milestones.map((milestone: any) => (
                  <div key={milestone.id} className="flex items-center space-x-2">
                    {milestone.achieved ? (
                      <Award className="w-4 h-4 text-yellow-600" />
                    ) : (
                      <Circle className="w-4 h-4 text-gray-400" />
                    )}
                    <div className="flex-1">
                      <p className={`text-sm ${milestone.achieved ? 'text-gray-900 font-medium' : 'text-gray-700'}`}>
                        {milestone.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {milestone.achieved ? `Achieved: ${milestone.date}` : `Target: ${milestone.targetDate}`}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Schedule */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                <Calendar className="w-4 h-4 mr-2 text-blue-600" />
                Schedule
              </h4>
              <div className="space-y-2">
                {program.schedule.map((item: any, index: number) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">{item.activity}</p>
                      <p className="text-xs text-gray-500">{item.day} at {item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Healthcare Programs</h1>
        <p className="text-gray-600">Manage your enrolled healthcare programs and track your progress</p>
      </div>

      {/* Program Summary */}
      {enrolledPrograms.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Program Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {enrolledPrograms.map((program) => (
              <div key={program.id} className="text-center">
                <div className={`bg-${program.color}-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2`}>
                  <program.icon className={`w-6 h-6 text-${program.color}-600`} />
                </div>
                <h3 className="font-medium text-gray-900 mb-1">{program.name}</h3>
                <div className="flex items-center justify-center space-x-2">
                  <div className={`w-16 h-2 bg-gray-200 rounded-full`}>
                    <div
                      className={`bg-${program.color}-500 h-2 rounded-full`}
                      style={{ width: `${program.progress}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900">{program.progress}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Available Programs */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-900">Available Programs</h2>
        {healthcarePrograms.map(renderProgramCard)}
      </div>

      {enrolledPrograms.length === 0 && (
        <div className="text-center py-12">
          <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Programs Enrolled</h3>
          <p className="text-gray-600 max-w-sm mx-auto">
            Enroll in healthcare programs to track your progress and receive personalized care.
          </p>
        </div>
      )}
    </div>
  );
};

export default Program;