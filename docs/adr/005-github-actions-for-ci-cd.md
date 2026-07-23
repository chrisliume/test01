# ADR-005: Use GitHub Actions for CI/CD

## Status

Accepted

## Context

The project needs a continuous integration and deployment pipeline that:

- Runs automated tests on every push and pull request
- Validates the build across multiple Node.js versions
- Integrates tightly with the GitHub-hosted repository
- Requires minimal configuration and maintenance overhead

## Decision

Use GitHub Actions as the CI/CD platform, with a workflow that tests across Node.js 18 and 20, then builds the application.

## Consequences

### Positive

- Native GitHub integration: no external service accounts or webhook setup needed
- Matrix strategy tests across multiple Node.js versions with minimal config
- Free tier is sufficient for most open-source and small team workloads
- Large marketplace of pre-built actions for common tasks
- YAML-based configuration lives in the repository alongside the code

### Negative

- Vendor lock-in to GitHub's ecosystem for CI/CD
- Complex workflows can become hard to debug (no local runner for exact parity)
- Shared runner environments may have unpredictable queue times

### Mitigations

- Keep workflow definitions simple and well-documented
- Use `act` for local workflow testing where possible
- Cache npm dependencies to reduce build times
- Consider self-hosted runners if queue times become a bottleneck
