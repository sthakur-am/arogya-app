/*
  # Healthcare Application Database Schema

  1. New Tables
    - `profiles` - Extended user profiles with health information
    - `health_providers` - Healthcare providers and facilities
    - `medications` - User medications and prescriptions
    - `health_records` - Medical records and documents
    - `health_history` - Medical conditions and diagnoses
    - `appointments` - Medical appointments and consultations
    - `health_tasks` - Health-related tasks and reminders
    - `health_events` - Calendar events for health activities
    - `notifications` - System notifications for users
    - `chat_messages` - Healthcare assistant chat history
    - `vitals` - Vital signs and measurements
    - `immunizations` - Vaccination records
    - `exercise_logs` - Physical activity tracking
    - `mood_logs` - Daily mood and emotion tracking
    - `health_goals` - Personal health objectives
    - `provider_connections` - User connections to healthcare providers

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to access their own data
    - Separate policies for healthcare providers where applicable

  3. Features
    - Comprehensive health tracking
    - Provider network management
    - Appointment scheduling
    - Medication management
    - Health record storage
    - Social features for health community
*/

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Profiles table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  full_name text NOT NULL,
  age integer,
  sex text CHECK (sex IN ('male', 'female', 'other')),
  location text,
  smoker boolean DEFAULT false,
  drinker boolean DEFAULT false,
  health_habits text[] DEFAULT '{}',
  health_score integer DEFAULT 50 CHECK (health_score >= 0 AND health_score <= 100),
  avatar_url text,
  phone text,
  emergency_contact_name text,
  emergency_contact_phone text,
  insurance_provider text,
  insurance_policy_number text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Health providers table
CREATE TABLE IF NOT EXISTS health_providers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  type text NOT NULL CHECK (type IN ('primary-care', 'specialist', 'nursing', 'lab', 'pharmacy', 'hospital', 'clinic', 'other')),
  specialty text,
  address text NOT NULL,
  phone text NOT NULL,
  email text,
  website text,
  rating decimal(2,1) DEFAULT 0.0 CHECK (rating >= 0.0 AND rating <= 5.0),
  distance_miles decimal(4,1),
  accepting_patients boolean DEFAULT true,
  insurance_accepted text[] DEFAULT '{}',
  hours_of_operation jsonb,
  services_offered text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Medications table
CREATE TABLE IF NOT EXISTS medications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  dosage text NOT NULL,
  frequency text NOT NULL,
  start_date date NOT NULL,
  end_date date,
  prescribing_doctor text,
  pharmacy text,
  notes text,
  active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Health records table
CREATE TABLE IF NOT EXISTS health_records (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  type text NOT NULL CHECK (type IN ('immunization', 'admission', 'surgery', 'test', 'imaging', 'consultation', 'other')),
  title text NOT NULL,
  description text,
  date date NOT NULL,
  provider text,
  document_url text,
  results jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Health history table
CREATE TABLE IF NOT EXISTS health_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  condition text NOT NULL,
  diagnosed_date date NOT NULL,
  status text NOT NULL CHECK (status IN ('active', 'resolved', 'chronic', 'monitoring')),
  severity text CHECK (severity IN ('mild', 'moderate', 'severe')),
  notes text,
  diagnosing_provider text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Appointments table
CREATE TABLE IF NOT EXISTS appointments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  provider_id uuid REFERENCES health_providers(id),
  title text NOT NULL,
  description text,
  appointment_date timestamptz NOT NULL,
  duration_minutes integer DEFAULT 30,
  type text NOT NULL CHECK (type IN ('checkup', 'consultation', 'follow-up', 'emergency', 'procedure', 'therapy')),
  status text DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'confirmed', 'completed', 'cancelled', 'no-show')),
  location text,
  notes text,
  reminder_sent boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Health tasks table
CREATE TABLE IF NOT EXISTS health_tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  description text,
  due_date timestamptz NOT NULL,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'overdue', 'cancelled')),
  priority text DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high')),
  category text CHECK (category IN ('medication', 'appointment', 'exercise', 'diet', 'checkup', 'other')),
  completed_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Health events table
