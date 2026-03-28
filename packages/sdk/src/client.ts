import type {
  CreateIdentityInput,
  EmailMessage,
  Identity,
  ListResponse,
  PaginationParams,
  SendEmailInput,
  SmsMessage,
  UpdateIdentityInput,
} from './types.js'

export interface AliasKitOptions {
  apiKey: string
  baseUrl?: string
  fetch?: typeof fetch
}

export class AliasKitError extends Error {
  readonly status: number
  readonly code?: string
  readonly details?: unknown

  constructor(
    message: string,
    opts: {
      status: number
      code?: string
      details?: unknown
    }
  ) {
    super(message)
    this.name = 'AliasKitError'
    this.status = opts.status
    this.code = opts.code
    this.details = opts.details
  }
}

const DEFAULT_BASE_URL = '/api/v1'

function toQuery(params?: PaginationParams): string {
  if (!params) return ''
  const search = new URLSearchParams()
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined) search.set(key, String(value))
  }
  const value = search.toString()
  return value ? `?${value}` : ''
}

class IdentitiesApi {
  constructor(private readonly request: AliasKit['request']) {}

  create(input: CreateIdentityInput = {}) {
    return this.request<Identity>('POST', '/identities', input)
  }

  list(opts?: PaginationParams) {
    return this.request<ListResponse<Identity>>(
      'GET',
      `/identities${toQuery(opts)}`
    )
  }

  get(id: string) {
    return this.request<Identity>('GET', `/identities/${id}`)
  }

  update(id: string, input: UpdateIdentityInput) {
    return this.request<Identity>('PATCH', `/identities/${id}`, input)
  }

  delete(id: string) {
    return this.request<{ success: true }>('DELETE', `/identities/${id}`)
  }

  emails(id: string, opts?: PaginationParams) {
    return this.request<ListResponse<EmailMessage>>(
      'GET',
      `/identities/${id}/emails${toQuery(opts)}`
    )
  }

  getEmail(id: string, emailId: string) {
    return this.request<EmailMessage>('GET', `/identities/${id}/emails/${emailId}`)
  }

  sendEmail(id: string, input: SendEmailInput) {
    return this.request<EmailMessage>('POST', `/identities/${id}/emails`, input)
  }

  deleteEmail(id: string, emailId: string) {
    return this.request<{ success: true }>(
      'DELETE',
      `/identities/${id}/emails/${emailId}`
    )
  }

  sms(id: string, opts?: PaginationParams) {
    return this.request<ListResponse<SmsMessage>>(
      'GET',
      `/identities/${id}/sms${toQuery(opts)}`
    )
  }

  getSms(id: string, smsId: string) {
    return this.request<SmsMessage>('GET', `/identities/${id}/sms/${smsId}`)
  }

  deleteSms(id: string, smsId: string) {
    return this.request<{ success: true }>('DELETE', `/identities/${id}/sms/${smsId}`)
  }
}

export class AliasKit {
  readonly identities: IdentitiesApi

  private readonly apiKey: string
  private readonly baseUrl: string
  private readonly fetchImpl: typeof fetch

  constructor(options: AliasKitOptions) {
    if (!options?.apiKey) {
      throw new Error('AliasKit `apiKey` is required')
    }
    if (!options.fetch && typeof globalThis.fetch !== 'function') {
      throw new Error(
        'No fetch implementation available. Provide `fetch` in AliasKit options.'
      )
    }

    this.apiKey = options.apiKey
    this.baseUrl = (options.baseUrl ?? DEFAULT_BASE_URL).replace(/\/+$/, '')
    this.fetchImpl = options.fetch ?? globalThis.fetch
    this.identities = new IdentitiesApi(this.request.bind(this))
  }

  async request<T>(
    method: 'GET' | 'POST' | 'PATCH' | 'DELETE',
    path: string,
    body?: unknown
  ): Promise<T> {
    const response = await this.fetchImpl(`${this.baseUrl}${path}`, {
      method,
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: body === undefined ? undefined : JSON.stringify(body),
    })

    if (!response.ok) {
      let payload: { error?: string; code?: string; [k: string]: unknown } | null =
        null
      try {
        payload = (await response.json()) as { error?: string; code?: string }
      } catch {
        payload = null
      }

      throw new AliasKitError(payload?.error ?? response.statusText, {
        status: response.status,
        code: payload?.code,
        details: payload,
      })
    }

    if (response.status === 204) {
      return undefined as T
    }
    return (await response.json()) as T
  }
}
