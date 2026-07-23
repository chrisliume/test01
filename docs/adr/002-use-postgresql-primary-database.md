# ADR-002: Use PostgreSQL as the Primary Database

## Status

Accepted

## Context

The application needs a persistent data store that supports:

- Relational data modeling with referential integrity
- ACID transactions for data consistency
- Complex queries (joins, aggregations, full-text search)
- Proven reliability at scale
- Good tooling and ecosystem support

## Decision

Use PostgreSQL as the primary database for all persistent application data.

## Consequences

### Positive

- Mature, battle-tested database with decades of production use
- Rich feature set: JSONB columns, CTEs, window functions, full-text search
- Strong data integrity guarantees via constraints, foreign keys, and transactions
- Excellent Node.js driver support (pg, Prisma, Knex, TypeORM)
- Free and open-source with no licensing costs

### Negative

- Requires operational knowledge for tuning, backups, and high availability
- Horizontal scaling (sharding) is more complex than with NoSQL alternatives
- Schema migrations require planning and tooling

### Mitigations

- Use managed PostgreSQL services (AWS RDS, GCP Cloud SQL) for operational simplicity
- Plan schema migrations carefully; use a migration tool from the start
- Monitor query performance and add indexes as access patterns emerge
