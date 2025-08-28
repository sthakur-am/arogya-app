export interface User {
  id: string;
  email: string;
  name: string;
  age: number;
  sex: 'male' | 'female' | 'other';
  location: string;
  smoker?: boolean;
  drinker?: boolean;
  healthHabits?: string[];
  healthScore: number;
  lastCheckIn: Date;
  vitals?: {
    height?: string;
    weight?: string;
    bloodType?: string;
    bloodPressure?: string;
    heartRate?: string;
  };
  allergies?: string[];
  medications?: Array<{
    id: string;
    name: string;
    dosage: string;
    frequency: string;
    startDate: Date;
    endDate?: Date;
  }>;
  healthRecords?: Array<{
    id: string;
    type: 'immunization' | 'admission' | 'surgery' | 'test' | 'other';
    title: string;
    date: Date;
    description?: string;
    provider?: string;
  }>;
  healthHistory?: Array<{
    id: string;
    condition: string;
    diagnosedDate: Date;
    status: 'active' | 'resolved' | 'chronic';
    notes?: string;
  }>;
}

export interface EmotionType {
  id: string;
  emoji: string;
  label: string;
  value: number;
}

export interface HealthTask {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  status: 'pending' | 'completed' | 'overdue';
  priority: 'low' | 'medium' | 'high';
}

export interface HealthEvent {
  id: string;
  title: string;
  date: Date;
  type: 'appointment' | 'medication' | 'exercise' | 'checkup';
  description?: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  date: Date;
  read: boolean;
  type: 'info' | 'warning' | 'success';
}

export interface HealthProvider {
  id: string;
  name: string;
  type: 'primary-care' | 'specialist' | 'nursing' | 'lab' | 'pharmacy' | 'other';
  specialty?: string;
  address: string;
  phone: string;
  email?: string;
  rating: number;
  distance: string;
  acceptingPatients: boolean;
  insuranceAccepted: string[];
}

export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}