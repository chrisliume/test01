# ADR-003: Use JWT for API Authentication

## Status

Accepted

## Context

The application needs an authentication mechanism for its REST API. Requirements:

- Stateless verification — avoid database lookups on every request
- Support for token expiration and refresh patterns
- Compatibility with multiple client types (browser, mobile, third-party)
- Ability to embed user claims (role, permissions) in the token

## Decision

Use JSON Web Tokens (JWT) for API authentication, with configurable expiration and a server-side secret for signing.

## Consequences

### Positive

- Stateless: tokens are self-contained, reducing per-request database load
- Standard format (RFC 7519) with broad library support
- Tokens can carry claims (user ID, roles) without additional lookups
- Works well with REST APIs and microservice architectures
- Configurable expiration (`JWT_EXPIRES_IN`) balances security and usability

### Negative

- Tokens cannot be individually revoked without additional infrastructure (blocklist)
- Token size is larger than opaque session IDs
- Secret rotation requires careful coordination

### Mitigations

- Keep token expiration short (default: 7 days) and implement refresh token rotation
- Use Redis-backed blocklist for immediate revocation when needed
- Store `JWT_SECRET` securely and plan for key rotation procedures
- Never store sensitive data in JWT payload (it is base64-encoded, not encrypted)
