import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, EmotionType, HealthTask, HealthEvent, Notification, HealthProvider, ChatMessage } from '../types';

interface AppContextType {
  user: User | null;
  isAuthenticated: boolean;
  showLogin: boolean;
  currentStep: number;
  showEmotionSelector: boolean;
  selectedEmotion: EmotionType | null;
  healthTasks: HealthTask[];
  healthEvents: HealthEvent[];
  notifications: Notification[];
  healthProviders: HealthProvider[];
  chatMessages: ChatMessage[];
  showChat: boolean;
  showWorkspace: boolean;
  setUser: (user: User | null) => void;
  setIsAuthenticated: (auth: boolean) => void;
  setShowLogin: (show: boolean) => void;
  setCurrentStep: (step: number) => void;
  setShowEmotionSelector: (show: boolean) => void;
  setSelectedEmotion: (emotion: EmotionType | null) => void;
  setShowChat: (show: boolean) => void;
  setShowWorkspace: (show: boolean) => void;
  login: (email: string, password: string) => boolean;
  signup: (userData: Partial<User>) => void;
  logout: () => void;
  sendMessage: (message: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};

const mockHealthTasks: HealthTask[] = [
  {
    id: '1',
    title: 'Take Morning Medication',
    description: 'Take prescribed vitamins and supplements',
    dueDate: new Date(),
    status: 'pending',
    priority: 'high'
  },
  {
    id: '2',
    title: 'Schedule Annual Checkup',
    description: 'Book appointment with primary care physician',
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    status: 'pending',
    priority: 'medium'
  },
  {
    id: '3',
    title: 'Exercise Session',
    description: '30 minutes cardio workout',
    dueDate: new Date(Date.now() + 2 * 60 * 60 * 1000),
    status: 'pending',
    priority: 'medium'
  }
];

const mockHealthEvents: HealthEvent[] = [
  {
    id: '1',
    title: 'Cardiology Appointment',
    date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    type: 'appointment',
    description: 'Regular heart check-up'
  },
  {
    id: '2',
    title: 'Medication Refill',
    date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    type: 'medication',
    description: 'Pick up prescription from pharmacy'
  },
  {
    id: '3',
    title: 'Fitness Class',
    date: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
    type: 'exercise',
    description: 'Yoga session at community center'
  }
];

const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'Health Score Improved',
    message: 'Your health score increased by 5 points this week!',
    date: new Date(Date.now() - 2 * 60 * 60 * 1000),
    read: false,
    type: 'success'
  },
  {
    id: '2',
    title: 'Medication Reminder',
    message: 'Don\'t forget to take your evening medication',
    date: new Date(Date.now() - 30 * 60 * 1000),
    read: false,
    type: 'info'
  },
  {
    id: '3',
    title: 'Appointment Confirmed',
    message: 'Your appointment with Dr. Smith is confirmed for tomorrow',
    date: new Date(Date.now() - 4 * 60 * 60 * 1000),
    read: true,
    type: 'info'
  }
];

