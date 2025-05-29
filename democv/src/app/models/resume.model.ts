export interface ResumeModel {
  id?: string;              // uuid (từ Supabase)
  uid?: string;             // optional nếu login
  full_name?: string;
  job_title?: string;
  email?: string;
  phone?: string;
  location?: string;
  avatar_url?: string;
  created_at?: string;      // ISO string từ Supabase
  updated_at?: string;
}
