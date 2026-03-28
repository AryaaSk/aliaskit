-- AliasKit MVP: Initial database schema

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- API Keys (created first — identities FK references this)
CREATE TABLE IF NOT EXISTS api_keys (
  id             UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
  key_hash       TEXT        NOT NULL UNIQUE,
  key_prefix     VARCHAR(16) NOT NULL,
  label          TEXT        NOT NULL,
  scopes         TEXT[]      NOT NULL DEFAULT '{}',
  rate_limit     INTEGER     NOT NULL DEFAULT 60,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  last_used_at   TIMESTAMPTZ,
  revoked_at     TIMESTAMPTZ
);

-- Identities
CREATE TABLE IF NOT EXISTS identities (
  id             UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
  name           TEXT        NOT NULL,
  date_of_birth  TEXT        NOT NULL,
  email          TEXT        NOT NULL UNIQUE,
  email_domain   TEXT        NOT NULL,
  phone_number   TEXT,
  phone_provider TEXT,
  status         TEXT        NOT NULL DEFAULT 'active'
                             CHECK (status IN ('active', 'suspended', 'deleted')),
  metadata       JSONB       NOT NULL DEFAULT '{}',
  api_key_id     UUID        NOT NULL REFERENCES api_keys(id),
  created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Email messages
CREATE TABLE IF NOT EXISTS email_messages (
  id          UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
  identity_id UUID        NOT NULL REFERENCES identities(id) ON DELETE CASCADE,
  direction   TEXT        NOT NULL CHECK (direction IN ('inbound', 'outbound')),
  "from"      TEXT        NOT NULL,
  "to"        TEXT        NOT NULL,
  subject     TEXT        NOT NULL DEFAULT '',
  body_text   TEXT,
  body_html   TEXT,
  headers     JSONB       NOT NULL DEFAULT '{}',
  attachments JSONB       NOT NULL DEFAULT '[]',
  received_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  read        BOOLEAN     NOT NULL DEFAULT FALSE
);

-- SMS messages
CREATE TABLE IF NOT EXISTS sms_messages (
  id          UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
  identity_id UUID        NOT NULL REFERENCES identities(id) ON DELETE CASCADE,
  direction   TEXT        NOT NULL CHECK (direction IN ('inbound', 'outbound')),
  "from"      TEXT        NOT NULL,
  "to"        TEXT        NOT NULL,
  body        TEXT        NOT NULL,
  received_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  read        BOOLEAN     NOT NULL DEFAULT FALSE
);

-- Auto-update updated_at on identities
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS identities_updated_at ON identities;
CREATE TRIGGER identities_updated_at
  BEFORE UPDATE ON identities
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
