import { prisma } from '@/lib/prisma';

/**
 * Payment Plan Service
 * --------------------
 * Splits a debt into installments. The plan and installment rows make it easy
 * to check defaults, send reminders, and allocate future payments.
 */
export async function createInstallmentPlan(input: { tenantId: string; planNo: string; taxpayerId: string; invoiceId: string; totalAmount: number; installmentCount: number; startDate: Date }) {
  const amount = Math.round((input.totalAmount / input.installmentCount) * 100) / 100;
  return prisma.paymentPlan.create({
    data: {
      ...input,
      status: 'REQUESTED',
      installments: { create: Array.from({ length: input.installmentCount }).map((_, idx) => ({ sequence: idx + 1, amount, dueDate: new Date(input.startDate.getTime() + idx * 30 * 24 * 60 * 60 * 1000) })) },
    },
    include: { installments: true },
  });
}
