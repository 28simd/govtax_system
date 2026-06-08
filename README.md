# GovTax V4 Learning Production System

This version adds the requested government operations concepts and extensive documentation/comments to help you understand how production-level systems are structured.

## New V4 Concepts Added

- Tax clearance certificates
- Compliance calendar
- Case management
- Collections/enforcement
- Payment plans/installments
- Penalty automation
- Data quality monitor
- Workflow designer
- Public services portal
- API developer portal

## Start Here for Learning

Read this first:

```txt
docs/LEARNING_PATH.md
```

Then read:

```txt
docs/CONCEPTS_V4.md
docs/ARCHITECTURE_WALKTHROUGH.md
docs/CODE_REVIEW_NOTES.md
```

## Run

```bash
npm install
cp .env.example .env
npx prisma db push
npm run seed
npm run dev
```

Login:

```txt
admin@tax.local
Admin@12345
```

## Important

This project is designed to teach production-level architecture. It includes code-level foundations for serious modules, but real-world launch still requires actual provider credentials, legal tax rules, infrastructure hardening, security testing, and operational SOPs.
