import { prisma } from '@/lib/prisma';

/**
 * Case Management Service
 * -----------------------
 * Unifies audits, collections, disputes, refund reviews, and compliance issues.
 * A case gives managers one operational object to assign, track, escalate, and close.
 */
export async function openCase(input: { tenantId: string; caseNo: string; type: any; subject: string; taxpayerId?: string; summary?: string; assignedToId?: string }) {
  return prisma.caseFile.create({ data: { ...input, status: input.assignedToId ? 'ASSIGNED' : 'OPEN' } });
}

export async function addCaseTask(caseId: string, title: string, assigneeId?: string, dueAt?: Date) {
  return prisma.caseTask.create({ data: { caseId, title, assigneeId, dueAt } });
}
