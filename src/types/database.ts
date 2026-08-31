// ============================================================
// Turn90 App — Database Types
// ============================================================

export type UserRole = "participant" | "staff" | "admin";

export interface Profile {
  id: string;
  phone: string;
  display_name: string | null;
  role: UserRole;
  onboarding_completed: boolean;
  created_at: string;
}

export type LessonStatus = "not_started" | "in_progress" | "completed";

export interface CbtProgress {
  id: string;
  user_id: string;
  module_number: number;
  lesson_key: string;
  status: LessonStatus;
  worksheet_data: Record<string, unknown> | null;
  completed_at: string | null;
  created_at: string;
}

export interface LifeGoal {
  id: string;
  user_id: string;
  category: string;
  item_name: string;
  status: "needed" | "in_progress" | "completed";
  notes: string | null;
  updated_at: string;
}

export interface EmploymentGoals {
  id: string;
  user_id: string;
  career_goal: string | null;
  target_industry: string | null;
  entry_level_goal: string | null;
  next_credential: string | null;
  six_month_goal: string | null;
  long_term_wage_goal: string | null;
  updated_at: string;
}

export interface Resume {
  id: string;
  user_id: string;
  resume_data: ResumeData;
  pdf_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface ResumeData {
  full_name: string;
  phone: string;
  email: string;
  address: string;
  objective: string;
  work_experience: WorkExperience[];
  education: Education[];
  skills: string[];
  certifications: string[];
}

export interface WorkExperience {
  job_title: string;
  company: string;
  start_date: string;
  end_date: string;
  description: string;
}

export interface Education {
  school: string;
  degree: string;
  year: string;
}

export interface Message {
  id: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  read: boolean;
  created_at: string;
  sender?: Profile;
  receiver?: Profile;
}

export type ReferralStatus = "suggested" | "accepted" | "declined" | "completed";

export interface ReferralAction {
  id: string;
  user_id: string;
  organization_name: string;
  service_type: string;
  status: ReferralStatus;
  staff_notified: boolean;
  notes: string | null;
  created_at: string;
}

// Referral database entry (from spreadsheet)
export interface ReferralResource {
  organization_name: string;
  specific_location: string;
  organization_type: string;
  website: string;
  phone: string;
  email: string;
  primary_service_types: string;
  notes: string;
  address_line1: string;
  address_line2: string;
  city: string;
  state: string;
  county: string;
  zip: string;
  counties_served: string;
  access_method: string;
  hours: string;
  contact_name: string;
  contact_phone: string;
  contact_email: string;
  referral_instructions: string;
  documents_required: string;
  waitlist_notes: string;
  age_requirement: string;
  gender_served: string;
  excludes_sex_offenses: string;
  excludes_violent_offenses: string;
  requires_id: string;
  must_be_veteran: string;
  requires_clean_drug_screen: string;
  requires_housing: string;
  requires_transportation: string;
  cost: string;
  priority_level: string;
}
