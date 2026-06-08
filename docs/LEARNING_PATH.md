# Learning Path: Understanding a Production-Level Tax System

This project is designed for learning. Do not start by reading random files. Follow this order.

## 1. Big Picture

Read:

```txt
docs/MODULES.md
docs/CONCEPTS_V4.md
docs/ARCHITECTURE_WALKTHROUGH.md
```

Goal: understand what each module is responsible for.

## 2. Database First

Read:

```txt
prisma/schema.prisma
```

Focus on these groups:

```txt
Tenant/Branch/User
Taxpayer/Filing/Assessment/Invoice/Payment
Ledger/Reconciliation
Approvals/Disputes/Documents
V4 concepts: Clearance, Calendar, Cases, Collections, Plans, Penalties, DataQuality, Workflow, API clients
```

## 3. Backend Services

Read the service files in `lib/`:

```txt
lib/authz.ts
lib/tax-engine.ts
lib/clearance.ts
lib/compliance-calendar.ts
lib/cases.ts
lib/collections.ts
lib/payment-plans.ts
lib/penalty-automation.ts
lib/data-quality.ts
lib/workflow-designer.ts
lib/api-keys.ts
lib/ledger.ts
lib/reconciliation.ts
```

Each file has comments explaining the production concept.

## 4. API Layer

Read:

```txt
app/api/**/route.ts
```

Goal: understand how external systems, public portals, and admin tools call backend services.

## 5. UI Layer

Read:

```txt
app/(app)/**/page.tsx
app/public/**/page.tsx
components/nav.tsx
components/forms.tsx
```

Goal: understand how pages connect to business workflows.

## 6. Production Operations

Read:

```txt
docs/PRODUCTION_READINESS.md
docs/SECURITY.md
docs/DEPLOYMENT.md
.github/workflows/ci.yml
scripts/backup-postgres.sh
scripts/restore-postgres.sh
```

Goal: understand how production software is deployed, monitored, secured, and recovered.
