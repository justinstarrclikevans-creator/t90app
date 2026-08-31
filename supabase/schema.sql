-- ============================================================
-- Turn90 App — Database Schema
-- Run this in your Supabase SQL editor
-- ============================================================

-- Enable RLS
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO postgres, anon, authenticated, service_role;

-- ============================================================
-- Profiles (extends auth.users)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  phone TEXT NOT NULL,
  display_name TEXT,
  role TEXT NOT NULL DEFAULT 'participant' CHECK (role IN ('participant', 'staff', 'admin')),
  onboarding_completed BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Staff can view all profiles" ON public.profiles
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('staff', 'admin'))
  );

-- ============================================================
-- CBT Progress
-- ============================================================
CREATE TABLE IF NOT EXISTS public.cbt_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  module_number INTEGER NOT NULL,
  lesson_key TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'not_started' CHECK (status IN ('not_started', 'in_progress', 'completed')),
  worksheet_data JSONB,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, module_number, lesson_key)
);

ALTER TABLE public.cbt_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own CBT progress" ON public.cbt_progress
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Staff can view all CBT progress" ON public.cbt_progress
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('staff', 'admin'))
  );

-- ============================================================
-- Life Goals
-- ============================================================
CREATE TABLE IF NOT EXISTS public.life_goals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  category TEXT NOT NULL,
  item_name TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'needed' CHECK (status IN ('needed', 'in_progress', 'completed')),
  notes TEXT,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, category, item_name)
);

ALTER TABLE public.life_goals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own life goals" ON public.life_goals
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Staff can view all life goals" ON public.life_goals
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('staff', 'admin'))
  );

-- ============================================================
-- Employment Goals
-- ============================================================
CREATE TABLE IF NOT EXISTS public.employment_goals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  career_goal TEXT,
  target_industry TEXT,
  entry_level_goal TEXT,
  next_credential TEXT,
  six_month_goal TEXT,
  long_term_wage_goal TEXT,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id)
);

ALTER TABLE public.employment_goals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own employment goals" ON public.employment_goals
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Staff can view all employment goals" ON public.employment_goals
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('staff', 'admin'))
  );

-- ============================================================
-- Resumes
-- ============================================================
CREATE TABLE IF NOT EXISTS public.resumes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  resume_data JSONB NOT NULL DEFAULT '{}'::jsonb,
  pdf_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.resumes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own resumes" ON public.resumes
  FOR ALL USING (auth.uid() = user_id);

-- ============================================================
-- Messages
-- ============================================================
CREATE TABLE IF NOT EXISTS public.messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  receiver_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own messages" ON public.messages
  FOR SELECT USING (auth.uid() = sender_id OR auth.uid() = receiver_id);

CREATE POLICY "Users can send messages" ON public.messages
  FOR INSERT WITH CHECK (auth.uid() = sender_id);

CREATE POLICY "Users can mark messages as read" ON public.messages
  FOR UPDATE USING (auth.uid() = receiver_id);

-- ============================================================
-- Referral Actions
-- ============================================================
CREATE TABLE IF NOT EXISTS public.referral_actions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  organization_name TEXT NOT NULL,
  service_type TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'suggested' CHECK (status IN ('suggested', 'accepted', 'declined', 'completed')),
  staff_notified BOOLEAN NOT NULL DEFAULT false,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.referral_actions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own referral actions" ON public.referral_actions
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Staff can view all referral actions" ON public.referral_actions
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('staff', 'admin'))
  );

CREATE POLICY "Staff can update referral actions" ON public.referral_actions
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('staff', 'admin'))
  );

-- ============================================================
-- Create indexes for performance
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_cbt_progress_user ON public.cbt_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_life_goals_user ON public.life_goals(user_id);
CREATE INDEX IF NOT EXISTS idx_messages_sender ON public.messages(sender_id);
CREATE INDEX IF NOT EXISTS idx_messages_receiver ON public.messages(receiver_id);
CREATE INDEX IF NOT EXISTS idx_referral_actions_user ON public.referral_actions(user_id);
CREATE INDEX IF NOT EXISTS idx_referral_actions_status ON public.referral_actions(status);

-- ============================================================
-- Auto-create profile on user signup
-- ============================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, phone, role)
  VALUES (NEW.id, COALESCE(NEW.phone, ''), 'participant');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
