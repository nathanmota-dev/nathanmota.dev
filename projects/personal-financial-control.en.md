---
gallery:
  - src: /projects/personal-financial-control/dashboard-1920.jpg
    alt: "Dashboard with forecast balance, bills due, cards and investments"
    caption: "Dashboard: forecast balance for the month, bills due by day, card bills, the split between reserve and portfolio, and housing costs."
  - src: /projects/personal-financial-control/ai-chat-1920.jpg
    alt: "AI assistant chat open next to the dashboard, answering what the biggest expense of the month was"
    caption: "AI assistant: the quick question \"What was my biggest expense this month?\" answered from the app's own entries, fetched through read-only tools."
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

Personal Financial Control was built for that. It brings accounts, income, expenses, transfers, credit cards with installments and bills, recurring entries, investments and goals into one place, and imports data straight from the bank through **Open Finance**. On top of that sits **AI**: it suggests categories for what comes in from the bank and answers questions in plain language, such as *"what was my biggest expense this month?"* or *"can I still spend this month?"*. Since the app stores real financial data, security and consistency shaped every decision, including what can and cannot be sent to a model.

## Architecture

![Personal Financial Control architecture diagram](/projects/personal-financial-control/architecture.en.svg)

*A Next.js application that keeps authentication, domain rules, encryption and AI calls on the server. Reads go to a local replica and writes go to Turso.*

The app is a Next.js monolith. The UI uses Server Components and Server Actions, and external integrations use API Routes. Every request goes through `proxy.ts`, which checks the session, PIN unlock and origin before reaching the domain. Financial rules live in pure modules under `lib/`, tested in isolation. Persistence uses Drizzle on SQLite/libSQL with versioned migrations.

## AI in the app

AI is optional and runs entirely on the server, through the **Vercel AI SDK**. The user picks a provider under *Settings → AI*: **OpenAI**, **Anthropic**, **Google Gemini**, **DeepSeek**, or **Ollama** running locally when the data should not leave the machine. With nothing configured, nothing is sent anywhere.

### Automatic categorization with suggestions

After each bank sync, uncategorized entries go to the model together with the allowed categories and up to 300 of the user's own examples, taken from the rules they have already confirmed. That way the AI follows the person's criteria instead of a generic one.

The result goes through several checks before it shows up:

- **Structured output with an enum:** the Zod response schema only accepts aliases of real categories (`c1`, `c2`…), so the model cannot invent a category, and database UUIDs never reach the provider.
- **Validation in code:** a suggestion only counts with a confidence of at least 0.8 and a matching type (income only goes to an income category, expenses only to expense ones). The prompt asks for `null` instead of a guess, because a wrong category costs more than none.
- **Prompt injection protection:** entry descriptions come from the bank and are treated as data, never as instructions.
- **Each description is asked once:** every answer, including "unknown", is stored (encrypted), and the next sync only sends what is new. Batches of 50 run one after another to stay under the provider's rate limit.

Nothing is applied on its own. The suggestion shows up in the review screen with its reason and an *Accept* button. Once accepted it becomes a regular rule, which also becomes an example for the AI next time.

### Financial assistant chat

A floating button opens a chat that answers questions about the user's real data, with streamed markdown replies. The model never touches the database: it calls *tools* on the server, in a loop of up to 8 steps, and only narrates what they return.

- **The same tools as the MCP server, with no duplicated code:** the MCP tool definitions run against a recorder that captures each tool's name, schema and handler. The chat only gets the ones flagged read-only (`readOnlyHint`), so a write tool added to the MCP later never reaches the model by accident.
- **Numbers come from the app, not the model:** the prompt forbids adding values by hand. Totals and rankings come from `get_spending_summary`, and *"can I still spend this month?"* uses `get_spending_capacity`, which returns how much is left per day and until when, based on the projected balance and card bills.
- **Clear limits:** the chat only reads, gives no investment advice, and gets today's date in the prompt so it can turn "last month" into real periods.
- **Privacy:** the conversation lives only in browser memory, the API key never leaves the server, and provider errors become a fixed message so request details don't leak. The conversation size is capped too.

### Providers, keys and local Ollama

The settings screen can test the connection before saving with a tiny prompt, so a wrong key, address or model shows up right away. With Ollama, the app lists the models installed on the local server, and timeouts are much longer, because a model running on a CPU can take minutes.

The API key is stored with the same field-level encryption as the rest of the app, and the UI only shows it masked. If the saved configuration cannot be read, AI turns off instead of silently falling back to another provider.

### MCP server for AI agents

The app exposes an **MCP** server at `/api/mcp` so an agent such as Codex or Claude can query spending, budget and card bills, categorize pending entries, and record income, expenses and card purchases without direct database access. The design puts safety first:

- it accepts only loopback connections and a dedicated token, of which the server stores only the hash;
- amounts are always integer cents, dates are `YYYY-MM-DD` and IDs are UUIDs;
- every create call requires an idempotency key, so repeating a call never duplicates an entry;
- deletes require the literal argument `confirm: true`.

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
- **Learned categories:** when the user categorizes an imported entry, the app stores a rule for the normalized description and applies it on later syncs, without relying on Pluggy's paid plan. These rules are also the examples that guide the AI.

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

## Quality and delivery

- More than 110 **Vitest** test files covering domain rules, APIs, components and the AI flow with mocked models, plus 25 end-to-end scenarios with **Playwright**.
- A replica integration test against an isolated libSQL in Docker that simulates a real connection drop.
- Performance benchmarks with versioned baselines.
- Seven **GitHub Actions** workflows. The PR quality gate runs build, lint, typecheck, coverage, dependency audit, duplication, code size, E2E and benchmarks under a no-regression policy.
- Runs with Docker Compose, as a desktop app on Linux, or in **demo mode** with fictional in-memory data, which is the version deployed on Vercel. The screenshots at the top come from it, so their interface is in Portuguese.
