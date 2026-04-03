/**
 * AliasKit API client — wraps the Identity API for the testing SDK.
 *
 * API flow:
 *   client.createIdentity() ──▶ POST /v1/identities
 *   client.getEmails()      ──▶ GET  /v1/identities/:id/emails
 *   client.getSms()         ──▶ GET  /v1/identities/:id/sms
 *   client.deleteIdentity() ──▶ DELETE /v1/identities/:id
 */

export interface AliasKitClientOptions {
  apiKey?: string;
  baseUrl?: string;
}

export interface Identity {
  id: string;
  name: string;
  date_of_birth: string;
  email: string;
  email_domain: string;
  phone_number: string | null;
  phone_provider: string | null;
  status: string;
  metadata: Record<string, unknown>;
  created_at: string;
}

export interface EmailMessage {
  id: string;
  identity_id: string;
  direction: string;
  from: string;
  to: string;
  subject: string;
  body_text: string | null;
  body_html: string | null;
  received_at: string;
  read: boolean;
}

export interface SmsMessage {
  id: string;
  identity_id: string;
  direction: string;
  from: string;
  to: string;
  body: string;
  received_at: string;
  read: boolean;
}

export class AliasKitClient {
  private apiKey: string;
  private baseUrl: string;

  constructor(options: AliasKitClientOptions = {}) {
    this.apiKey = options.apiKey || process.env.ALIASKIT_API_KEY || '';
    this.baseUrl = options.baseUrl || process.env.ALIASKIT_BASE_URL || 'https://aliaskit.com/api/v1';

    if (!this.apiKey) {
      throw new Error(
        'AliasKit API key required. Pass { apiKey } or set ALIASKIT_API_KEY env var.'
      );
    }
  }

  private async request<T>(path: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseUrl}${path}`;
    const response = await fetch(url, {
      ...options,
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      const body = await response.text();
      throw new Error(`AliasKit API error: ${response.status} ${response.statusText} — ${body}`);
    }

    return response.json() as Promise<T>;
  }

  async createIdentity(options?: {
    provisionPhone?: boolean;
    metadata?: Record<string, unknown>;
  }): Promise<Identity> {
    return this.request<Identity>('/identities', {
      method: 'POST',
      body: JSON.stringify({
        provision_phone: options?.provisionPhone ?? false,
        metadata: {
          ...options?.metadata,
          source: '@aliaskit/test',
          ephemeral: true,
        },
      }),
    });
  }

  async deleteIdentity(identityId: string): Promise<void> {
    await this.request(`/identities/${identityId}`, { method: 'DELETE' });
  }

  async getEmails(identityId: string): Promise<{ data: EmailMessage[] }> {
    return this.request<{ data: EmailMessage[] }>(`/identities/${identityId}/emails`);
  }

  async getSms(identityId: string): Promise<{ data: SmsMessage[] }> {
    return this.request<{ data: SmsMessage[] }>(`/identities/${identityId}/sms`);
  }
}
