import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { User } from '@supabase/supabase-js';
import { Database } from '../lib/database.types';

type Profile = Database['public']['Tables']['profiles']['Row'];
type HealthProvider = Database['public']['Tables']['health_providers']['Row'];
type Medication = Database['public']['Tables']['medications']['Row'];
type HealthRecord = Database['public']['Tables']['health_records']['Row'];
type HealthTask = Database['public']['Tables']['health_tasks']['Row'];
type Notification = Database['public']['Tables']['notifications']['Row'];

export const useSupabase = () => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id);
      }
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null);
        if (session?.user) {
          await fetchProfile(session.user.id);
        } else {
          setProfile(null);
        }
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching profile:', error);
        return;
      }

      setProfile(data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const signUp = async (email: string, password: string, profileData: Partial<Profile>) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;

      if (data.user) {
        // Create profile
        const { error: profileError } = await supabase
          .from('profiles')
          .insert({
            id: data.user.id,
            email,
            full_name: profileData.full_name || '',
            age: profileData.age,
            sex: profileData.sex,
            location: profileData.location,
            smoker: profileData.smoker || false,
            drinker: profileData.drinker || false,
            health_habits: profileData.health_habits || [],
          });

        if (profileError) throw profileError;
      }

      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      return { data, error };
    } catch (error) {
      return { data: null, error };
    }
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      setUser(null);
      setProfile(null);
    }
    return { error };
  };

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!user) return { error: new Error('No user logged in') };

    try {
      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id)
        .select()
        .single();

      if (error) throw error;

      setProfile(data);
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  };

  // Health data fetching functions
  const fetchHealthProviders = async () => {
    const { data, error } = await supabase
      .from('health_providers')
      .select('*')
      .order('rating', { ascending: false });

    return { data: data || [], error };
  };

  const fetchMedications = async () => {
    if (!user) return { data: [], error: new Error('No user logged in') };

    const { data, error } = await supabase
      .from('medications')
      .select('*')
      .eq('user_id', user.id)
      .eq('active', true)
      .order('created_at', { ascending: false });

    return { data: data || [], error };
  };

  const fetchHealthRecords = async () => {
    if (!user) return { data: [], error: new Error('No user logged in') };

    const { data, error } = await supabase
      .from('health_records')
      .select('*')
      .eq('user_id', user.id)
      .order('date', { ascending: false });

    return { data: data || [], error };
  };

  const fetchHealthTasks = async () => {
    if (!user) return { data: [], error: new Error('No user logged in') };

    const { data, error } = await supabase
      .from('health_tasks')
      .select('*')
      .eq('user_id', user.id)
      .order('due_date', { ascending: true });

    return { data: data || [], error };
  };

  const fetchNotifications = async () => {
    if (!user) return { data: [], error: new Error('No user logged in') };

    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    return { data: data || [], error };
  };

  // Health data creation functions
  const createMedication = async (medication: Database['public']['Tables']['medications']['Insert']) => {
    if (!user) return { error: new Error('No user logged in') };

    const { data, error } = await supabase
      .from('medications')
      .insert({ ...medication, user_id: user.id })
      .select()
      .single();

    return { data, error };
  };

  const createHealthRecord = async (record: Database['public']['Tables']['health_records']['Insert']) => {
    if (!user) return { error: new Error('No user logged in') };

    const { data, error } = await supabase
      .from('health_records')
      .insert({ ...record, user_id: user.id })
      .select()
      .single();

    return { data, error };
  };

  const createImmunization = async (immunization: Database['public']['Tables']['immunizations']['Insert']) => {
    if (!user) return { error: new Error('No user logged in') };

    const { data, error } = await supabase
      .from('immunizations')
      .insert({ ...immunization, user_id: user.id })
      .select()
      .single();

    return { data, error };
  };

  const createVitals = async (vitals: Database['public']['Tables']['vitals']['Insert']) => {
    if (!user) return { error: new Error('No user logged in') };

    const { data, error } = await supabase
      .from('vitals')
      .insert({ ...vitals, user_id: user.id })
      .select()
      .single();

    return { data, error };
  };

  const createExerciseLog = async (exercise: Database['public']['Tables']['exercise_logs']['Insert']) => {
    if (!user) return { error: new Error('No user logged in') };

    const { data, error } = await supabase
      .from('exercise_logs')
      .insert({ ...exercise, user_id: user.id })
      .select()
      .single();

    return { data, error };
  };

  const createAppointment = async (appointment: Database['public']['Tables']['appointments']['Insert']) => {
    if (!user) return { error: new Error('No user logged in') };

    const { data, error } = await supabase
      .from('appointments')
      .insert({ ...appointment, user_id: user.id })
      .select()
      .single();

    return { data, error };
  };

  const logMood = async (emotionValue: number, emotionLabel: string, notes?: string) => {
    if (!user) return { error: new Error('No user logged in') };

    const { data, error } = await supabase
      .from('mood_logs')
      .insert({
        user_id: user.id,
        emotion_value: emotionValue,
        emotion_label: emotionLabel,
        notes,
        logged_date: new Date().toISOString().split('T')[0]
      })
      .select()
      .single();

    return { data, error };
  };

  const markNotificationAsRead = async (notificationId: string) => {
    const { data, error } = await supabase
      .from('notifications')
      .update({ read: true })
      .eq('id', notificationId)
      .select()
      .single();

    return { data, error };
  };

  return {
    user,
    profile,
    loading,
    signUp,
    signIn,
    signOut,
    updateProfile,
    fetchHealthProviders,
    fetchMedications,
    fetchHealthRecords,
    fetchHealthTasks,
    fetchNotifications,
    createMedication,
    createHealthRecord,
    createImmunization,
    createVitals,
    createExerciseLog,
    createAppointment,
    logMood,
    markNotificationAsRead,
  };
};