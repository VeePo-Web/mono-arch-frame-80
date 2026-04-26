-- Allow the new "Quick Contact" bottom-sheet (mobile) to submit consultations
-- by extending the existing source allowlist on the INSERT RLS policy.
DROP POLICY IF EXISTS "Anyone can submit a consultation request" ON public.consultations;

CREATE POLICY "Anyone can submit a consultation request"
ON public.consultations
FOR INSERT
TO anon, authenticated
WITH CHECK (
  source = ANY (ARRAY[
    'home_final_cta'::text,
    'contact_page'::text,
    'service_interior'::text,
    'service_exterior'::text,
    'service_decking'::text,
    'services_overview'::text,
    'area_page'::text,
    'service_areas_page'::text,
    'quick_contact_sheet'::text
  ])
  AND notes IS NULL
  AND char_length(name) >= 1 AND char_length(name) <= 100
  AND char_length(email) >= 3 AND char_length(email) <= 255
  AND (project_type IS NULL OR project_type = ANY (ARRAY['interior'::text, 'exterior'::text, 'decking'::text, 'multiple'::text, 'not-sure'::text]))
  AND (budget IS NULL OR budget = ANY (ARRAY['under-25k'::text, '25-50k'::text, '50-100k'::text, '100k-plus'::text, 'prefer-discuss'::text]))
  AND (preferred_time IS NULL OR preferred_time = ANY (ARRAY['morning'::text, 'afternoon'::text, 'either'::text]))
  AND (message IS NULL OR (char_length(message) >= 1 AND char_length(message) <= 2000))
  AND (location IS NULL OR (char_length(location) >= 1 AND char_length(location) <= 200))
);