-- AliasKit: Add user ownership to api_keys and identities
--
-- PREREQUISITES: This migration assumes a clean database with no existing rows
-- in api_keys or identities. If rows exist, you must either:
--   a) DELETE FROM identities; DELETE FROM api_keys; before running, OR
--   b) Backfill user_id values manually before applying the NOT NULL constraint.
--
-- Run order: after 001_initial.sql

-- 1. Add user_id to api_keys
ALTER TABLE api_keys
  ADD COLUMN user_id UUID NOT NULL REFERENCES auth.users(id);

CREATE INDEX idx_api_keys_user_id ON api_keys(user_id);

-- 2. Add user_id to identities
ALTER TABLE identities
  ADD COLUMN user_id UUID NOT NULL REFERENCES auth.users(id);

CREATE INDEX idx_identities_user_id ON identities(user_id);

-- 3. Enable Row Level Security on api_keys
ALTER TABLE api_keys ENABLE ROW LEVEL SECURITY;

CREATE POLICY api_keys_user_isolation ON api_keys
  FOR ALL
  USING (user_id = auth.uid());

-- 4. Enable Row Level Security on identities
ALTER TABLE identities ENABLE ROW LEVEL SECURITY;

CREATE POLICY identities_user_isolation ON identities
  FOR ALL
  USING (user_id = auth.uid());

-- Note: The service role key (used in server-side API routes) bypasses RLS by default.
-- RLS policies above protect against direct anon-key access from the client side.
