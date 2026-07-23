# ADR-001: Use Node.js as the Runtime Platform

## Status

Accepted

## Context

We need a runtime platform for building a web application with REST API capabilities. The team requires:

- Fast development iteration cycles
- A large ecosystem of libraries for web, database, and infrastructure tooling
- Good support for asynchronous I/O (database queries, HTTP calls, email sending)
- Wide availability of developers familiar with the platform
- Straightforward deployment model

## Decision

Use Node.js (>=18.0.0) as the application runtime.

## Consequences

### Positive

- Single language (JavaScript/TypeScript) across the stack reduces context switching
- npm ecosystem provides mature libraries for PostgreSQL, Redis, JWT, and SMTP
- Non-blocking I/O model handles concurrent connections efficiently without threading complexity
- Node.js 18+ provides native fetch, test runner, and improved performance
- Wide CI/CD tooling support (GitHub Actions has first-class Node.js support)

### Negative

- Single-threaded event loop means CPU-intensive work can block the process
- Callback/promise-based code can be harder to debug than synchronous alternatives
- Rapid ecosystem churn requires attention to dependency maintenance

### Mitigations

- Use worker threads or separate services for CPU-intensive operations if needed
- Adopt async/await consistently to keep async code readable
- Pin dependency versions and use automated update tooling (e.g., Dependabot)
