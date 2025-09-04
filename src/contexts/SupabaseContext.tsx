import React, { createContext, useContext, ReactNode } from 'react';
import { useSupabase } from '../hooks/useSupabase';
import { User } from '@supabase/supabase-js';
import { Database } from '../lib/database.types';

type Profile = Database['public']['Tables']['profiles']['Row'];

interface SupabaseContextType {
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  signUp: (email: string, password: string, profileData: Partial<Profile>) => Promise<any>;
  signIn: (email: string, password: string) => Promise<any>;
  signOut: () => Promise<any>;
  updateProfile: (updates: Partial<Profile>) => Promise<any>;
  fetchHealthProviders: () => Promise<any>;
  fetchMedications: () => Promise<any>;
  fetchHealthRecords: () => Promise<any>;
  fetchHealthTasks: () => Promise<any>;
  fetchNotifications: () => Promise<any>;
  createMedication: (medication: Database['public']['Tables']['medications']['Insert']) => Promise<any>;
  createHealthRecord: (record: Database['public']['Tables']['health_records']['Insert']) => Promise<any>;
  createImmunization: (immunization: Database['public']['Tables']['immunizations']['Insert']) => Promise<any>;
  createVitals: (vitals: Database['public']['Tables']['vitals']['Insert']) => Promise<any>;
  createExerciseLog: (exercise: Database['public']['Tables']['exercise_logs']['Insert']) => Promise<any>;
  createAppointment: (appointment: Database['public']['Tables']['appointments']['Insert']) => Promise<any>;
  logMood: (emotionValue: number, emotionLabel: string, notes?: string) => Promise<any>;
  markNotificationAsRead: (notificationId: string) => Promise<any>;
}

const SupabaseContext = createContext<SupabaseContextType | undefined>(undefined);

export const useSupabaseContext = () => {
  const context = useContext(SupabaseContext);
  if (!context) {
    throw new Error('useSupabaseContext must be used within SupabaseProvider');
  }
  return context;
};

export const SupabaseProvider = ({ children }: { children: ReactNode }) => {
  const supabaseHook = useSupabase();

  return (
    <SupabaseContext.Provider value={supabaseHook}>
      {children}
    </SupabaseContext.Provider>
  );
};