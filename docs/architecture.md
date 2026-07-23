# System Architecture

## Overview

Test01 is a Node.js web application following a layered architecture pattern. It provides a REST API server with PostgreSQL for persistent storage, Redis for caching and session management, and JWT-based authentication.

## System Context

```
┌─────────────┐       ┌──────────────────────────────────────────┐
│   Clients   │──────▶│            Test01 Application             │
│ (Browser/API)│◀──────│              (Node.js)                   │
└─────────────┘       └────┬──────────────┬──────────────┬───────┘
                           │              │              │
                    ┌──────▼──────┐ ┌─────▼─────┐ ┌─────▼─────┐
                    │ PostgreSQL  │ │   Redis   │ │   SMTP    │
                    │  (Primary   │ │ (Cache /  │ │  (Email   │
                    │   Storage)  │ │  Sessions)│ │  Delivery)│
                    └─────────────┘ └───────────┘ └───────────┘
```

## Component Architecture

### Application Layer

| Layer | Responsibility |
|-------|---------------|
| **HTTP/Router** | Request routing, CORS handling, input parsing |
| **Authentication** | JWT token issuance/validation, session management |
| **Business Logic** | Domain rules, data transformation, orchestration |
| **Data Access** | Database queries, Redis operations, external service calls |

### Infrastructure Components

- **PostgreSQL** — Primary data store for all persistent application data
- **Redis** — Used for caching, session storage, and (potentially) job queues
- **SMTP** — Outbound email delivery for notifications and transactional messages

## Key Design Decisions

Design decisions are tracked as Architecture Decision Records (ADRs) in [`docs/adr/`](./adr/).

| ADR | Decision |
|-----|----------|
| [ADR-001](./adr/001-use-nodejs-with-typescript.md) | Use Node.js as the runtime platform |
| [ADR-002](./adr/002-use-postgresql-primary-database.md) | Use PostgreSQL as the primary database |
| [ADR-003](./adr/003-jwt-based-authentication.md) | Use JWT for API authentication |
| [ADR-004](./adr/004-use-redis-for-caching-and-sessions.md) | Use Redis for caching and sessions |
| [ADR-005](./adr/005-github-actions-for-ci-cd.md) | Use GitHub Actions for CI/CD |

## Deployment

The application is deployed as a single Node.js process. CI/CD is handled via GitHub Actions (see `.github/workflows/ci.yml`), which runs tests across Node.js 18 and 20 before building.

### Environment Configuration

All configuration is managed through environment variables. See `.env.example` for the full list of required variables and their descriptions.

### Port and Network

- Application listens on `PORT` (default: 3000)
- CORS origins are configured via `CORS_ORIGINS`
- External services (PostgreSQL, Redis, SMTP) are configured via their respective URL/host variables

## Security Boundaries

```
┌─ Trust Boundary ──────────────────────────────────────┐
│                                                       │
│  ┌─────────────┐    ┌────────────────────────────┐   │
│  │  JWT Auth   │───▶│   Authenticated Endpoints  │   │
│  └─────────────┘    └────────────────────────────┘   │
│         ▲                                             │
│         │                                             │
└─────────┼─────────────────────────────────────────────┘
          │
   ┌──────┴──────┐
   │   Public    │
   │  Endpoints  │
   │ (login/reg) │
   └─────────────┘
```

- **Public endpoints** — Login, registration, health checks
- **Authenticated endpoints** — Protected by JWT validation middleware
- **Secrets** — JWT_SECRET and SESSION_SECRET must be strong random values in production
- **Database credentials** — Scoped to the application's database only
