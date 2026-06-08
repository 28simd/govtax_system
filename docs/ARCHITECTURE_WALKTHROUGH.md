# Architecture Walkthrough

## Request Flow

A typical production request follows this path:

```txt
Page or API Route
  -> Permission check using lib/authz.ts
  -> Validate input using Zod validators
  -> Call service function in lib/
  -> Service uses prisma transaction when data must be atomic
  -> Write audit log/security event
  -> Return response or revalidate UI path
```

## Why Services Live in `lib/`

Business logic should not be hidden inside UI pages. For learning and maintainability:

```txt
UI page = presentation
API route = HTTP boundary
Server action = form boundary
lib service = business rule
Prisma schema = data contract
```

## Important Production Pattern

For financial operations, use transactions:

```ts
await prisma.$transaction(async (tx) => {
  // create payment
  // update invoice balance
  // create receipt
  // create journal entries
  // write audit log
});
```

This prevents half-finished financial records.

## Module Boundaries

- Tax engine calculates liability.
- Invoicing creates legal payable documents.
- Payment records settlement.
- Receipt proves payment.
- Ledger records accounting impact.
- Reconciliation confirms bank/gateway settlement.
- Audit log proves who did what.
- Workflow controls approvals.
- Case management controls operational work.
