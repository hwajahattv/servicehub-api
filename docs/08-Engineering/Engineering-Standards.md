# Engineering Standards

**Project:** ServiceHub

**Version:** 1.0

**Status:** Active

**Last Updated:** July 2026

---

# 1. Purpose

This document defines the engineering standards and development conventions for the ServiceHub project.

Its purpose is to ensure consistency, maintainability, readability, and scalability across the codebase.

All contributors should follow these standards unless an approved Architecture Decision Record (ADR) specifies otherwise.

---

# 2. General Principles

Development should follow these principles:

* Write code for readability first.
* Prefer simplicity over unnecessary complexity.
* Keep business logic independent from infrastructure.
* Avoid code duplication.
* Follow the Single Responsibility Principle.
* Favor composition over inheritance.
* Keep functions and classes focused on one responsibility.
* Document complex business rules.
* Write self-explanatory code before adding comments.

---

# 3. Project Structure

The backend follows a feature-based modular architecture.

Example:

```text
src/
│
├── common/
├── config/
├── database/
├── modules/
│   ├── auth/
│   ├── users/
│   ├── roles/
│   └── complaints/
│
├── shared/
└── main.ts
```

Each feature module owns its own implementation.

---

# 4. Module Structure

Each module should follow a consistent structure.

```text
module-name/
│
├── controllers/
├── services/
├── repositories/
├── dto/
├── entities/
├── guards/
├── decorators/
├── interfaces/
├── types/
├── constants/
├── module.ts
└── index.ts
```

Not every folder is mandatory. Create folders only when required.

---

# 5. Naming Conventions

## Files

Use kebab-case.

Examples:

```text
auth.service.ts

user.controller.ts

role.repository.ts

create-user.dto.ts
```

---

## Classes

Use PascalCase.

Examples:

```text
AuthService

UserRepository

RoleGuard

CreateUserDto
```

---

## Variables

Use camelCase.

Examples:

```typescript
accessToken

refreshToken

userRepository
```

---

## Constants

Use UPPER_SNAKE_CASE.

Examples:

```typescript
DEFAULT_PAGE_SIZE

ACCESS_TOKEN_EXPIRY

MAX_LOGIN_ATTEMPTS
```

---

## Enums

Use PascalCase.

Examples:

```typescript
UserStatus

ComplaintPriority

RoleType
```

---

# 6. Controller Guidelines

Controllers should:

* Handle HTTP requests only.
* Validate input.
* Call services.
* Return responses.
* Never contain business logic.
* Never communicate directly with Prisma.

---

# 7. Service Guidelines

Services are responsible for business logic.

Services should:

* Implement business rules.
* Coordinate repositories.
* Call external services.
* Throw domain-specific exceptions.
* Remain independent of HTTP concerns.

---

# 8. Repository Guidelines

Repositories are responsible for data access.

Repositories should:

* Encapsulate Prisma queries.
* Never implement business rules.
* Return domain objects.
* Be reusable by multiple services.

---

# 9. DTO Guidelines

Every request entering the API should use DTOs.

DTOs should:

* Validate incoming data.
* Use class-validator decorators.
* Never contain business logic.
* Be immutable whenever possible.

---

# 10. Validation Standards

All incoming data must be validated.

Use:

* class-validator
* class-transformer

Validation should occur before business logic is executed.

---

# 11. API Design Standards

REST endpoints should:

* Use nouns instead of verbs.
* Return proper HTTP status codes.
* Support pagination where appropriate.
* Return consistent response structures.
* Include Swagger documentation.

Example:

```text
GET    /users

POST   /users

GET    /users/:id

PATCH  /users/:id

DELETE /users/:id
```

---

# 12. Error Handling

Application errors should:

* Use NestJS exceptions.
* Return meaningful messages.
* Avoid exposing internal implementation details.
* Be logged appropriately.

Validation errors should return HTTP 400 responses.

Authorization failures should return HTTP 403 responses.

Authentication failures should return HTTP 401 responses.

---

# 13. Logging Standards

Application logs should include:

* Incoming requests
* Errors
* Authentication events
* Queue jobs
* Scheduled tasks

Avoid logging:

* Passwords
* Tokens
* Sensitive personal information
* Secrets

---

# 14. Database Standards

Database design should follow these rules:

* UUID primary keys
* Foreign key constraints
* Explicit relation names where needed
* Soft deletes for business entities
* createdAt and updatedAt timestamps
* Use migrations for every schema change

Database changes must never be applied directly in production.

---

# 15. Security Standards

The application must:

* Hash passwords using bcrypt.
* Protect routes with JWT authentication.
* Authorize users through RBAC.
* Validate all input.
* Store secrets in environment variables.
* Never commit secrets to Git.

---

# 16. Git Workflow

Development follows a feature branch workflow.

Branch naming:

```text
feature/auth-login

feature/role-management

bugfix/refresh-token

hotfix/login-error

docs/prd-update

refactor/user-service
```

Main branches:

```text
main

develop
```

---

# 17. Commit Message Convention

Follow the Conventional Commits specification.

Examples:

```text
feat(auth): implement refresh token rotation

feat(users): add user profile endpoint

fix(auth): resolve invalid refresh token issue

refactor(users): simplify repository queries

docs(prd): update reporting requirements

test(auth): add login service tests

chore(docker): update compose configuration
```

---

# 18. Code Review Checklist

Before marking work as complete, verify:

* Code compiles successfully.
* Lint passes.
* Formatting is correct.
* DTO validation is implemented.
* Business logic resides in services.
* Database access is limited to repositories.
* Swagger documentation is updated.
* Error handling is complete.
* No secrets are committed.

---

# 19. Testing Standards

Testing will be introduced in later sprints.

The testing strategy will include:

* Unit Tests
* Integration Tests
* End-to-End Tests

Critical business logic should always be covered by automated tests.

---

# 20. Documentation Standards

Engineering documentation should be updated whenever:

* New modules are introduced.
* Architecture changes.
* APIs change significantly.
* New engineering standards are adopted.

Documentation is considered part of the project deliverable.

---

# 21. Definition of Done

A task is considered complete only when:

* Implementation is finished.
* Code is reviewed.
* Validation is implemented.
* Error handling is complete.
* Swagger documentation is updated.
* Database migrations are created (if applicable).
* Tests are added when required.
* Documentation is updated.
* Jira issue is moved to **Done**.

---

# 22. Continuous Improvement

Engineering standards are living guidelines.

As the project evolves, these standards should be reviewed, refined, and expanded through team discussion and documented decisions.