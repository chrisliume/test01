# ADR-004: Use Redis for Caching and Sessions

## Status

Accepted

## Context

The application needs:

- A fast cache layer to reduce database load for frequently accessed data
- Session storage that survives application restarts
- Potential support for background job queues in the future
- Low-latency data access for real-time features

## Decision

Use Redis as the caching layer, session store, and potential job queue backend.

## Consequences

### Positive

- Sub-millisecond read/write latency for cached data
- Built-in TTL support simplifies cache expiration
- Session data persists across application restarts (unlike in-memory stores)
- Pub/sub and list primitives enable future job queue and real-time features
- Widely supported by Node.js libraries (ioredis, bull, connect-redis)

### Negative

- Adds an infrastructure dependency that must be provisioned and monitored
- Data is primarily in-memory; requires configuration for persistence (RDB/AOF)
- Cache invalidation logic adds application complexity

### Mitigations

- Use managed Redis services (AWS ElastiCache, Redis Cloud) for operational simplicity
- Configure AOF persistence for session data durability
- Start with simple cache-aside pattern; add complexity only when needed
- Ensure the application degrades gracefully if Redis is temporarily unavailable
