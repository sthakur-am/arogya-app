export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string
          age: number | null
          sex: string | null
          location: string | null
          smoker: boolean
          drinker: boolean
          health_habits: string[]
          health_score: number
          avatar_url: string | null
          phone: string | null
          emergency_contact_name: string | null
          emergency_contact_phone: string | null
          insurance_provider: string | null
          insurance_policy_number: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name: string
          age?: number | null
          sex?: string | null
          location?: string | null
          smoker?: boolean
          drinker?: boolean
          health_habits?: string[]
          health_score?: number
          avatar_url?: string | null
          phone?: string | null
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          insurance_provider?: string | null
          insurance_policy_number?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string
          age?: number | null
          sex?: string | null
          location?: string | null
          smoker?: boolean
          drinker?: boolean
          health_habits?: string[]
          health_score?: number
          avatar_url?: string | null
          phone?: string | null
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          insurance_provider?: string | null
          insurance_policy_number?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      health_providers: {
        Row: {
          id: string
          name: string
          type: string
          specialty: string | null
          address: string
          phone: string
          email: string | null
          website: string | null
          rating: number
          distance_miles: number | null
          accepting_patients: boolean
          insurance_accepted: string[]
          hours_of_operation: Json | null
          services_offered: string[]
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          type: string
          specialty?: string | null
          address: string
          phone: string
          email?: string | null
          website?: string | null
          rating?: number
          distance_miles?: number | null
          accepting_patients?: boolean
          insurance_accepted?: string[]
          hours_of_operation?: Json | null
          services_offered?: string[]
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          type?: string
          specialty?: string | null
          address?: string
          phone?: string
          email?: string | null
          website?: string | null
          rating?: number
          distance_miles?: number | null
          accepting_patients?: boolean
          insurance_accepted?: string[]
          hours_of_operation?: Json | null
          services_offered?: string[]
          created_at?: string
          updated_at?: string
        }
      }
      medications: {
        Row: {
          id: string
          user_id: string
          name: string
          dosage: string
          frequency: string
          start_date: string
          end_date: string | null
          prescribing_doctor: string | null
          pharmacy: string | null
          notes: string | null
          active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          dosage: string
          frequency: string
          start_date: string
          end_date?: string | null
          prescribing_doctor?: string | null
          pharmacy?: string | null
          notes?: string | null
          active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          dosage?: string
          frequency?: string
          start_date?: string
          end_date?: string | null
          prescribing_doctor?: string | null
          pharmacy?: string | null
          notes?: string | null
          active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      health_records: {
        Row: {
          id: string
          user_id: string
          type: string
          title: string
          description: string | null
          date: string
          provider: string | null
          document_url: string | null
          results: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          type: string
          title: string
          description?: string | null
          date: string
          provider?: string | null
          document_url?: string | null
          results?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          type?: string
          title?: string
          description?: string | null
          date?: string
          provider?: string | null
          document_url?: string | null
          results?: Json | null
          created_at?: string
          updated_at?: string
        }
      }
      health_history: {
        Row: {
          id: string
          user_id: string
          condition: string
          diagnosed_date: string
          status: string
          severity: string | null
          notes: string | null
          diagnosing_provider: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          condition: string
          diagnosed_date: string
          status: string
          severity?: string | null
          notes?: string | null
          diagnosing_provider?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          condition?: string
          diagnosed_date?: string
          status?: string
          severity?: string | null
          notes?: string | null
          diagnosing_provider?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      appointments: {
        Row: {
          id: string
          user_id: string
          provider_id: string | null
          title: string
          description: string | null
          appointment_date: string
          duration_minutes: number
          type: string
          status: string
          location: string | null
          notes: string | null
          reminder_sent: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          provider_id?: string | null
          title: string
          description?: string | null
          appointment_date: string
          duration_minutes?: number
          type: string
          status?: string
          location?: string | null
          notes?: string | null
          reminder_sent?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          provider_id?: string | null
          title?: string
          description?: string | null
          appointment_date?: string
          duration_minutes?: number
          type?: string
          status?: string
          location?: string | null
          notes?: string | null
          reminder_sent?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      health_tasks: {
        Row: {
          id: string
          user_id: string
          title: string
          description: string | null
          due_date: string
          status: string
          priority: string
          category: string | null
          completed_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          description?: string | null
          due_date: string
          status?: string
          priority?: string
          category?: string | null
          completed_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          description?: string | null
          due_date?: string
          status?: string
          priority?: string
          category?: string | null
          completed_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      health_events: {
        Row: {
          id: string
          user_id: string
          title: string
          description: string | null
          event_date: string
          type: string
          all_day: boolean
          reminder_minutes: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          description?: string | null
          event_date: string
          type: string
          all_day?: boolean
          reminder_minutes?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          description?: string | null
          event_date?: string
          type?: string
          all_day?: boolean
          reminder_minutes?: number
          created_at?: string
          updated_at?: string
        }
      }
      notifications: {
        Row: {
          id: string
          user_id: string
          title: string
          message: string
          type: string
          read: boolean
          action_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          message: string
          type?: string
          read?: boolean
          action_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          message?: string
          type?: string
          read?: boolean
          action_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      chat_messages: {
        Row: {
          id: string
          user_id: string
          content: string
          sender: string
          session_id: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          content: string
          sender: string
          session_id?: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          content?: string
          sender?: string
          session_id?: string
          created_at?: string
        }
      }
      vitals: {
        Row: {
          id: string
          user_id: string
          height: string | null
          weight: string | null
          blood_type: string | null
          blood_pressure_systolic: number | null
          blood_pressure_diastolic: number | null
          heart_rate: number | null
          temperature: number | null
          recorded_date: string
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          height?: string | null
          weight?: string | null
          blood_type?: string | null
          blood_pressure_systolic?: number | null
          blood_pressure_diastolic?: number | null
          heart_rate?: number | null
          temperature?: number | null
          recorded_date: string
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          height?: string | null
          weight?: string | null
          blood_type?: string | null
          blood_pressure_systolic?: number | null
          blood_pressure_diastolic?: number | null
          heart_rate?: number | null
          temperature?: number | null
          recorded_date?: string
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      immunizations: {
        Row: {
          id: string
          user_id: string
          vaccine_name: string
          administered_date: string
          provider: string | null
          lot_number: string | null
          site: string | null
          next_due_date: string | null
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          vaccine_name: string
          administered_date: string
          provider?: string | null
          lot_number?: string | null
          site?: string | null
          next_due_date?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          vaccine_name?: string
          administered_date?: string
          provider?: string | null
          lot_number?: string | null
          site?: string | null
          next_due_date?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      exercise_logs: {
        Row: {
          id: string
          user_id: string
          activity_type: string
          duration_minutes: number
          intensity: string | null
          calories_burned: number | null
          distance: number | null
          distance_unit: string
          exercise_date: string
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          activity_type: string
          duration_minutes: number
          intensity?: string | null
          calories_burned?: number | null
          distance?: number | null
          distance_unit?: string
          exercise_date: string
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          activity_type?: string
          duration_minutes?: number
          intensity?: string | null
          calories_burned?: number | null
          distance?: number | null
          distance_unit?: string
          exercise_date?: string
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      mood_logs: {
        Row: {
          id: string
          user_id: string
          emotion_value: number
          emotion_label: string
          notes: string | null
          logged_date: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          emotion_value: number
          emotion_label: string
          notes?: string | null
          logged_date: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          emotion_value?: number
          emotion_label?: string
          notes?: string | null
          logged_date?: string
          created_at?: string
        }
      }
      health_goals: {
        Row: {
          id: string
          user_id: string
          title: string
          description: string | null
          category: string | null
          target_value: string | null
          current_value: string | null
          target_date: string | null
          status: string
          progress_percentage: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          description?: string | null
          category?: string | null
          target_value?: string | null
          current_value?: string | null
          target_date?: string | null
          status?: string
          progress_percentage?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          description?: string | null
          category?: string | null
          target_value?: string | null
          current_value?: string | null
          target_date?: string | null
          status?: string
          progress_percentage?: number
          created_at?: string
          updated_at?: string
        }
      }
      provider_connections: {
        Row: {
          id: string
          user_id: string
          provider_id: string
          relationship_type: string
          connected_date: string
          status: string
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          provider_id: string
          relationship_type: string
          connected_date?: string
          status?: string
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          provider_id?: string
          relationship_type?: string
          connected_date?: string
          status?: string
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      allergies: {
        Row: {
          id: string
          user_id: string
          allergen: string
          severity: string | null
          reaction: string | null
          diagnosed_date: string | null
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          allergen: string
          severity?: string | null
          reaction?: string | null
          diagnosed_date?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          allergen?: string
          severity?: string | null
          reaction?: string | null
          diagnosed_date?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}