CREATE TABLE IF NOT EXISTS health_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  description text,
  event_date timestamptz NOT NULL,
  type text NOT NULL CHECK (type IN ('appointment', 'medication', 'exercise', 'checkup', 'reminder', 'other')),
  all_day boolean DEFAULT false,
  reminder_minutes integer DEFAULT 15,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  message text NOT NULL,
  type text DEFAULT 'info' CHECK (type IN ('info', 'warning', 'success', 'error')),
  read boolean DEFAULT false,
  action_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Chat messages table
CREATE TABLE IF NOT EXISTS chat_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  content text NOT NULL,
  sender text NOT NULL CHECK (sender IN ('user', 'assistant')),
  session_id uuid DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now()
);

-- Vitals table
CREATE TABLE IF NOT EXISTS vitals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  height text,
  weight text,
  blood_type text CHECK (blood_type IN ('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')),
  blood_pressure_systolic integer,
  blood_pressure_diastolic integer,
  heart_rate integer,
  temperature decimal(4,1),
  recorded_date date NOT NULL,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Immunizations table
CREATE TABLE IF NOT EXISTS immunizations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  vaccine_name text NOT NULL,
  administered_date date NOT NULL,
  provider text,
  lot_number text,
  site text,
  next_due_date date,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Exercise logs table
CREATE TABLE IF NOT EXISTS exercise_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  activity_type text NOT NULL,
  duration_minutes integer NOT NULL,
  intensity text CHECK (intensity IN ('low', 'moderate', 'high')),
  calories_burned integer,
  distance decimal(6,2),
  distance_unit text DEFAULT 'miles' CHECK (distance_unit IN ('miles', 'kilometers')),
  exercise_date date NOT NULL,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Mood logs table
CREATE TABLE IF NOT EXISTS mood_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  emotion_value integer NOT NULL CHECK (emotion_value >= 1 AND emotion_value <= 5),
  emotion_label text NOT NULL,
  notes text,
  logged_date date NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Health goals table
CREATE TABLE IF NOT EXISTS health_goals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  description text,
  category text CHECK (category IN ('weight', 'exercise', 'nutrition', 'sleep', 'medication', 'mental-health', 'other')),
  target_value text,
  current_value text,
  target_date date,
  status text DEFAULT 'active' CHECK (status IN ('active', 'completed', 'paused', 'cancelled')),
  progress_percentage integer DEFAULT 0 CHECK (progress_percentage >= 0 AND progress_percentage <= 100),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Provider connections table
CREATE TABLE IF NOT EXISTS provider_connections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  provider_id uuid REFERENCES health_providers(id) ON DELETE CASCADE NOT NULL,
  relationship_type text NOT NULL CHECK (relationship_type IN ('primary-care', 'specialist', 'pharmacy', 'lab', 'other')),
  connected_date date DEFAULT CURRENT_DATE,
  status text DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'pending')),
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, provider_id)
);

-- Allergies table
CREATE TABLE IF NOT EXISTS allergies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  allergen text NOT NULL,
  severity text CHECK (severity IN ('mild', 'moderate', 'severe', 'life-threatening')),
  reaction text,
  diagnosed_date date,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE health_providers ENABLE ROW LEVEL SECURITY;
ALTER TABLE medications ENABLE ROW LEVEL SECURITY;
ALTER TABLE health_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE health_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE health_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE health_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE vitals ENABLE ROW LEVEL SECURITY;
ALTER TABLE immunizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE exercise_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE mood_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE health_goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE provider_connections ENABLE ROW LEVEL SECURITY;
ALTER TABLE allergies ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view own profile"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- RLS Policies for health_providers (public read)
CREATE POLICY "Anyone can view health providers"
  ON health_providers
  FOR SELECT
  TO authenticated
  USING (true);

