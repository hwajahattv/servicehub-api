# Sprint 03 – Role-Based Access Control (RBAC)

**Sprint Number:** 03

**Sprint Name:** Role-Based Access Control (RBAC)

**Duration:** Planned

**Status:** In Progress

**Release:** v0.2.0 – User & Access Management

---

# 1. Sprint Goal

Implement a robust Role-Based Access Control (RBAC) system that enables fine-grained authorization throughout the application.

This sprint establishes the authorization layer that determines what authenticated users are allowed to do based on their assigned roles and permissions.

---

# 2. Sprint Objectives

* Implement Role Management.
* Implement Permission Management.
* Establish role-permission relationships.
* Establish user-role relationships.
* Create authorization decorators.
* Create authorization guards.
* Seed default roles and permissions.
* Protect application endpoints using permissions.
* Build CRUD APIs for Roles and Permissions.
* Prepare the foundation for User Management.

---

# 3. Planned User Stories

| Story ID | Story                                     | Priority | Status  |
| -------- | ----------------------------------------- | -------- | ------- |
| SH-201   | Design RBAC database schema               | High     | Planned |
| SH-202   | Implement Role entity and CRUD APIs       | High     | Planned |
| SH-203   | Implement Permission entity and CRUD APIs | High     | Planned |
| SH-204   | Implement User-Role assignment            | High     | Planned |
| SH-205   | Implement Role-Permission assignment      | High     | Planned |
| SH-206   | Create `@RequirePermissions()` decorator  | High     | Planned |
| SH-207   | Create Permissions Guard                  | High     | Planned |
| SH-208   | Seed default Roles                        | High     | Planned |
| SH-209   | Seed default Permissions                  | High     | Planned |
| SH-210   | Protect API endpoints using permissions   | High     | Planned |
| SH-211   | Swagger documentation for RBAC APIs       | Medium   | Planned |
| SH-212   | Unit tests for authorization layer        | Low      | Planned |

---

# 4. Scope

This sprint covers the complete authorization infrastructure.

Included:

* Roles
* Permissions
* Role assignment
* Permission assignment
* Authorization guards
* Authorization decorators
* Database schema
* API endpoints
* Seed data

Not Included:

* Department-based authorization
* Resource ownership rules
* Attribute-Based Access Control (ABAC)
* Multi-tenant authorization

These capabilities are reserved for future releases.

---

# 5. Planned Database Changes

The following entities will be created or updated:

* Role
* Permission
* UserRole
* RolePermission

Relationships:

* User ↔ Role (Many-to-Many)
* Role ↔ Permission (Many-to-Many)

All schema changes will be implemented using Prisma migrations.

---

# 6. Planned API Endpoints

## Roles

| Method | Endpoint     | Description              |
| ------ | ------------ | ------------------------ |
| GET    | `/roles`     | Retrieve all roles       |
| GET    | `/roles/:id` | Retrieve a specific role |
| POST   | `/roles`     | Create a role            |
| PATCH  | `/roles/:id` | Update a role            |
| DELETE | `/roles/:id` | Delete a role            |

---

## Permissions

| Method | Endpoint           | Description                    |
| ------ | ------------------ | ------------------------------ |
| GET    | `/permissions`     | Retrieve all permissions       |
| GET    | `/permissions/:id` | Retrieve a specific permission |
| POST   | `/permissions`     | Create a permission            |
| PATCH  | `/permissions/:id` | Update a permission            |
| DELETE | `/permissions/:id` | Delete a permission            |

---

## Assignments

| Method | Endpoint                               | Description                     |
| ------ | -------------------------------------- | ------------------------------- |
| POST   | `/roles/:id/permissions`               | Assign permissions to a role    |
| DELETE | `/roles/:id/permissions/:permissionId` | Remove a permission from a role |
| POST   | `/users/:id/roles`                     | Assign roles to a user          |
| DELETE | `/users/:id/roles/:roleId`             | Remove a role from a user       |

---

# 7. Technical Deliverables

By the end of this sprint, the following components should exist:

## Modules

* Roles Module
* Permissions Module

## Services

* RolesService
* PermissionsService

## Controllers

* RolesController
* PermissionsController

## Repositories

* RolesRepository
* PermissionsRepository

## Guards

* JwtAuthGuard (existing)
* PermissionsGuard

## Decorators

* `@CurrentUser()`
* `@RequirePermissions()`

## Seeders

* Default Roles Seeder
* Default Permissions Seeder

---

# 8. Security Considerations

The authorization layer must ensure:

* Only authenticated users can access protected endpoints.
* Authorization decisions are made on the backend.
* Permissions are verified before controller execution.
* Users cannot elevate their own privileges.
* Default administrative roles are created securely.

---

# 9. Acceptance Criteria

Sprint 03 will be considered complete when:

* Roles can be created, updated, retrieved, and deleted.
* Permissions can be managed through APIs.
* Users can be assigned one or more roles.
* Roles can contain one or more permissions.
* Authorization guards correctly enforce permissions.
* Protected endpoints return **403 Forbidden** when access is denied.
* Default roles and permissions are seeded successfully.
* Swagger documentation is updated.
* Prisma migrations execute successfully.

---

# 10. Risks

Potential risks include:

* Designing a flexible permission model.
* Maintaining clear separation between authentication and authorization.
* Managing many-to-many relationships efficiently.
* Avoiding duplicate role and permission assignments.
* Ensuring authorization logic remains performant as permissions grow.

---

# 11. Definition of Done

Sprint 03 is complete when:

* All planned user stories are completed.
* Code is reviewed.
* Prisma migrations are applied.
* Seeders execute successfully.
* Swagger documentation is updated.
* RBAC is verified through manual testing.
* Documentation is updated.
* Jira stories are moved to **Done**.

---

# 12. Sprint Progress

| Story                 | Status    |
| --------------------- | --------- |
| RBAC Database Schema  | ⏳ Planned |
| Roles Module          | ⏳ Planned |
| Permissions Module    | ⏳ Planned |
| Authorization Guard   | ⏳ Planned |
| Permission Decorator  | ⏳ Planned |
| Role Assignment       | ⏳ Planned |
| Permission Assignment | ⏳ Planned |
| Seeders               | ⏳ Planned |
| Protected APIs        | ⏳ Planned |
| Swagger Documentation | ⏳ Planned |

---

# 13. Expected Outcome

Upon completion of Sprint 03, ServiceHub will have a fully functional authorization system built on Role-Based Access Control (RBAC).

This will provide a secure and extensible foundation for all future business modules, including User Management, Department Management, Complaint Management, Reporting, and System Administration.

The application will then be ready to begin Sprint 04, which will focus on User Management and Organizational Structure.