import { prisma } from '@/lib/prisma';

/**
 * Penalty Automation
 * ------------------
 * Finds overdue invoices and applies a simple penalty. In production, this
 * should use approved penalty schedules from TaxRule or a PenaltyRule table.
 */
export async function runPenaltyAutomation(input: { tenantId: string; runNo: string; penaltyRate: number }) {
  const run = await prisma.penaltyAutomationRun.create({ data: { tenantId: input.tenantId, runNo: input.runNo, status: 'RUNNING', startedAt: new Date() } });
  const invoices = await prisma.invoice.findMany({ where: { tenantId: input.tenantId, dueDate: { lt: new Date() }, balance: { gt: 0 }, status: { in: ['PENDING', 'PARTIAL', 'OVERDUE'] } } });
  let totalPenalty = 0;
  for (const invoice of invoices) {
    const penalty = Math.round(Number(invoice.balance) * input.penaltyRate * 100) / 100;
    totalPenalty += penalty;
    await prisma.invoice.update({ where: { id: invoice.id }, data: { balance: Number(invoice.balance) + penalty, amount: Number(invoice.amount) + penalty, status: 'OVERDUE' } });
  }
  return prisma.penaltyAutomationRun.update({ where: { id: run.id }, data: { status: 'COMPLETED', completedAt: new Date(), invoicesChecked: invoices.length, penaltiesApplied: invoices.length, totalPenalty } });
}
