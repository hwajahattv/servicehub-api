# ADR-001: Repository Pattern

**Status:** Accepted

**Date:** July 2026

**Decision Makers:** Engineering Team

**Category:** Architecture

---

# 1. Context

ServiceHub is designed as an enterprise-grade application that is expected to grow significantly over time. The project will contain multiple business domains such as Authentication, User Management, Role Management, Complaint Management, Reporting, Notifications, and more.

The application uses Prisma ORM for database access. While Prisma provides an excellent developer experience and type safety, directly accessing Prisma from controllers or business services would tightly couple business logic to the persistence layer.

As the project grows, direct database access throughout the application would make the codebase harder to maintain, test, and evolve.

A clear separation between business logic and data access is therefore required.

---

# 2. Decision

The project will implement the **Repository Pattern**.

Every business module will contain its own repository responsible for interacting with the database.

Business services will communicate only with repositories and will never execute Prisma queries directly.

Controllers will communicate only with services.

The dependency flow will be:

```text
Controller
      │
      ▼
Service
      │
      ▼
Repository
      │
      ▼
Prisma ORM
      │
      ▼
PostgreSQL
```

Each repository will encapsulate all persistence logic related to its aggregate or entity.

---

# 3. Rationale

The Repository Pattern provides a clear separation between business logic and persistence logic.

This separation allows the engineering team to:

* Keep services focused on business rules.
* Keep controllers focused on HTTP concerns.
* Centralize database queries.
* Improve maintainability.
* Improve readability.
* Simplify testing.
* Reduce code duplication.
* Allow future changes to the persistence layer with minimal impact on business logic.

The pattern also aligns well with NestJS dependency injection and modular architecture.

---

# 4. Alternatives Considered

## Option 1 — Direct Prisma Access in Services

### Description

Services interact directly with Prisma Client.

### Advantages

* Less boilerplate.
* Faster initial development.
* Fewer files.

### Disadvantages

* Tight coupling to Prisma.
* Database logic scattered across services.
* Harder to mock during testing.
* Difficult to reuse complex queries.
* Reduced maintainability as the application grows.

**Decision:** Rejected.

---

## Option 2 — Repository Pattern (Selected)

### Description

Repositories encapsulate all persistence operations.

### Advantages

* Clear separation of responsibilities.
* Better organization.
* Easier testing.
* Easier maintenance.
* Improved scalability.
* Centralized database access.

### Disadvantages

* Slightly more boilerplate.
* Additional classes to maintain.

**Decision:** Accepted.

---

# 5. Consequences

Adopting the Repository Pattern means:

* Every module will include a repository layer.
* Business services will not contain Prisma queries.
* Database logic will be centralized.
* Future migrations to another ORM or persistence mechanism will be easier.
* Unit testing becomes simpler because repositories can be mocked independently of business logic.

The trade-off is a small increase in project structure and boilerplate, which is considered acceptable for an enterprise application.

---

# 6. Repository Responsibilities

Repositories are responsible for:

* Creating records.
* Reading records.
* Updating records.
* Deleting records (soft or hard, depending on the module).
* Executing database transactions.
* Performing complex database queries.
* Managing pagination, filtering, and sorting at the persistence level.
* Mapping Prisma operations to domain-friendly methods.

Repositories are **not** responsible for:

* Business rules.
* Authorization.
* Validation.
* HTTP responses.
* Logging business events.

---

# 7. Service Responsibilities

Services are responsible for:

* Implementing business rules.
* Coordinating multiple repositories.
* Applying authorization rules.
* Handling business validations.
* Executing workflows.
* Throwing domain-specific exceptions.

Services should never access Prisma directly.

---

# 8. Controller Responsibilities

Controllers are responsible for:

* Receiving HTTP requests.
* Validating request data through DTOs.
* Calling services.
* Returning HTTP responses.

Controllers must never access repositories or Prisma directly.

---

# 9. Example Module Structure

```text
users/
│
├── controllers/
│     users.controller.ts
│
├── services/
│     users.service.ts
│
├── repositories/
│     users.repository.ts
│
├── dto/
│
├── entities/
│
└── users.module.ts
```

This structure should be followed consistently across all feature modules.

---

# 10. Impact on Testing

The Repository Pattern improves testability by allowing:

* Repository unit tests to verify database interactions.
* Service unit tests to focus on business logic using mocked repositories.
* Controller tests to verify request and response handling.

This separation enables faster and more focused automated testing.

---

# 11. Review

This decision should be reviewed if:

* The project migrates to a different architectural style (e.g., CQRS or Event Sourcing).
* A different persistence strategy is adopted.
* Repository abstraction no longer provides sufficient value.

Until such changes occur, the Repository Pattern remains the standard for all persistence operations within ServiceHub.

---

# 12. Status History

| Date      | Status   | Notes                                                 |
| --------- | -------- | ----------------------------------------------------- |
| July 2026 | Accepted | Initial architectural decision for data access layer. |
