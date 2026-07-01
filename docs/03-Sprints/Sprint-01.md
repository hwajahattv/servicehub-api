# Sprint 01 – Project Foundation

**Sprint Number:** 01

**Sprint Name:** Project Foundation

**Duration:** Retrospective

**Status:** Completed

**Release:** v0.1.0 – Foundation

---

# 1. Sprint Goal

Establish the foundational development environment for ServiceHub and prepare the project for feature development.

This sprint focuses on creating a stable, reproducible, and scalable development environment that all future work will build upon.

---

# 2. Objectives

* Initialize the NestJS backend project.
* Configure the development environment.
* Set up PostgreSQL.
* Configure Prisma ORM.
* Integrate Docker and Docker Compose.
* Establish project structure.
* Configure environment variables.
* Prepare the application for modular development.

---

# 3. Planned User Stories

| Story ID | Story                           | Status      |
| -------- | ------------------------------- | ----------- |
| SH-001   | Initialize NestJS project       | ✅ Completed |
| SH-002   | Configure Docker environment    | ✅ Completed |
| SH-003   | Configure PostgreSQL            | ✅ Completed |
| SH-004   | Integrate Prisma ORM            | ✅ Completed |
| SH-005   | Configure environment variables | ✅ Completed |
| SH-006   | Verify local development setup  | ✅ Completed |

---

# 4. Work Completed

The following tasks were completed during this sprint:

* Created the NestJS backend application.
* Configured Docker Compose for local development.
* Added PostgreSQL as the primary database.
* Integrated Prisma ORM.
* Generated the initial Prisma schema.
* Successfully connected the application to PostgreSQL.
* Verified database connectivity.
* Configured application environment variables.
* Established the initial project directory structure.
* Verified successful application startup.

---

# 5. Deliverables

The sprint produced the following deliverables:

* Functional NestJS application.
* Docker-based development environment.
* PostgreSQL database container.
* Prisma configuration.
* Initial project structure.
* Environment configuration.

---

# 6. Acceptance Criteria

The sprint was considered complete because:

* The backend application started successfully.
* Docker containers launched correctly.
* PostgreSQL accepted connections.
* Prisma connected successfully.
* Database migrations executed successfully.
* The project could be cloned and started by another developer using the documented setup process.

---

# 7. Risks Encountered

The following challenges were identified:

* Initial Docker configuration complexity.
* Learning curve for Prisma ORM.
* Environment variable management.
* Container networking and service communication.

These risks were resolved during setup and documented for future reference.

---

# 8. Lessons Learned

Key lessons from this sprint include:

* Docker simplifies environment consistency across machines.
* Prisma significantly improves database development through type-safe queries and migrations.
* Investing time in project structure early reduces future refactoring.
* A reproducible development environment is essential for team collaboration.

---

# 9. Definition of Done

The sprint met the project's Definition of Done:

* Development environment operational.
* Database integrated.
* Prisma configured.
* Source code committed.
* Documentation updated.

---

# 10. Sprint Retrospective

## What Went Well

* Smooth project initialization.
* Successful Docker integration.
* Stable database connectivity.
* Clean project organization.

## Challenges

* Understanding Docker networking.
* Configuring Prisma migrations.
* Managing environment variables correctly.

## Improvements for Future Sprints

* Introduce automated linting and formatting.
* Expand project documentation alongside implementation.
* Continue following modular architecture from the beginning.

---

# 11. Sprint Outcome

Sprint 01 successfully established the technical foundation required for all future development.

The project is now ready to implement core business functionality, beginning with Authentication and Identity Management in Sprint 02.
