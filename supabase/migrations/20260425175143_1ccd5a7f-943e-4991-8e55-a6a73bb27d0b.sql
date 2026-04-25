-- Replace the permissive public INSERT policy with a shape-checked one.
DROP POLICY IF EXISTS "Anyone can submit a consultation request" ON public.consultations;

CREATE POLICY "Anyone can submit a consultation request"
ON public.consultations
FOR INSERT
TO anon, authenticated
WITH CHECK (
  -- Only the home form's source is allowed via public insert
  source = 'home_final_cta'
  -- Notes must be empty when submitted publicly (admins can fill in later)
  AND notes IS NULL
  -- Guard rails on shape (the column CHECKs already enforce these,
  -- repeated here so the policy is not "WITH CHECK (true)")
  AND char_length(name) BETWEEN 1 AND 100
  AND char_length(email) BETWEEN 3 AND 255
  AND project_type IN ('interior','exterior','decking','multiple','not-sure')
  AND budget IN ('under-25k','25-50k','50-100k','100k-plus','prefer-discuss')
);