const mockHealthProviders: HealthProvider[] = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    type: 'primary-care',
    address: '123 Main St, City, State 12345',
    phone: '(555) 123-4567',
    email: 'sarah.johnson@healthcare.com',
    rating: 4.8,
    distance: '0.5 miles',
    acceptingPatients: true,
    insuranceAccepted: ['Blue Cross', 'Aetna', 'Cigna']
  },
  {
    id: '2',
    name: 'Heart Specialists Clinic',
    type: 'specialist',
    specialty: 'Cardiology',
    address: '456 Oak Ave, City, State 12345',
    phone: '(555) 234-5678',
    rating: 4.9,
    distance: '1.2 miles',
    acceptingPatients: true,
    insuranceAccepted: ['Blue Cross', 'United Healthcare']
  },
  {
    id: '3',
    name: 'City Lab Services',
    type: 'lab',
    address: '789 Pine St, City, State 12345',
    phone: '(555) 345-6789',
    rating: 4.6,
    distance: '0.8 miles',
    acceptingPatients: true,
    insuranceAccepted: ['Most Insurance Plans']
  },
  {
    id: '4',
    name: 'MediCare Pharmacy',
    type: 'pharmacy',
    address: '321 Elm St, City, State 12345',
    phone: '(555) 456-7890',
    rating: 4.7,
    distance: '0.3 miles',
    acceptingPatients: true,
    insuranceAccepted: ['Most Insurance Plans']
  }
];

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [showEmotionSelector, setShowEmotionSelector] = useState(false);
  const [selectedEmotion, setSelectedEmotion] = useState<EmotionType | null>(null);
  const [healthTasks] = useState<HealthTask[]>(mockHealthTasks);
  const [healthEvents] = useState<HealthEvent[]>(mockHealthEvents);
  const [notifications] = useState<Notification[]>(mockNotifications);
  const [healthProviders] = useState<HealthProvider[]>(mockHealthProviders);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [showChat, setShowChat] = useState(false);
  const [showWorkspace, setShowWorkspace] = useState(false);

  const login = (email: string, password: string): boolean => {
    // Simple authentication - in production, this would be handled by a backend
    if (password === 'password123') {
      const mockUser: User = {
        id: '1',
        email: email,
        name: 'John Doe',
        age: 35,
        sex: 'male',
        location: 'New York, NY',
        smoker: false,
        drinker: false,
        healthHabits: ['Regular Exercise', 'Healthy Diet'],
        healthScore: 78,
        lastCheckIn: new Date(Date.now() - 24 * 60 * 60 * 1000),
        vitals: {
          height: '5\'10"',
          weight: '175 lbs',
          bloodType: 'O+',
          bloodPressure: '120/80',
          heartRate: '72 bpm'
        },
        allergies: ['Peanuts', 'Shellfish'],
        medications: [
          {
            id: '1',
            name: 'Lisinopril',
            dosage: '10mg',
            frequency: 'Once daily',
            startDate: new Date('2024-01-01')
          }
        ],
        healthRecords: [
          {
            id: '1',
            type: 'immunization',
            title: 'COVID-19 Vaccine',
            date: new Date('2024-01-15'),
            provider: 'City Health Center'
          }
        ],
        healthHistory: [
          {
            id: '1',
            condition: 'Hypertension',
            diagnosedDate: new Date('2023-06-01'),
            status: 'active',
            notes: 'Well controlled with medication'
          }
        ]
      };
      
      setUser(mockUser);
      setIsAuthenticated(true);
      setShowEmotionSelector(true);
      return true;
    }
    return false;
  };

  const signup = (userData: Partial<User>) => {
    const newUser: User = {
      id: '1',
      email: userData.email || '',
      name: userData.name || '',
      age: userData.age || 0,
      sex: userData.sex || 'other',
      location: userData.location || '',
      smoker: userData.smoker,
      drinker: userData.drinker,
      healthHabits: userData.healthHabits,
      healthScore: 78,
      lastCheckIn: new Date(Date.now() - 24 * 60 * 60 * 1000)
    };
    
    setUser(newUser);
    setIsAuthenticated(true);
    setShowEmotionSelector(true);
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setShowLogin(true);
    setCurrentStep(0);
    setShowEmotionSelector(false);
    setSelectedEmotion(null);
    setChatMessages([]);
    setShowChat(false);
    setShowWorkspace(false);
  };

  const sendMessage = (message: string) => {
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: message,
      sender: 'user',
      timestamp: new Date()
    };
    
    setChatMessages(prev => [...prev, userMessage]);
    
    // Simulate AI response
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: "I'm here to help with your healthcare questions. Based on your profile, I can provide personalized health advice and reminders. What would you like to know?",
        sender: 'assistant',
        timestamp: new Date()
      };
      setChatMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  return (
    <AppContext.Provider value={{
      user,
      isAuthenticated,
      showLogin,
      currentStep,
      showEmotionSelector,
      selectedEmotion,
      healthTasks,
      healthEvents,
      notifications,
      healthProviders,
      chatMessages,
      showChat,
      showWorkspace,
      setUser,
      setIsAuthenticated,
      setShowLogin,
      setCurrentStep,
      setShowEmotionSelector,
      setSelectedEmotion,
      setShowChat,
      setShowWorkspace,
      login,
      signup,
      logout,
      sendMessage
    }}>
      {children}
    </AppContext.Provider>
  );
};