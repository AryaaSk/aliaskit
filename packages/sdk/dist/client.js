export class AliasKitError extends Error {
    status;
    code;
    details;
    constructor(message, opts) {
        super(message);
        this.name = 'AliasKitError';
        this.status = opts.status;
        this.code = opts.code;
        this.details = opts.details;
    }
}
const DEFAULT_BASE_URL = '/api/v1';
function toQuery(params) {
    if (!params)
        return '';
    const search = new URLSearchParams();
    for (const [key, value] of Object.entries(params)) {
        if (value !== undefined)
            search.set(key, String(value));
    }
    const value = search.toString();
    return value ? `?${value}` : '';
}
class IdentitiesApi {
    request;
    constructor(request) {
        this.request = request;
    }
    create(input = {}) {
        return this.request('POST', '/identities', input);
    }
    list(opts) {
        return this.request('GET', `/identities${toQuery(opts)}`);
    }
    get(id) {
        return this.request('GET', `/identities/${id}`);
    }
    update(id, input) {
        return this.request('PATCH', `/identities/${id}`, input);
    }
    delete(id) {
        return this.request('DELETE', `/identities/${id}`);
    }
    emails(id, opts) {
        return this.request('GET', `/identities/${id}/emails${toQuery(opts)}`);
    }
    getEmail(id, emailId) {
        return this.request('GET', `/identities/${id}/emails/${emailId}`);
    }
    sendEmail(id, input) {
        return this.request('POST', `/identities/${id}/emails`, input);
    }
    deleteEmail(id, emailId) {
        return this.request('DELETE', `/identities/${id}/emails/${emailId}`);
    }
    sms(id, opts) {
        return this.request('GET', `/identities/${id}/sms${toQuery(opts)}`);
    }
    getSms(id, smsId) {
        return this.request('GET', `/identities/${id}/sms/${smsId}`);
    }
    deleteSms(id, smsId) {
        return this.request('DELETE', `/identities/${id}/sms/${smsId}`);
    }
}
export class AliasKit {
    identities;
    apiKey;
    baseUrl;
    fetchImpl;
    constructor(options) {
        if (!options?.apiKey) {
            throw new Error('AliasKit `apiKey` is required');
        }
        if (!options.fetch && typeof globalThis.fetch !== 'function') {
            throw new Error('No fetch implementation available. Provide `fetch` in AliasKit options.');
        }
        this.apiKey = options.apiKey;
        this.baseUrl = (options.baseUrl ?? DEFAULT_BASE_URL).replace(/\/+$/, '');
        this.fetchImpl = options.fetch ?? globalThis.fetch;
        this.identities = new IdentitiesApi(this.request.bind(this));
    }
    async request(method, path, body) {
        const response = await this.fetchImpl(`${this.baseUrl}${path}`, {
            method,
            headers: {
                Authorization: `Bearer ${this.apiKey}`,
                'Content-Type': 'application/json',
            },
            body: body === undefined ? undefined : JSON.stringify(body),
        });
        if (!response.ok) {
            let payload = null;
            try {
                payload = (await response.json());
            }
            catch {
                payload = null;
            }
            throw new AliasKitError(payload?.error ?? response.statusText, {
                status: response.status,
                code: payload?.code,
                details: payload,
            });
        }
        if (response.status === 204) {
            return undefined;
        }
        return (await response.json());
    }
}
//# sourceMappingURL=client.js.map