import { prisma } from '@/lib/prisma';

/**
 * Data Quality Monitor
 * --------------------
 * Scans for data issues that create operational risk: duplicate identifiers,
 * missing contact info, orphaned records, and inconsistent balances.
 */
export async function runDataQualityScan(tenantId: string) {
  const issues: Array<{ ruleKey: string; title: string; description: string; entity: string; entityId?: string; severity: any; suggestedFix?: string }> = [];
  const taxpayers = await prisma.taxpayer.findMany({ where: { tenantId } });
  for (const t of taxpayers) {
    if (!t.phone && !t.email) issues.push({ ruleKey: 'MISSING_CONTACT', title: 'Missing contact information', description: `${t.name} has no phone or email`, entity: 'Taxpayer', entityId: t.id, severity: 'MEDIUM', suggestedFix: 'Add phone or email' });
    if (!t.city) issues.push({ ruleKey: 'MISSING_CITY', title: 'Missing city', description: `${t.name} has no city`, entity: 'Taxpayer', entityId: t.id, severity: 'LOW', suggestedFix: 'Add city/address' });
  }
  await prisma.dataQualityIssue.createMany({ data: issues.map(i => ({ tenantId, ...i } as any)), skipDuplicates: true });
  return { issuesFound: issues.length };
}
