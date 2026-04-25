-- ─────────────────────────────────────────────────────────────────────────
-- Roles infrastructure (standard Lovable Cloud pattern)
-- ─────────────────────────────────────────────────────────────────────────

-- 1. Enum of application roles
DO $$ BEGIN
  CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- 2. user_roles table
CREATE TABLE IF NOT EXISTS public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- 3. Security-definer role check (avoids recursive RLS)
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- 4. RLS for user_roles — only admins manage, users see their own
DROP POLICY IF EXISTS "Users can view their own roles" ON public.user_roles;
CREATE POLICY "Users can view their own roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Admins can view all roles" ON public.user_roles;
CREATE POLICY "Admins can view all roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins can manage roles" ON public.user_roles;
CREATE POLICY "Admins can manage roles"
ON public.user_roles
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- ─────────────────────────────────────────────────────────────────────────
-- Shared updated_at trigger function
-- ─────────────────────────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- ─────────────────────────────────────────────────────────────────────────
-- consultations — landing-page lead capture
-- ─────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.consultations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  name text NOT NULL,
  email text NOT NULL,
  project_type text NOT NULL,
  budget text NOT NULL,
  notes text,
  source text NOT NULL DEFAULT 'home_final_cta',
  CONSTRAINT consultations_name_length CHECK (char_length(name) BETWEEN 1 AND 100),
  CONSTRAINT consultations_email_length CHECK (char_length(email) BETWEEN 3 AND 255),
  CONSTRAINT consultations_email_format CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
  CONSTRAINT consultations_project_type CHECK (project_type IN ('interior','exterior','decking','multiple','not-sure')),
  CONSTRAINT consultations_budget CHECK (budget IN ('under-25k','25-50k','50-100k','100k-plus','prefer-discuss')),
  CONSTRAINT consultations_notes_length CHECK (notes IS NULL OR char_length(notes) <= 2000),
  CONSTRAINT consultations_source_length CHECK (char_length(source) BETWEEN 1 AND 64)
);

ALTER TABLE public.consultations ENABLE ROW LEVEL SECURITY;

-- Public lead capture — anyone can submit
DROP POLICY IF EXISTS "Anyone can submit a consultation request" ON public.consultations;
CREATE POLICY "Anyone can submit a consultation request"
ON public.consultations
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Only admins can read submissions
DROP POLICY IF EXISTS "Admins can view all consultations" ON public.consultations;
CREATE POLICY "Admins can view all consultations"
ON public.consultations
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Only admins can update / delete
DROP POLICY IF EXISTS "Admins can update consultations" ON public.consultations;
CREATE POLICY "Admins can update consultations"
ON public.consultations
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins can delete consultations" ON public.consultations;
CREATE POLICY "Admins can delete consultations"
ON public.consultations
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- updated_at trigger
DROP TRIGGER IF EXISTS update_consultations_updated_at ON public.consultations;
CREATE TRIGGER update_consultations_updated_at
BEFORE UPDATE ON public.consultations
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Index for ordering / scanning
CREATE INDEX IF NOT EXISTS consultations_created_at_idx
ON public.consultations (created_at DESC);
