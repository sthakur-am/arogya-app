/*
  # Add Healthcare Programs Database Schema

  1. New Tables
    - `healthcare_programs`
      - `id` (uuid, primary key)
      - `name` (text, program name)
      - `description` (text, program description)
      - `category` (text, program category)
      - `duration_months` (integer, program duration)
      - `is_active` (boolean, program availability)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `program_enrollments`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to profiles)
      - `program_id` (uuid, foreign key to healthcare_programs)
      - `enrolled_date` (date, enrollment date)
      - `status` (text, enrollment status)
      - `progress_percentage` (integer, completion progress)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `program_activities`
      - `id` (uuid, primary key)
      - `program_id` (uuid, foreign key to healthcare_programs)
      - `name` (text, activity name)
      - `description` (text, activity description)
      - `frequency` (text, how often activity occurs)
      - `order_index` (integer, display order)
      - `created_at` (timestamp)
    
    - `program_milestones`
      - `id` (uuid, primary key)
      - `program_id` (uuid, foreign key to healthcare_programs)
      - `name` (text, milestone name)
      - `description` (text, milestone description)
      - `target_timeframe` (text, when milestone should be achieved)
      - `order_index` (integer, display order)
      - `created_at` (timestamp)
    
    - `program_schedules`
      - `id` (uuid, primary key)
      - `program_id` (uuid, foreign key to healthcare_programs)
      - `day_of_week` (text, schedule day)
      - `time_slot` (text, schedule time)
      - `activity_name` (text, scheduled activity)
      - `created_at` (timestamp)
    
    - `user_program_activities`
      - `id` (uuid, primary key)
      - `enrollment_id` (uuid, foreign key to program_enrollments)
      - `activity_id` (uuid, foreign key to program_activities)
      - `completed` (boolean, completion status)
      - `completed_date` (date, completion date)
      - `due_date` (date, activity due date)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `user_program_milestones`
      - `id` (uuid, primary key)
      - `enrollment_id` (uuid, foreign key to program_enrollments)
      - `milestone_id` (uuid, foreign key to program_milestones)
      - `achieved` (boolean, achievement status)
      - `achieved_date` (date, achievement date)
      - `target_date` (date, target achievement date)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on all new tables
    - Add policies for users to manage their own program data
    - Add policies for reading program information

  3. Sample Data
    - Insert healthcare programs (Youth Health, Pregnancy Care, Senior Care)
    - Insert activities, milestones, and schedules for each program
*/

-- Create healthcare_programs table
CREATE TABLE IF NOT EXISTS healthcare_programs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  category text,
  duration_months integer,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create program_enrollments table
CREATE TABLE IF NOT EXISTS program_enrollments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  program_id uuid NOT NULL REFERENCES healthcare_programs(id) ON DELETE CASCADE,
  enrolled_date date DEFAULT CURRENT_DATE,
  status text DEFAULT 'active' CHECK (status IN ('active', 'completed', 'paused', 'cancelled')),
  progress_percentage integer DEFAULT 0 CHECK (progress_percentage >= 0 AND progress_percentage <= 100),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, program_id)
);

-- Create program_activities table
CREATE TABLE IF NOT EXISTS program_activities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  program_id uuid NOT NULL REFERENCES healthcare_programs(id) ON DELETE CASCADE,
  name text NOT NULL,
  description text,
  frequency text,
  order_index integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create program_milestones table
