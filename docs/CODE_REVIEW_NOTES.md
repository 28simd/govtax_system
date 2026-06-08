# Code Review Notes

I added comments to the most important learning files and organized the project so you can understand production system structure.

## Most Important Files to Study

```txt
prisma/schema.prisma
lib/authz.ts
lib/tax-engine.ts
lib/clearance.ts
lib/penalty-automation.ts
lib/payment-plans.ts
lib/workflow-designer.ts
lib/data-quality.ts
lib/ledger.ts
lib/reconciliation.ts
app/api/**/route.ts
```

## What Is Fully Implemented vs Foundation

Some modules are complete enough to demonstrate the production concept, but real deployment still requires provider-specific and jurisdiction-specific implementation.

Examples:

- Payment providers use adapter placeholders.
- Penalty automation uses a simple rate and should be replaced by official rules.
- Workflow designer stores workflow definitions but needs a full visual UI for nontechnical admins.
- Public complaint form is UI-ready but should be wired to PublicServiceRequest for final intake.

This is intentional for learning: you can see the architecture without hiding it behind external services.
