import { prisma } from '@/lib/prisma';
import { verificationCode } from '@/lib/numbering';

/**
 * Tax Clearance Certificate Service
 * ---------------------------------
 * A clearance certificate proves that a taxpayer currently has no blocking
 * compliance issues. In production, the eligibility rules should be approved
 * by the revenue authority and versioned like tax rules.
 */
export async function evaluateClearanceEligibility(tenantId: string, taxpayerId: string) {
  const [openInvoices, openDisputes, openQualityIssues] = await Promise.all([
    prisma.invoice.count({ where: { tenantId, taxpayerId, balance: { gt: 0 }, status: { in: ['PENDING', 'PARTIAL', 'OVERDUE'] } } }),
    prisma.dispute.count({ where: { tenantId, taxpayerId, status: { in: ['SUBMITTED', 'UNDER_REVIEW', 'NEED_MORE_INFO', 'HEARING_SCHEDULED'] } } }),
    prisma.dataQualityIssue.count({ where: { tenantId, entity: 'Taxpayer', entityId: taxpayerId, status: 'OPEN', severity: { in: ['HIGH', 'CRITICAL'] } } }),
  ]);
  const reasons: string[] = [];
  if (openInvoices) reasons.push(`${openInvoices} unpaid invoice(s)`);
  if (openDisputes) reasons.push(`${openDisputes} open dispute(s)`);
  if (openQualityIssues) reasons.push(`${openQualityIssues} critical data quality issue(s)`);
  return { eligible: reasons.length === 0, reasons };
}

export async function requestClearanceCertificate(input: { tenantId: string; taxpayerId: string; certificateNo: string }) {
  const eligibility = await evaluateClearanceEligibility(input.tenantId, input.taxpayerId);
  return prisma.taxClearanceCertificate.create({
    data: {
      tenantId: input.tenantId,
      taxpayerId: input.taxpayerId,
      certificateNo: input.certificateNo,
      verificationCode: verificationCode('CLR'),
      status: eligibility.eligible ? 'APPROVED' : 'UNDER_REVIEW',
      issuedAt: eligibility.eligible ? new Date() : null,
      expiresAt: eligibility.eligible ? new Date(Date.now() + 1000 * 60 * 60 * 24 * 90) : null,
      conditions: { eligibility },
    },
  });
}
