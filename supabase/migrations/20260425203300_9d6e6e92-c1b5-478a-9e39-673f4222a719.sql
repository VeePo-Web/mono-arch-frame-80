-- 1. Add the optional preferred_time column
ALTER TABLE public.consultations
  ADD COLUMN IF NOT EXISTS preferred_time text;

-- 2. Drop and recreate the public INSERT policy so its WITH CHECK
--    accepts the new optional preferred_time field.
DROP POLICY IF EXISTS "Anyone can submit a consultation request" ON public.consultations;

CREATE POLICY "Anyone can submit a consultation request"
ON public.consultations
FOR INSERT
TO anon, authenticated
WITH CHECK (
  source = 'home_final_cta'::text
  AND notes IS NULL
  AND char_length(name) BETWEEN 1 AND 100
  AND char_length(email) BETWEEN 3 AND 255
  AND project_type = ANY (ARRAY['interior'::text, 'exterior'::text, 'decking'::text, 'multiple'::text, 'not-sure'::text])
  AND budget = ANY (ARRAY['under-25k'::text, '25-50k'::text, '50-100k'::text, '100k-plus'::text, 'prefer-discuss'::text])
  AND (preferred_time IS NULL OR preferred_time = ANY (ARRAY['morning'::text, 'afternoon'::text, 'either'::text]))
);