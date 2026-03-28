export type JsonPrimitive = string | number | boolean | null

export type JsonValue =
  | JsonPrimitive
  | JsonValue[]
  | {
      [key: string]: JsonValue
    }

export interface PaginationMeta {
  hasMore?: boolean
  nextCursor?: string | null
  prevCursor?: string | null
  total?: number
}

export interface PaginationParams {
  limit?: number
  cursor?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination?: PaginationMeta
}

export type ListResponse<T> = PaginatedResponse<T>

export type IdentityStatus = 'active' | 'suspended' | 'deleted'

export interface Identity {
  id: string
  name: string
  date_of_birth: string
  email: string
  email_domain: string
  phone_number: string | null
  phone_provider: string | null
  status: IdentityStatus
  metadata: Record<string, JsonValue>
  api_key_id: string
  created_at: string
  updated_at: string
}

export interface CreateIdentityInput {
  name?: string
  email_domain?: string
  email_username?: string
  metadata?: Record<string, JsonValue>
}

export interface UpdateIdentityInput {
  name?: string
  status?: Exclude<IdentityStatus, 'deleted'>
  metadata?: Record<string, JsonValue>
}

export type MessageDirection = 'inbound' | 'outbound'

export interface EmailMessage {
  id: string
  identity_id: string
  direction: MessageDirection
  from: string
  to: string
  subject: string
  body_text: string | null
  body_html: string | null
  headers: Record<string, JsonValue>
  attachments: JsonValue[]
  received_at: string
  read: boolean
}

export interface SendEmailInput {
  to: string
  from?: string
  subject?: string
  body_text?: string
  body_html?: string
  headers?: Record<string, JsonValue>
}

export interface SmsMessage {
  id: string
  identity_id: string
  direction: MessageDirection
  from: string
  to: string
  body: string
  received_at: string
  read: boolean
}

export interface ApiKey {
  id: string
  key_prefix: string
  label: string
  scopes: string[]
  rate_limit: number
  created_at: string
  last_used_at: string | null
  revoked_at: string | null
}

export interface CreateApiKeyResponse extends ApiKey {
  key: string
}
