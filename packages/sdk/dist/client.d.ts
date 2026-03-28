import type { CreateIdentityInput, EmailMessage, Identity, ListResponse, PaginationParams, SendEmailInput, SmsMessage, UpdateIdentityInput } from './types.js';
export interface AliasKitOptions {
    apiKey: string;
    baseUrl?: string;
    fetch?: typeof fetch;
}
export declare class AliasKitError extends Error {
    readonly status: number;
    readonly code?: string;
    readonly details?: unknown;
    constructor(message: string, opts: {
        status: number;
        code?: string;
        details?: unknown;
    });
}
declare class IdentitiesApi {
    private readonly request;
    constructor(request: AliasKit['request']);
    create(input?: CreateIdentityInput): Promise<Identity>;
    list(opts?: PaginationParams): Promise<ListResponse<Identity>>;
    get(id: string): Promise<Identity>;
    update(id: string, input: UpdateIdentityInput): Promise<Identity>;
    delete(id: string): Promise<{
        success: true;
    }>;
    emails(id: string, opts?: PaginationParams): Promise<ListResponse<EmailMessage>>;
    getEmail(id: string, emailId: string): Promise<EmailMessage>;
    sendEmail(id: string, input: SendEmailInput): Promise<EmailMessage>;
    deleteEmail(id: string, emailId: string): Promise<{
        success: true;
    }>;
    sms(id: string, opts?: PaginationParams): Promise<ListResponse<SmsMessage>>;
    getSms(id: string, smsId: string): Promise<SmsMessage>;
    deleteSms(id: string, smsId: string): Promise<{
        success: true;
    }>;
}
export declare class AliasKit {
    readonly identities: IdentitiesApi;
    private readonly apiKey;
    private readonly baseUrl;
    private readonly fetchImpl;
    constructor(options: AliasKitOptions);
    request<T>(method: 'GET' | 'POST' | 'PATCH' | 'DELETE', path: string, body?: unknown): Promise<T>;
}
export {};
