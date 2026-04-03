/**
 * Ephemeral identity lifecycle management.
 * Creates test identities and ensures cleanup even on errors.
 */

import { AliasKitClient, Identity } from './client';

export class IdentityManager {
  constructor(private client: AliasKitClient) {}

  async create(options?: {
    provisionPhone?: boolean;
    metadata?: Record<string, unknown>;
  }): Promise<Identity> {
    return this.client.createIdentity(options);
  }

  async cleanup(identityId: string): Promise<void> {
    try {
      await this.client.deleteIdentity(identityId);
    } catch (err) {
      // Best-effort cleanup. Log but don't throw — the test result matters more.
      console.warn(`[aliaskit] Failed to cleanup identity ${identityId}:`, err);
    }
  }

  /**
   * Run a callback with a temporary identity. Identity is auto-deleted after,
   * whether the callback succeeds or throws.
   */
  async withIdentity<T>(
    callback: (identity: Identity) => Promise<T>,
    options?: { provisionPhone?: boolean; metadata?: Record<string, unknown> }
  ): Promise<T> {
    const identity = await this.create(options);
    try {
      return await callback(identity);
    } finally {
      await this.cleanup(identity.id);
    }
  }
}
