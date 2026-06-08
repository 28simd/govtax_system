# V4 Added Concepts

## 1. Tax Clearance Certificates

Purpose: prove that a taxpayer has no blocking tax obligations.

Code:

```txt
prisma/schema.prisma -> TaxClearanceCertificate
lib/clearance.ts
app/(app)/clearance/page.tsx
app/api/clearance/request/route.ts
```

## 2. Compliance Calendar

Purpose: central calendar for filing dates, payment due dates, appeal deadlines, hearings, inspections, and reminders.

Code:

```txt
ComplianceCalendarEvent
lib/compliance-calendar.ts
app/(app)/compliance-calendar/page.tsx
```

## 3. Case Management

Purpose: unified workflow for audits, disputes, collections, refund reviews, fraud reviews, and compliance reviews.

Code:

```txt
CaseFile, CaseTask, CaseNote
lib/cases.ts
app/(app)/cases/page.tsx
```

## 4. Collections and Enforcement

Purpose: manage overdue taxpayers from reminder to enforcement action.

Code:

```txt
CollectionCase
lib/collections.ts
app/(app)/collections/page.tsx
```

## 5. Payment Plans

Purpose: split tax debt into installments with due dates and tracking.

Code:

```txt
PaymentPlan, PaymentPlanInstallment
lib/payment-plans.ts
app/(app)/payment-plans/page.tsx
```

## 6. Penalty Automation

Purpose: scheduled engine that finds overdue invoices and applies penalties.

Code:

```txt
PenaltyAutomationRun
lib/penalty-automation.ts
app/api/penalties/run/route.ts
```

## 7. Data Quality Monitor

Purpose: detect missing, duplicate, inconsistent, or risky data.

Code:

```txt
DataQualityIssue
lib/data-quality.ts
app/api/data-quality/run/route.ts
```

## 8. Workflow Designer

Purpose: configurable approvals and workflow steps.

Code:

```txt
WorkflowDefinition, WorkflowStep, WorkflowInstance
lib/workflow-designer.ts
```

## 9. Public Services Portal

Purpose: public-facing tools: tax calculator, TIN check, forms/guides, complaints, verification.

Code:

```txt
app/public/page.tsx
app/public/tax-calculator/page.tsx
app/public/tin-check/page.tsx
app/public/forms/page.tsx
app/public/complaint/page.tsx
```

## 10. API Developer Portal

Purpose: allow other systems to integrate using API clients, scopes, request logs, and webhooks.

Code:

```txt
ApiClient, ApiRequestLog
lib/api-keys.ts
app/(app)/developer/page.tsx
app/api/developer/clients/route.ts
```