CREATE TABLE IF NOT EXISTS program_milestones (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  program_id uuid NOT NULL REFERENCES healthcare_programs(id) ON DELETE CASCADE,
  name text NOT NULL,
  description text,
  target_timeframe text,
  order_index integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create program_schedules table
CREATE TABLE IF NOT EXISTS program_schedules (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  program_id uuid NOT NULL REFERENCES healthcare_programs(id) ON DELETE CASCADE,
  day_of_week text NOT NULL CHECK (day_of_week IN ('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday')),
  time_slot text NOT NULL,
  activity_name text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create user_program_activities table
CREATE TABLE IF NOT EXISTS user_program_activities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  enrollment_id uuid NOT NULL REFERENCES program_enrollments(id) ON DELETE CASCADE,
  activity_id uuid NOT NULL REFERENCES program_activities(id) ON DELETE CASCADE,
  completed boolean DEFAULT false,
  completed_date date,
  due_date date,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(enrollment_id, activity_id)
);

-- Create user_program_milestones table
CREATE TABLE IF NOT EXISTS user_program_milestones (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  enrollment_id uuid NOT NULL REFERENCES program_enrollments(id) ON DELETE CASCADE,
  milestone_id uuid NOT NULL REFERENCES program_milestones(id) ON DELETE CASCADE,
  achieved boolean DEFAULT false,
  achieved_date date,
  target_date date,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(enrollment_id, milestone_id)
);

-- Enable Row Level Security
ALTER TABLE healthcare_programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE program_enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE program_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE program_milestones ENABLE ROW LEVEL SECURITY;
ALTER TABLE program_schedules ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_program_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_program_milestones ENABLE ROW LEVEL SECURITY;

-- Create policies for healthcare_programs (public read)
CREATE POLICY "Anyone can view healthcare programs"
  ON healthcare_programs
  FOR SELECT
  TO authenticated
  USING (is_active = true);

-- Create policies for program_enrollments
CREATE POLICY "Users can manage own program enrollments"
  ON program_enrollments
  FOR ALL
  TO authenticated
  USING (uid() = user_id)
  WITH CHECK (uid() = user_id);

-- Create policies for program_activities (public read)
CREATE POLICY "Anyone can view program activities"
  ON program_activities
  FOR SELECT
  TO authenticated
  USING (true);

-- Create policies for program_milestones (public read)
CREATE POLICY "Anyone can view program milestones"
  ON program_milestones
  FOR SELECT
  TO authenticated
  USING (true);

-- Create policies for program_schedules (public read)
CREATE POLICY "Anyone can view program schedules"
  ON program_schedules
  FOR SELECT
  TO authenticated
  USING (true);

-- Create policies for user_program_activities
CREATE POLICY "Users can manage own program activities"
  ON user_program_activities
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM program_enrollments 
      WHERE program_enrollments.id = user_program_activities.enrollment_id 
      AND program_enrollments.user_id = uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM program_enrollments 
      WHERE program_enrollments.id = user_program_activities.enrollment_id 
      AND program_enrollments.user_id = uid()
    )
  );

-- Create policies for user_program_milestones
CREATE POLICY "Users can manage own program milestones"
  ON user_program_milestones
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM program_enrollments 
      WHERE program_enrollments.id = user_program_milestones.enrollment_id 
      AND program_enrollments.user_id = uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM program_enrollments 
      WHERE program_enrollments.id = user_program_milestones.enrollment_id 
      AND program_enrollments.user_id = uid()
    )
  );

-- Create triggers for updated_at columns
CREATE TRIGGER update_program_enrollments_updated_at
  BEFORE UPDATE ON program_enrollments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_program_activities_updated_at
  BEFORE UPDATE ON user_program_activities
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_program_milestones_updated_at
  BEFORE UPDATE ON user_program_milestones
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_healthcare_programs_updated_at
  BEFORE UPDATE ON healthcare_programs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert sample healthcare programs
INSERT INTO healthcare_programs (name, description, category, duration_months) VALUES
('Youth Health Program', 'Comprehensive health program for young adults (18-35)', 'youth', 6),
('Pregnancy Care Program', 'Comprehensive prenatal and postnatal care program', 'pregnancy', 9),
('Senior Care Program', 'Specialized healthcare program for adults 65+', 'senior', NULL);

-- Get program IDs for sample data
DO $$
DECLARE
  youth_program_id uuid;
  pregnancy_program_id uuid;
  senior_program_id uuid;
