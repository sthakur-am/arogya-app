import React, { useState } from 'react';
import { 
  Calendar, 
  CheckSquare, 
  FileText, 
  MessageCircle, 
  X,
  Plus,
  Clock,
  User
} from 'lucide-react';

interface WorkspaceProps {
  isOpen: boolean;
  onClose: () => void;
}

const Workspace = ({ isOpen, onClose }: WorkspaceProps) => {
  const [activeTab, setActiveTab] = useState('calendar');

  if (!isOpen) return null;

  const tabs = [
    { id: 'calendar', name: 'Calendar', icon: Calendar },
    { id: 'tasks', name: 'Tasks', icon: CheckSquare },
    { id: 'documents', name: 'Documents', icon: FileText },
    { id: 'messages', name: 'Messages', icon: MessageCircle },
  ];

  const mockEvents = [
    { id: 1, title: 'Doctor Appointment', time: '10:00 AM', date: 'Today' },
    { id: 2, title: 'Lab Results Review', time: '2:30 PM', date: 'Tomorrow' },
    { id: 3, title: 'Physical Therapy', time: '9:00 AM', date: 'Friday' },
  ];

  const mockTasks = [
    { id: 1, title: 'Take morning medication', completed: false, priority: 'high' },
    { id: 2, title: 'Schedule annual checkup', completed: false, priority: 'medium' },
    { id: 3, title: 'Update insurance information', completed: true, priority: 'low' },
  ];

  const mockDocuments = [
    { id: 1, name: 'Lab Results - Blood Work', date: '2024-01-15', type: 'PDF' },
    { id: 2, name: 'Prescription - Lisinopril', date: '2024-01-10', type: 'PDF' },
    { id: 3, name: 'Insurance Card', date: '2024-01-01', type: 'Image' },
  ];

  const mockMessages = [
    { id: 1, sender: 'Dr. Johnson', message: 'Your test results look good...', time: '2h ago' },
    { id: 2, sender: 'Pharmacy', message: 'Your prescription is ready...', time: '4h ago' },
    { id: 3, sender: 'Insurance', message: 'Claim processed successfully...', time: '1d ago' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'calendar':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">Upcoming Events</h3>
              <button className="flex items-center space-x-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm hover:bg-blue-200 transition-colors">
                <Plus className="w-4 h-4" />
                <span>Add Event</span>
              </button>
            </div>
            <div className="space-y-3">
              {mockEvents.map((event) => (
                <div key={event.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <Calendar className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{event.title}</h4>
                    <p className="text-sm text-gray-600">{event.date} at {event.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'tasks':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">Health Tasks</h3>
              <button className="flex items-center space-x-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm hover:bg-blue-200 transition-colors">
                <Plus className="w-4 h-4" />
                <span>Add Task</span>
              </button>
            </div>
            <div className="space-y-3">
              {mockTasks.map((task) => (
                <div key={task.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    className="w-4 h-4 text-blue-600 rounded"
                    readOnly
                  />
                  <div className="flex-1">
                    <h4 className={`font-medium ${task.completed ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
                      {task.title}
                    </h4>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      task.priority === 'high' ? 'bg-red-100 text-red-700' :
                      task.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {task.priority} priority
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'documents':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">Recent Documents</h3>
              <button className="flex items-center space-x-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm hover:bg-blue-200 transition-colors">
                <Plus className="w-4 h-4" />
                <span>Upload</span>
              </button>
            </div>
            <div className="space-y-3">
              {mockDocuments.map((doc) => (
                <div key={doc.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <FileText className="w-4 h-4 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{doc.name}</h4>
                    <p className="text-sm text-gray-600">{doc.type} • {doc.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'messages':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">Recent Messages</h3>
              <button className="flex items-center space-x-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm hover:bg-blue-200 transition-colors">
                <Plus className="w-4 h-4" />
                <span>Compose</span>
              </button>
            </div>
            <div className="space-y-3">
              {mockMessages.map((message) => (
                <div key={message.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="bg-purple-100 p-2 rounded-lg">
                    <User className="w-4 h-4 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium text-gray-900">{message.sender}</h4>
                      <span className="text-xs text-gray-500">{message.time}</span>
                    </div>
                    <p className="text-sm text-gray-600">{message.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Workspace</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-6 py-4 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.name}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 p-6 overflow-y-auto">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Workspace;