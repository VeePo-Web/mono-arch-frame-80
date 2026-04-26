-- Add the two new optional columns the new form needs.
ALTER TABLE public.consultations
  ADD COLUMN IF NOT EXISTS message text,
  ADD COLUMN IF NOT EXISTS location text;

-- Make project_type and budget nullable — the new form lets homeowners
-- describe their project in writing instead of forcing a dropdown choice.
ALTER TABLE public.consultations ALTER COLUMN project_type DROP NOT NULL;
ALTER TABLE public.consultations ALTER COLUMN budget DROP NOT NULL;

-- Replace the public-insert RLS policy with one that:
--   * keeps the strict shape guard (length limits, notes-must-be-null, source whitelist)
--   * makes project_type / budget optional
--   * accepts the new message + location fields with sane bounds
--   * adds 'service_areas_page' to the source whitelist so future area
--     CTAs can reuse the form without another migration.
DROP POLICY IF EXISTS "Anyone can submit a consultation request" ON public.consultations;

CREATE POLICY "Anyone can submit a consultation request"
ON public.consultations
FOR INSERT
TO anon, authenticated
WITH CHECK (
  source = ANY (ARRAY[
    'home_final_cta',
    'contact_page',
    'service_interior',
    'service_exterior',
    'service_decking',
    'services_overview',
    'area_page',
    'service_areas_page'
  ])
  AND notes IS NULL
  AND char_length(name) BETWEEN 1 AND 100
  AND char_length(email) BETWEEN 3 AND 255
  AND (
    project_type IS NULL
    OR project_type = ANY (ARRAY['interior','exterior','decking','multiple','not-sure'])
  )
  AND (
    budget IS NULL
    OR budget = ANY (ARRAY['under-25k','25-50k','50-100k','100k-plus','prefer-discuss'])
  )
  AND (
    preferred_time IS NULL
    OR preferred_time = ANY (ARRAY['morning','afternoon','either'])
  )
  AND (
    message IS NULL
    OR char_length(message) BETWEEN 1 AND 2000
  )
  AND (
    location IS NULL
    OR char_length(location) BETWEEN 1 AND 200
  )
);