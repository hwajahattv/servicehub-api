# ADR-003: Role-Based Access Control (RBAC)

**Status:** Accepted

**Date:** July 2026

**Decision Makers:** Engineering Team

**Category:** Security

---

# 1. Context

ServiceHub is an enterprise application that manages multiple business functions, including user management, complaint management, reporting, and system administration.

Different users require different levels of access based on their responsibilities.

For example:

* System Administrators should have unrestricted access.
* Department Managers should manage only their departments.
* Employees should access only resources assigned to them.
* Customers (future release) should access only their own data.

The application therefore requires a flexible and scalable authorization model.

---

# 2. Decision

ServiceHub will implement **Role-Based Access Control (RBAC)**.

Authorization will be based on:

* Roles
* Permissions
* Guards
* Custom decorators

A user may have one or more roles.

Each role may contain one or more permissions.

Application endpoints will declare required permissions, and authorization will be enforced using NestJS Guards.

---

# 3. Authorization Flow

```text
User Request
      │
      ▼
JWT Authentication
      │
      ▼
Current User
      │
      ▼
Roles
      │
      ▼
Permissions
      │
      ▼
Authorization Guard
      │
      ▼
Controller
```

Authentication must succeed before authorization is evaluated.

---

# 4. Core Concepts

## User

Represents an authenticated identity within the system.

A user may have multiple roles.

Examples:

* Alice
* John
* Sarah

---

## Role

A role groups permissions based on job responsibilities.

Examples:

* Super Administrator
* Administrator
* Department Manager
* Complaint Officer
* Employee
* Customer (Future)

---

## Permission

A permission represents a specific action that may be performed.

Examples:

* users.create
* users.update
* users.delete
* complaints.create
* complaints.assign
* complaints.close
* reports.view
* reports.export

Permissions follow the naming convention:

```text
resource.action
```

Examples:

```text
users.create
users.read
users.update
users.delete

roles.create
roles.update

complaints.assign

reports.export
```

---

# 5. Authorization Model

The relationships are:

```text
User
 │
 ├── Role A
 │       │
 │       ├── Permission 1
 │       ├── Permission 2
 │       └── Permission 3
 │
 └── Role B
         │
         ├── Permission 4
         └── Permission 5
```

Users receive permissions through assigned roles.

Permissions are never assigned directly to users in the initial implementation.

---

# 6. Database Design

The authorization model consists of the following entities:

```text
Users

Roles

Permissions

UserRoles

RolePermissions
```

Many-to-many relationships are implemented using explicit join tables.

This approach provides:

* Better auditability
* Additional metadata support
* Easier future extensions

---

# 7. Authorization Strategy

Each protected endpoint declares the permissions it requires.

Example:

```typescript
@RequirePermissions('users.create')
```

The authorization guard will:

1. Read the required permissions.
2. Read the authenticated user's permissions.
3. Verify access.
4. Allow or deny the request.

If authorization fails:

* HTTP Status: 403 Forbidden

---

# 8. Super Administrator

The Super Administrator role has unrestricted access.

Authorization guards should recognize this role and bypass individual permission checks.

This simplifies administration while maintaining security for all other roles.

---

# 9. Default Roles

The following roles will be seeded during application setup:

* Super Administrator
* Administrator
* Department Manager
* Complaint Officer
* Employee

Additional roles may be created through the application.

---

# 10. Permission Management

Permissions will be predefined within the application.

Administrators may assign permissions to roles but should not create arbitrary permission names.

This ensures:

* Consistency
* Predictable authorization
* Easier maintenance

---

# 11. Security Considerations

Authorization decisions must never rely on frontend validation.

All permission checks must occur on the backend.

JWT tokens should not contain complete permission lists.

Permissions should be resolved from the database or a secure cache.

Clients must never determine their own authorization level.

---

# 12. Alternatives Considered

## Option 1 — Role Checks Only

Example:

```text
Administrator

Manager

Employee
```

Advantages:

* Very simple implementation.

Disadvantages:

* Difficult to scale.
* Limited flexibility.
* Frequent code changes when requirements evolve.

**Decision:** Rejected.

---

## Option 2 — Direct User Permissions

Advantages:

* Highly flexible.

Disadvantages:

* Difficult to manage.
* Permission duplication.
* Administrative complexity.

**Decision:** Rejected.

---

## Option 3 — RBAC (Selected)

Advantages:

* Scalable.
* Easy to manage.
* Industry standard.
* Works well with enterprise applications.
* Easy to extend.

Disadvantages:

* Additional database relationships.
* More initial implementation effort.

**Decision:** Accepted.

---

# 13. Future Enhancements

Future releases may introduce:

* Attribute-Based Access Control (ABAC)
* Resource ownership rules
* Department-level permissions
* Temporary permissions
* Permission inheritance
* Dynamic policies
* Multi-tenant authorization
* Approval workflows

The selected RBAC architecture is compatible with these future enhancements.

---

# 14. Consequences

Implementing RBAC provides:

* Centralized authorization.
* Consistent security.
* Reduced code duplication.
* Easier administration.
* Better maintainability.
* Enterprise-level scalability.

The trade-off is increased implementation complexity and additional database relationships, which are acceptable given the long-term goals of the project.

---

# 15. Review

This decision should be reviewed if:

* The application adopts a policy-based authorization framework.
* Multi-tenant requirements significantly change authorization needs.
* Regulatory requirements introduce new access control models.

Until then, RBAC remains the standard authorization model for ServiceHub.

---

# 16. Status History

| Date      | Status   | Notes                                        |
| --------- | -------- | -------------------------------------------- |
| July 2026 | Accepted | Initial authorization architecture approved. |