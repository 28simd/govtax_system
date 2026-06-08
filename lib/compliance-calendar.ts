import { prisma } from '@/lib/prisma';

/**
 * Compliance Calendar
 * -------------------
 * Centralizes deadlines so the system can generate reminders, penalties,
 * dashboards, and officer task queues from one source of truth.
 */
export async function createComplianceDeadline(input: { tenantId: string; title: string; type: any; dueAt: Date; taxpayerId?: string; relatedEntity?: string; relatedEntityId?: string }) {
  return prisma.complianceCalendarEvent.create({ data: { ...input, status: 'SCHEDULED' } });
}

export async function markMissedDeadlines(tenantId: string, now = new Date()) {
  return prisma.complianceCalendarEvent.updateMany({ where: { tenantId, status: 'SCHEDULED', dueAt: { lt: now } }, data: { status: 'MISSED' } });
}