-- RLS Policies for medications
CREATE POLICY "Users can manage own medications"
  ON medications
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- RLS Policies for health_records
CREATE POLICY "Users can manage own health records"
  ON health_records
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- RLS Policies for health_history
CREATE POLICY "Users can manage own health history"
  ON health_history
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- RLS Policies for appointments
CREATE POLICY "Users can manage own appointments"
  ON appointments
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- RLS Policies for health_tasks
CREATE POLICY "Users can manage own health tasks"
  ON health_tasks
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- RLS Policies for health_events
CREATE POLICY "Users can manage own health events"
  ON health_events
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- RLS Policies for notifications
CREATE POLICY "Users can manage own notifications"
  ON notifications
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- RLS Policies for chat_messages
CREATE POLICY "Users can manage own chat messages"
  ON chat_messages
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- RLS Policies for vitals
CREATE POLICY "Users can manage own vitals"
  ON vitals
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- RLS Policies for immunizations
CREATE POLICY "Users can manage own immunizations"
  ON immunizations
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- RLS Policies for exercise_logs
CREATE POLICY "Users can manage own exercise logs"
  ON exercise_logs
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- RLS Policies for mood_logs
CREATE POLICY "Users can manage own mood logs"
  ON mood_logs
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- RLS Policies for health_goals
CREATE POLICY "Users can manage own health goals"
  ON health_goals
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- RLS Policies for provider_connections
CREATE POLICY "Users can manage own provider connections"
  ON provider_connections
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- RLS Policies for allergies
CREATE POLICY "Users can manage own allergies"
  ON allergies
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Indexes for better performance
CREATE INDEX IF NOT EXISTS idx_medications_user_id ON medications(user_id);
CREATE INDEX IF NOT EXISTS idx_medications_active ON medications(user_id, active);
CREATE INDEX IF NOT EXISTS idx_health_records_user_id ON health_records(user_id);
CREATE INDEX IF NOT EXISTS idx_health_records_type ON health_records(user_id, type);
CREATE INDEX IF NOT EXISTS idx_appointments_user_id ON appointments(user_id);
CREATE INDEX IF NOT EXISTS idx_appointments_date ON appointments(user_id, appointment_date);
CREATE INDEX IF NOT EXISTS idx_health_tasks_user_id ON health_tasks(user_id);
CREATE INDEX IF NOT EXISTS idx_health_tasks_status ON health_tasks(user_id, status);
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_unread ON notifications(user_id, read);
CREATE INDEX IF NOT EXISTS idx_chat_messages_user_id ON chat_messages(user_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_session ON chat_messages(user_id, session_id);
CREATE INDEX IF NOT EXISTS idx_vitals_user_id ON vitals(user_id);
CREATE INDEX IF NOT EXISTS idx_vitals_date ON vitals(user_id, recorded_date);
CREATE INDEX IF NOT EXISTS idx_exercise_logs_user_id ON exercise_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_exercise_logs_date ON exercise_logs(user_id, exercise_date);
CREATE INDEX IF NOT EXISTS idx_mood_logs_user_id ON mood_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_mood_logs_date ON mood_logs(user_id, logged_date);
CREATE INDEX IF NOT EXISTS idx_provider_connections_user_id ON provider_connections(user_id);

-- Functions for automatic timestamp updates
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_health_providers_updated_at BEFORE UPDATE ON health_providers FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_medications_updated_at BEFORE UPDATE ON medications FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_health_records_updated_at BEFORE UPDATE ON health_records FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_health_history_updated_at BEFORE UPDATE ON health_history FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_appointments_updated_at BEFORE UPDATE ON appointments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_health_tasks_updated_at BEFORE UPDATE ON health_tasks FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_health_events_updated_at BEFORE UPDATE ON health_events FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_notifications_updated_at BEFORE UPDATE ON notifications FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_health_goals_updated_at BEFORE UPDATE ON health_goals FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_provider_connections_updated_at BEFORE UPDATE ON provider_connections FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();