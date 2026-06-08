import { prisma } from '@/lib/prisma';

/**
 * Collections and Enforcement
 * ---------------------------
 * Converts unpaid invoices into managed collection cases and escalates them
 * through stages. Real deployments should align stages to official SOPs.
 */
export async function createCollectionCase(input: { tenantId: string; collectionNo: string; taxpayerId: string; invoiceId?: string; outstandingAmount: number }) {
  return prisma.collectionCase.create({ data: { ...input, stage: 'REMINDER' } });
}

export async function escalateCollectionCase(id: string, stage: any, notes?: string) {
  return prisma.collectionCase.update({ where: { id }, data: { stage, notes, nextActionAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7) } });
}
