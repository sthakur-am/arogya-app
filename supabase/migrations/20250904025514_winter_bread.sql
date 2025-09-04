/*
  # Seed Healthcare Providers Data

  1. Purpose
    - Populate health_providers table with sample healthcare facilities
    - Provide realistic data for testing and demonstration
    - Include various types of healthcare providers

  2. Data Included
    - Primary care physicians
    - Specialists (cardiology, dermatology, etc.)
    - Hospitals and clinics
    - Pharmacies and labs
    - Emergency services
*/

-- Insert sample healthcare providers
INSERT INTO health_providers (
  name, type, specialty, address, phone, email, rating, distance_miles, 
  accepting_patients, insurance_accepted, services_offered
) VALUES
-- Primary Care
(
  'Dr. Sarah Johnson Family Medicine',
  'primary-care',
  'Family Medicine',
  '123 Main Street, Springfield, IL 62701',
  '(217) 555-0123',
  'contact@sarahjohnsonmd.com',
  4.8,
  0.5,
  true,
  ARRAY['Blue Cross Blue Shield', 'Aetna', 'Cigna', 'United Healthcare'],
  ARRAY['Annual Physicals', 'Preventive Care', 'Chronic Disease Management', 'Immunizations']
),
(
  'Springfield Family Health Center',
  'clinic',
  'Family Medicine',
  '456 Oak Avenue, Springfield, IL 62702',
  '(217) 555-0456',
  'info@springfieldfhc.com',
  4.6,
  1.2,
  true,
  ARRAY['Most Insurance Plans', 'Medicaid', 'Medicare'],
  ARRAY['Primary Care', 'Pediatrics', 'Women''s Health', 'Mental Health']
),

-- Specialists
(
  'Heart & Vascular Institute',
  'specialist',
  'Cardiology',
  '789 Medical Plaza, Springfield, IL 62703',
  '(217) 555-0789',
  'appointments@heartinstitute.com',
  4.9,
  2.1,
  true,
  ARRAY['Blue Cross Blue Shield', 'Aetna', 'United Healthcare'],
  ARRAY['Cardiac Catheterization', 'Echocardiograms', 'Stress Testing', 'Pacemaker Services']
),
(
  'Dr. Michael Zhang Dermatology',
  'specialist',
  'Dermatology',
  '321 Wellness Drive, Springfield, IL 62704',
  '(217) 555-0321',
  'scheduler@zhangderm.com',
  4.7,
  1.8,
  false,
  ARRAY['Blue Cross Blue Shield', 'Cigna'],
  ARRAY['Skin Cancer Screening', 'Cosmetic Procedures', 'Acne Treatment', 'Psoriasis Care']
),

-- Hospitals
(
  'Springfield General Hospital',
  'hospital',
  'Emergency Medicine',
  '1000 Hospital Drive, Springfield, IL 62705',
  '(217) 555-1000',
  'emergency@springfieldgeneral.com',
  4.5,
  3.2,
  true,
  ARRAY['All Major Insurance Plans'],
  ARRAY['Emergency Care', 'Surgery', 'Maternity', 'ICU', 'Imaging']
),
(
  'Memorial Medical Center',
  'hospital',
  'Multi-Specialty',
  '800 Memorial Boulevard, Springfield, IL 62706',
  '(217) 555-0800',
  'info@memorialmedical.com',
  4.4,
  4.1,
  true,
  ARRAY['Blue Cross Blue Shield', 'Aetna', 'United Healthcare', 'Medicare'],
  ARRAY['Cancer Care', 'Heart Surgery', 'Orthopedics', 'Neurology']
),

-- Pharmacies
(
  'HealthMart Pharmacy',
  'pharmacy',
  null,
  '555 Commerce Street, Springfield, IL 62707',
  '(217) 555-0555',
  'prescriptions@healthmart-sf.com',
  4.3,
  0.8,
  true,
  ARRAY['Most Insurance Plans'],
  ARRAY['Prescription Filling', 'Immunizations', 'Health Screenings', 'Medication Counseling']
),
(
  'CVS Pharmacy',
  'pharmacy',
  null,
  '777 Shopping Center, Springfield, IL 62708',
  '(217) 555-0777',
  null,
  4.1,
  1.5,
  true,
  ARRAY['Most Insurance Plans'],
  ARRAY['Prescription Filling', 'MinuteClinic', 'Immunizations', 'Photo Services']
),

-- Labs
(
  'Springfield Diagnostic Laboratory',
  'lab',
  'Diagnostic Testing',
  '999 Lab Way, Springfield, IL 62709',
  '(217) 555-0999',
  'results@springfieldlab.com',
  4.6,
  1.1,
  true,
  ARRAY['Most Insurance Plans'],
  ARRAY['Blood Work', 'Urinalysis', 'Imaging', 'Pathology', 'Genetic Testing']
),
(
  'Quest Diagnostics',
  'lab',
  'Laboratory Services',
  '111 Testing Boulevard, Springfield, IL 62710',
  '(217) 555-0111',
  'appointments@questdiagnostics.com',
  4.2,
  2.3,
  true,
  ARRAY['Most Insurance Plans'],
  ARRAY['Blood Tests', 'Drug Testing', 'Wellness Screenings', 'Genetic Testing']
),

-- Urgent Care
(
  'Springfield Urgent Care',
  'clinic',
  'Urgent Care',
  '222 Quick Care Lane, Springfield, IL 62711',
  '(217) 555-0222',
  'walk-ins@springfieldurgent.com',
  4.4,
  0.9,
  true,
  ARRAY['Most Insurance Plans'],
  ARRAY['Minor Injuries', 'Illness Treatment', 'X-Rays', 'Occupational Health']
),

-- Mental Health
(
  'Mindful Wellness Center',
  'specialist',
  'Mental Health',
  '333 Serenity Street, Springfield, IL 62712',
  '(217) 555-0333',
  'appointments@mindfulwellness.com',
  4.8,
  1.7,
  true,
  ARRAY['Blue Cross Blue Shield', 'Aetna', 'United Healthcare'],
  ARRAY['Individual Therapy', 'Group Therapy', 'Psychiatric Services', 'Addiction Treatment']
);

-- Update hours_of_operation for some providers
UPDATE health_providers SET hours_of_operation = jsonb_build_object(
  'monday', '8:00 AM - 5:00 PM',
  'tuesday', '8:00 AM - 5:00 PM',
  'wednesday', '8:00 AM - 5:00 PM',
  'thursday', '8:00 AM - 5:00 PM',
  'friday', '8:00 AM - 5:00 PM',
  'saturday', 'Closed',
  'sunday', 'Closed'
) WHERE type IN ('primary-care', 'specialist', 'clinic');

UPDATE health_providers SET hours_of_operation = jsonb_build_object(
  'monday', '24 Hours',
  'tuesday', '24 Hours',
  'wednesday', '24 Hours',
  'thursday', '24 Hours',
  'friday', '24 Hours',
  'saturday', '24 Hours',
  'sunday', '24 Hours'
) WHERE type = 'hospital';

UPDATE health_providers SET hours_of_operation = jsonb_build_object(
  'monday', '9:00 AM - 9:00 PM',
  'tuesday', '9:00 AM - 9:00 PM',
  'wednesday', '9:00 AM - 9:00 PM',
  'thursday', '9:00 AM - 9:00 PM',
  'friday', '9:00 AM - 9:00 PM',
  'saturday', '9:00 AM - 6:00 PM',
  'sunday', '10:00 AM - 6:00 PM'
) WHERE type = 'pharmacy';