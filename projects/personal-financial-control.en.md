---
gallery:
  - src: /projects/personal-financial-control/dashboard-1920.jpg
    alt: "Dashboard with forecast balance, bills due, cards and investments"
    caption: "Dashboard: forecast balance for the month, bills due by day, card bills, the split between reserve and portfolio, and housing costs."
  - src: /projects/personal-financial-control/credit-card-1920.jpg
    alt: "Credit card screen with the open bill, upcoming bills and open installments"
    caption: "Credit cards: current bill, commitments on upcoming bills and open installments."
  - src: /projects/personal-financial-control/projected-balance-1920.jpg
    alt: "Projected balance with daily evolution and alerts"
    caption: "Projected balance: day-by-day cash flow with recurring entries, card bills and a minimum reserve."
  - src: /projects/personal-financial-control/investments-1920.jpg
    alt: "Investments with net worth, reserve, portfolio and allocation by class"
    caption: "Investments: reserve and long-term portfolio added up without double counting."
  - src: /projects/personal-financial-control/transactions-1920.jpg
    alt: "Transactions with the period result and top expense categories"
    caption: "Transactions: period result, where the money went, and a filterable statement."
---

## Context

Spreadsheets couldn't answer what I actually wanted to know: how much will be left at the end of the month, how much of the next few months the credit card has already committed, and how much of my net worth is emergency reserve versus long-term investment.

Personal Financial Control was built for that. It brings accounts, income, expenses, transfers, credit cards with installments and bills, recurring entries, investments and goals into one place, and imports data straight from the bank through **Open Finance**. Since it stores real financial data, security and consistency shaped every decision.

## Architecture

![Personal Financial Control architecture diagram](/projects/personal-financial-control/architecture.en.svg)

*A Next.js application that keeps authentication, domain rules and encryption on the server. Reads go to a local replica and writes go to Turso.*

The app is a Next.js monolith. The UI uses Server Components and Server Actions, and external integrations use API Routes. Every request goes through `proxy.ts`, which checks the session, PIN unlock and origin before reaching the domain. Financial rules live in pure modules under `lib/`, tested in isolation. Persistence uses Drizzle on SQLite/libSQL with versioned migrations.

## Technical decisions

### Open Finance without duplicates

The Pluggy integration is the trickiest part of the project, because bank data arrives incomplete and out of order. Each imported entry is classified in this order:

| Classification | How it is detected | Result |
|---|---|---|
| Own transfer | Payer **and** payee are the account holder, by tax ID and then by full name | One transfer, neither income nor expense |
| Bill payment | Description with `PAGAMENTO` followed by `FATURA` | Linked to the bill, excluded from expenses |
| Investment in or out | Operation type or description | Investment movement |
| Regular | Everything else | Income or expense |

Some real problems I had to solve:

- **Weekend Pix transfers:** one bank posts on Saturday and the other only on the next business day. Transfers between linked accounts are matched by amount within a 3-day window and become a single record.
- **Installments without a shared ID:** Pluggy returns one transaction per installment. They are grouped by normalized description, amount and installment count, with a 1-cent tolerance per installment, because some banks put the rounding remainder on the first one.
- **Pending entries confirmed under a new `id`:** the confirmed entry takes over the matching local row instead of creating a duplicate.
- **Bill reconciliation:** each bill is checked with *total = purchases + unpaid previous balance − payments before closing*, and shows up as *Reconciled*, *Mismatch* or *Unlinked payment*.
- **Learned categories:** when the user categorizes an imported entry, the app stores a rule for the normalized description and applies it on later syncs, without relying on Pluggy's paid plan.

Syncing is idempotent: running it twice creates nothing new, and a paid bill is never rewritten. Moving from manual history to bank data is done by a script with a dry run, explicit confirmation of the target database, and before/after reports to compare totals.

### Field-level encryption

Monetary values, descriptions and remote identifiers are stored encrypted with **AES-256-GCM**. Encryption lives in the ORM layer, as custom Drizzle column types, so domain code reads and writes plain values without knowing about it.

Keys are derived per purpose with HKDF, and the field context is bound as authenticated data (AAD). A ciphertext copied into another column fails verification instead of being read. To search without decrypting the whole table, `_hash` columns store an HMAC of the value.

Every business table must be classified in a versioned inventory: a new unclassified column breaks the schema definition, and the database gets *CHECK constraints* that enforce the format and presence of the indexes.

### Local replica: reads up to 96% faster

With Turso being remote, every page made several queries over the network. The fix was a local SQLite replica: all reads hit the local file, writes still go to Turso, and the app syncs every 30 seconds, when the window regains focus and when the connection comes back.

| Service | Direct Turso | Replica | Reduction |
|---|---:|---:|---:|
| Dashboard | 1,671.78 ms | 183.10 ms | 89.0% |
| Credit card | 1,773.32 ms | 123.04 ms | 93.1% |
| Transactions | 148.84 ms | 5.99 ms | 96.0% |
| Projected balance | 642.98 ms | 164.30 ms | 74.4% |

Medians of five warm samples, on real data with SELECTs only, including decryption and calculations.

Consistency got careful handling: the app reads its own writes right after confirming them, a file lock keeps two processes off the same replica, and if a sync fails the app switches to **read-only** instead of writing over stale data. If a write's response is lost, the app reports it as unconfirmed and does not retry on its own, because the remote commit may already have happened.

### Local session and PIN

Google is only contacted at login. After that, the session uses HMAC-signed cookies and a 6-digit PIN, with a configurable inactivity lock. Five wrong PINs invalidate every session. There is no public sign-up: only authorized emails stored in the database can get in.

### MCP server for AI agents

The app exposes an **MCP** server at `/api/mcp` so an agent such as Codex or Claude can query and record income, expenses and card purchases without direct database access. The design puts safety first:

- it accepts only loopback connections and a dedicated token, of which the server stores only the hash;
- amounts are always integer cents, dates are `YYYY-MM-DD` and IDs are UUIDs;
- every create call requires an idempotency key, so repeating a call never duplicates an entry;
- deletes require the literal argument `confirm: true`.

## Quality and delivery

- More than 110 **Vitest** test files covering domain rules, APIs and components, plus 25 end-to-end scenarios with **Playwright**.
- A replica integration test against an isolated libSQL in Docker that simulates a real connection drop.
- Performance benchmarks with versioned baselines.
- Seven **GitHub Actions** workflows. The PR quality gate runs build, lint, typecheck, coverage, dependency audit, duplication, code size, E2E and benchmarks under a no-regression policy.
- Runs with Docker Compose, as a desktop app on Linux, or in **demo mode** with fictional in-memory data, which is the version deployed on Vercel. The screenshots at the top come from it, so their interface is in Portuguese.
