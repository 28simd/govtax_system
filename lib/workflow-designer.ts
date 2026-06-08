import { prisma } from '@/lib/prisma';

/**
 * Workflow Designer
 * -----------------
 * Stores configurable approval workflows. The runtime starts an instance and
 * then approval screens/API routes advance it step-by-step.
 */
export async function createWorkflow(input: { tenantId: string; name: string; trigger: any; steps: Array<{ sequence: number; type: any; role?: string; config?: unknown }> }) {
  return prisma.workflowDefinition.create({ data: { tenantId: input.tenantId, name: input.name, trigger: input.trigger, active: false, steps: { create: input.steps as any } }, include: { steps: true } });
}

export async function startWorkflow(input: { tenantId: string; workflowId: string; entity: string; entityId: string }) {
  return prisma.workflowInstance.create({ data: { ...input, status: 'PENDING', currentStep: 1 } });
}
