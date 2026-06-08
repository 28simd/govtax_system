import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';

/**
 * API Developer Portal Helpers
 * ----------------------------
 * API clients receive a public clientId and a one-time secret. Store only the
 * hash of the secret, never the secret itself.
 */
export async function createApiClient(input: { tenantId: string; name: string; scopes: string[] }) {
  const clientId = `cli_${crypto.randomBytes(12).toString('hex')}`;
  const secret = `sec_${crypto.randomBytes(24).toString('hex')}`;
  const hashedSecret = await bcrypt.hash(secret, 12);
  const client = await prisma.apiClient.create({ data: { tenantId: input.tenantId, name: input.name, clientId, hashedSecret, scopes: input.scopes } });
  return { client, secret };
}
