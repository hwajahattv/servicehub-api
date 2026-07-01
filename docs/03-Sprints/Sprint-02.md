# Sprint 02 – Authentication & Identity Management

**Sprint Number:** 02

**Sprint Name:** Authentication & Identity Management

**Duration:** Retrospective

**Status:** Completed

**Release:** v0.1.0 – Foundation

---

# 1. Sprint Goal

Implement a secure authentication system that enables users to register, log in, manage authenticated sessions, and securely access protected resources.

The authentication module serves as the foundation for authorization, user management, and all future business modules.

---

# 2. Objectives

* Implement user registration.
* Implement user login.
* Configure JWT authentication.
* Implement refresh token management.
* Implement logout functionality.
* Implement logout from all devices.
* Secure protected endpoints using JWT.
* Integrate authentication with PostgreSQL using Prisma.
* Validate API requests using DTOs.

---

# 3. Planned User Stories

| Story ID | Story                             | Status      |
| -------- | --------------------------------- | ----------- |
| SH-101   | User Registration                 | ✅ Completed |
| SH-102   | User Login                        | ✅ Completed |
| SH-103   | JWT Authentication                | ✅ Completed |
| SH-104   | Refresh Token Rotation            | ✅ Completed |
| SH-105   | Logout                            | ✅ Completed |
| SH-106   | Logout From All Devices           | ✅ Completed |
| SH-107   | Current User Profile (`/auth/me`) | ✅ Completed |
| SH-108   | Password Hashing                  | ✅ Completed |
| SH-109   | Request Validation                | ✅ Completed |
| SH-110   | Swagger Documentation             | ⏳ Planned   |

---

# 4. Work Completed

The following functionality was implemented during this sprint:

## Authentication Module

* Created the Authentication module.
* Implemented Authentication service.
* Implemented Authentication controller.
* Configured JWT module.
* Configured Passport authentication.
* Implemented JWT strategy.
* Protected authenticated endpoints using JWT guards.

## User Registration

* Created registration endpoint.
* Validated incoming registration requests.
* Prevented duplicate email registration.
* Hashed passwords using bcrypt.
* Stored new users in PostgreSQL using Prisma.

## User Login

* Validated user credentials.
* Compared passwords using bcrypt.
* Generated JWT access tokens.
* Generated refresh tokens.
* Stored refresh tokens in the database.
* Returned authentication tokens to the client.

## Session Management

* Implemented refresh token endpoint.
* Implemented refresh token rotation.
* Invalidated previous refresh tokens after refresh.
* Supported multiple active user sessions.

## Logout

* Implemented logout endpoint.
* Revoked refresh token.
* Prevented reuse of revoked tokens.

## Logout From All Devices

* Removed all active refresh tokens belonging to the authenticated user.
* Forced re-authentication on all devices.

## Current User

* Implemented `/auth/me` endpoint.
* Returned authenticated user profile.
* Excluded sensitive fields from API responses.

---

# 5. Database Changes

The following database entities were introduced or updated:

* User
* RefreshToken

Relationships were established between users and refresh tokens to support secure session management.

Database migrations were created and applied successfully.

---

# 6. Security Improvements

The sprint introduced the following security features:

* Password hashing using bcrypt.
* JWT access tokens.
* Refresh token support.
* Refresh token rotation.
* Token revocation.
* Route protection using JWT guards.
* Secure password comparison.
* Input validation using DTOs.
* Environment-based configuration for authentication secrets.

---

# 7. API Endpoints

The following endpoints were implemented:

| Method | Endpoint           | Description                         |
| ------ | ------------------ | ----------------------------------- |
| POST   | `/auth/register`   | Register a new user                 |
| POST   | `/auth/login`      | Authenticate a user                 |
| POST   | `/auth/refresh`    | Refresh authentication tokens       |
| POST   | `/auth/logout`     | Logout current session              |
| POST   | `/auth/logout-all` | Logout from all active sessions     |
| GET    | `/auth/me`         | Retrieve authenticated user profile |

---

# 8. Deliverables

Sprint 02 produced the following deliverables:

* Authentication module.
* JWT authentication.
* Refresh token management.
* Secure password hashing.
* User registration.
* User login.
* Session management.
* Protected API endpoints.
* Authentication database schema.

---

# 9. Acceptance Criteria

The sprint was considered complete when:

* Users could successfully register.
* Users could successfully log in.
* JWT access tokens were generated.
* Refresh tokens were stored in PostgreSQL.
* Refresh tokens could generate new access tokens.
* Previous refresh tokens were invalidated during rotation.
* Users could log out successfully.
* Users could log out from all active sessions.
* Protected endpoints required valid authentication.
* The authenticated user profile endpoint returned the expected data.

---

# 10. Risks Encountered

The following challenges were identified during implementation:

* Designing a secure refresh token strategy.
* Managing token lifecycle and rotation.
* Ensuring proper password hashing.
* Handling authentication exceptions consistently.
* Designing database relationships for session management.

These challenges were resolved during implementation and documented in the project's Architecture Decision Records (ADRs).

---

# 11. Lessons Learned

Key lessons from this sprint include:

* JWT authentication is simple to scale but requires careful refresh token management.
* Separating access tokens from refresh tokens improves both security and user experience.
* DTO validation significantly reduces invalid requests reaching business logic.
* Prisma simplifies database interaction while maintaining strong type safety.
* Authentication should remain independent from authorization to keep responsibilities clear.

---

# 12. Definition of Done

The sprint met the project's Definition of Done:

* Authentication functionality implemented.
* Database schema updated.
* Migrations applied successfully.
* API endpoints verified.
* Protected routes functioning correctly.
* Source code committed.
* Documentation updated.

---

# 13. Sprint Retrospective

## What Went Well

* Authentication architecture was implemented successfully.
* Prisma integration worked reliably.
* JWT and Passport integrated cleanly with NestJS.
* Refresh token storage and rotation behaved as expected.
* Protected endpoints were verified successfully.

## Challenges

* Designing refresh token lifecycle management.
* Balancing security with usability.
* Understanding Passport and JWT integration.
* Managing authentication-related exceptions.

## Improvements for Future Sprints

* Add Swagger documentation for all authentication endpoints.
* Introduce automated unit and integration tests.
* Implement email verification.
* Add password reset functionality.
* Consider hashing refresh tokens before storing them in the database.

---

# 14. Sprint Outcome

Sprint 02 successfully established the authentication and identity management foundation for ServiceHub.

With secure user authentication and session management in place, the application is now prepared for Sprint 03, where Role-Based Access Control (RBAC), Roles, Permissions, and User Authorization will be implemented.