BEGIN
  -- Get program IDs
  SELECT id INTO youth_program_id FROM healthcare_programs WHERE name = 'Youth Health Program';
  SELECT id INTO pregnancy_program_id FROM healthcare_programs WHERE name = 'Pregnancy Care Program';
  SELECT id INTO senior_program_id FROM healthcare_programs WHERE name = 'Senior Care Program';

  -- Insert activities for Youth Health Program
  INSERT INTO program_activities (program_id, name, description, frequency, order_index) VALUES
  (youth_program_id, 'Monthly Health Checkup', 'Regular health monitoring and assessment', 'Monthly', 1),
  (youth_program_id, 'Fitness Assessment', 'Evaluate physical fitness and create exercise plan', 'Quarterly', 2),
  (youth_program_id, 'Nutrition Counseling', 'Dietary guidance and meal planning', 'Bi-monthly', 3),
  (youth_program_id, 'Mental Health Screening', 'Assess mental wellbeing and stress levels', 'Quarterly', 4);

  -- Insert milestones for Youth Health Program
  INSERT INTO program_milestones (program_id, name, description, target_timeframe, order_index) VALUES
  (youth_program_id, 'Complete Initial Assessment', 'Comprehensive health evaluation', 'Week 2', 1),
  (youth_program_id, 'Achieve Fitness Goals', 'Meet personalized fitness targets', 'Month 4', 2),
  (youth_program_id, 'Complete Program', 'Successfully finish all program requirements', 'Month 6', 3);

  -- Insert schedule for Youth Health Program
  INSERT INTO program_schedules (program_id, day_of_week, time_slot, activity_name) VALUES
  (youth_program_id, 'Monday', '9:00 AM', 'Fitness Session'),
  (youth_program_id, 'Wednesday', '2:00 PM', 'Nutrition Consultation'),
  (youth_program_id, 'Friday', '10:00 AM', 'Health Monitoring');

  -- Insert activities for Pregnancy Care Program
  INSERT INTO program_activities (program_id, name, description, frequency, order_index) VALUES
  (pregnancy_program_id, 'Prenatal Checkups', 'Regular monitoring of mother and baby health', 'Weekly', 1),
  (pregnancy_program_id, 'Ultrasound Scans', 'Monitor baby development and health', 'Monthly', 2),
  (pregnancy_program_id, 'Nutrition Planning', 'Specialized dietary guidance for pregnancy', 'Ongoing', 3),
  (pregnancy_program_id, 'Birth Preparation Classes', 'Prepare for labor and delivery', 'Trimester 3', 4);

  -- Insert milestones for Pregnancy Care Program
  INSERT INTO program_milestones (program_id, name, description, target_timeframe, order_index) VALUES
  (pregnancy_program_id, 'First Trimester Completion', 'Complete first 12 weeks safely', 'Week 12', 1),
  (pregnancy_program_id, 'Second Trimester Completion', 'Reach 24 weeks milestone', 'Week 24', 2),
  (pregnancy_program_id, 'Safe Delivery', 'Successful birth and recovery', 'Week 40', 3);

  -- Insert schedule for Pregnancy Care Program
  INSERT INTO program_schedules (program_id, day_of_week, time_slot, activity_name) VALUES
  (pregnancy_program_id, 'Tuesday', '10:00 AM', 'Prenatal Checkup'),
  (pregnancy_program_id, 'Thursday', '3:00 PM', 'Nutrition Counseling'),
  (pregnancy_program_id, 'Saturday', '11:00 AM', 'Birth Preparation Class');

  -- Insert activities for Senior Care Program
  INSERT INTO program_activities (program_id, name, description, frequency, order_index) VALUES
  (senior_program_id, 'Regular Health Monitoring', 'Continuous health status tracking', 'Weekly', 1),
  (senior_program_id, 'Medication Management', 'Ensure proper medication adherence', 'Daily', 2),
  (senior_program_id, 'Physical Therapy', 'Maintain mobility and strength', 'Bi-weekly', 3),
  (senior_program_id, 'Social Activities', 'Promote social engagement and mental health', 'Weekly', 4);

  -- Insert milestones for Senior Care Program
  INSERT INTO program_milestones (program_id, name, description, target_timeframe, order_index) VALUES
  (senior_program_id, 'Complete Health Assessment', 'Comprehensive senior health evaluation', 'Month 1', 1),
  (senior_program_id, 'Establish Care Plan', 'Create personalized care strategy', 'Month 2', 2),
  (senior_program_id, '6-Month Review', 'Evaluate progress and adjust care plan', 'Month 6', 3);

  -- Insert schedule for Senior Care Program
  INSERT INTO program_schedules (program_id, day_of_week, time_slot, activity_name) VALUES
  (senior_program_id, 'Monday', '9:00 AM', 'Health Monitoring'),
  (senior_program_id, 'Wednesday', '11:00 AM', 'Physical Therapy'),
  (senior_program_id, 'Friday', '2:00 PM', 'Social Activities');

END $$;