# PortfolioHub — Personal Portfolio Management System

**PortfolioHub** is a production-ready, responsive, full-stack Personal Portfolio Management System designed for software engineers and computer science students. It enables users to manage their professional profile, categorized technical skills, projects, certifications, and PDF resumes from a modern dashboard — and automatically generates a standalone public portfolio website at `/u/:username`.

---

## 🚀 Technology Stack

### Frontend
- **Framework**: React 18 with Vite
- **Styling**: Tailwind CSS 3
- **Routing**: React Router DOM 6
- **HTTP Client**: Axios with request & response interceptors
- **Icons**: Lucide React + Custom SVG Icons
- **State Management**: React Context API (`AuthContext`)

### Backend
- **Language**: Java 21 (LTS)
- **Framework**: Spring Boot 3.3.4
- **Security**: Spring Security & Stateless JWT Authentication (JJWT 0.12.5)
- **Data Persistence**: Spring Data JPA & Hibernate
- **Database**: MySQL 8.0 (`portfolio_db`)
- **Validation**: Jakarta Bean Validation (`spring-boot-starter-validation`)
- **Build Tool**: Apache Maven

---

## 📂 Project Architecture

```
Portfolio Management/
├── portfolio-backend/               # Spring Boot Application
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/portfoliohub/
│   │   │   │   ├── config/          # Configurations & CORS
│   │   │   │   ├── controller/      # REST API Controllers
│   │   │   │   ├── dto/             # Request & Response DTOs
│   │   │   │   ├── entity/          # JPA Entities (User, Profile, Skill, Project, Cert, Resume)
│   │   │   │   ├── exception/       # Global Exception Handler & Custom Exceptions
│   │   │   │   ├── repository/      # Spring Data JPA Repositories
│   │   │   │   ├── security/        # JWT Filter, Token Provider, UserDetailsService
│   │   │   │   └── service/         # Business Logic Layer
│   │   │   └── resources/
│   │   │       ├── application.properties
│   │   │       └── ...
│   │   └── test/                    # Integration & Security Unit Tests (H2 DB)
│   ├── pom.xml
│   └── README.md
│
├── portfolio-frontend/              # React Vite Application
│   ├── src/
│   │   ├── api/                     # Axios instance & interceptors
│   │   ├── components/
│   │   │   ├── common/              # Navbar, Sidebar, Modal, ConfirmDialog, Badge, etc.
│   │   │   └── layout/              # DashboardLayout & PublicLayout
│   │   ├── context/                 # AuthContext (login, register, logout, session)
│   │   ├── pages/                   # Landing, Login, Register, Dashboard, Profile, Skills,
│   │   │                            # Projects, Certifications, Resume, Preview, PublicPortfolio
│   │   ├── App.jsx                  # React Router configuration
│   │   └── main.jsx
│   ├── package.json
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── README.md
│
├── .gitignore
└── README.md
```

---

## 🗄️ Database Design

The system runs on MySQL with a database named `portfolio_db`.

### Entities & Relationships
1. **`User`**: Core user credentials and status
   - `id` (PK, Long, Auto-Increment)
   - `username` (VARCHAR(50), Unique, Not Null)
   - `email` (VARCHAR(100), Unique, Not Null)
   - `password` (VARCHAR(255), BCrypt hash)
   - `role` (VARCHAR(20), default `ROLE_USER`)
   - `is_published` (BOOLEAN, default `false`)
   - `created_at`, `updated_at` (LocalDateTime)

2. **`Profile`** (`1:1` with `User`):
   - `full_name`, `headline`, `bio`, `email`, `phone`, `location`, `education`
   - `github_url`, `linkedin_url`, `website_url`, `avatar_url`

3. **`Skill`** (`N:1` with `User`):
   - `name`, `category` (`PROGRAMMING_LANGUAGES`, `FRONTEND`, `BACKEND`, `DATABASES`, `TOOLS`), `proficiency_level` (`Beginner`, `Intermediate`, `Advanced`, `Expert`)

4. **`Project`** (`N:1` with `User`):
   - `title`, `description`, `technologies`, `github_url`, `live_demo_url`, `image_url`, `is_featured`

5. **`Certification`** (`N:1` with `User`):
   - `name`, `issuing_organization`, `issue_date`, `credential_url`, `credential_id`

6. **`Resume`** (`1:1` with `User`):
   - `original_file_name`, `stored_file_name`, `file_type` (`application/pdf`), `file_size`, `upload_path`, `uploaded_at`

---

## 🔐 Security & Authorization

- **BCrypt Hashing**: Passwords stored solely as BCrypt hashes.
- **Stateless JWT**: Standard Bearer token authentication via `JwtAuthenticationFilter`.
- **Resource Ownership Verification**: Every update and delete operation on skills, projects, certifications, profiles, and resumes verifies that the requesting authenticated user owns the resource. Attempting to modify another user's ID results in a `401 Unauthorized` or `403 Forbidden`.
- **File Upload Security**: Strict validation for resume uploads — only `.pdf` files up to 5MB are stored. Uploaded filenames use UUIDs to prevent directory traversal attacks.
- **Public Endpoint Isolation**: Public portfolios (`/api/public/{username}`) only expose published accounts. Unpublished accounts return a `404 Not Found` and never leak credentials, file paths, or private data.

---

## 🛠️ Getting Started & Setup

### 1. Database Setup (MySQL)
Open your MySQL terminal or MySQL Workbench:
```sql
CREATE DATABASE IF NOT EXISTS portfolio_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 2. Backend Setup
```bash
cd portfolio-backend
```
Ensure your MySQL credentials match `application.properties` (or set environment variables `DB_USERNAME` and `DB_PASSWORD`):
```bash
mvn spring-boot:run
```
The backend starts on `http://localhost:8080`.

### 3. Frontend Setup
In a new terminal:
```bash
cd portfolio-frontend
npm install
npm run dev
```
Open `http://localhost:5173` in your browser.

---

## 🧪 Running Automated Tests

Run the backend integration and security test suite:
```bash
cd portfolio-backend
mvn test
```

### Tested Scenarios:
1. **User Registration & Login**: Successful registration, token generation, duplicate email rejection.
2. **Skills CRUD**: Creation, category assignment, updates, deletion.
3. **Projects Ownership & Authorization**: Proves that User B cannot modify or delete User A's project (`401/403 Forbidden`).
4. **Public Portfolio Access Control**: Private portfolios return 404; toggling publish enables public access; unpublishing makes it private again.
5. **Dashboard Statistics**: Dynamic calculation of total counts and completion score.

---

## 📡 REST API Reference

### Authentication
- `POST /api/auth/register` — Register a new account
  ```json
  {
    "username": "johndoe",
    "email": "john@example.com",
    "password": "Password123!",
    "fullName": "John Doe"
  }
  ```
- `POST /api/auth/login` — Login and receive JWT token
- `GET /api/auth/me` — Get current logged-in user details

### Profile Management
- `GET /api/profile` — Get user profile
- `PUT /api/profile` — Update user profile

### Technical Skills
- `GET /api/skills` — Get all skills for current user
- `POST /api/skills` — Add new skill
- `PUT /api/skills/{id}` — Update existing skill (ownership verified)
- `DELETE /api/skills/{id}` — Delete skill (ownership verified)

### Projects
- `GET /api/projects` — Get all user projects
- `POST /api/projects` — Add new project
- `PUT /api/projects/{id}` — Update project (ownership verified)
- `DELETE /api/projects/{id}` — Delete project (ownership verified)

### Certifications
- `GET /api/certifications` — Get all certifications
- `POST /api/certifications` — Add certification
- `PUT /api/certifications/{id}` — Update certification (ownership verified)
- `DELETE /api/certifications/{id}` — Delete certification (ownership verified)

### Resume Management
- `GET /api/resume` — Get resume metadata
- `POST /api/resume/upload` — Upload/replace PDF resume (multipart form)
- `GET /api/resume/download` — Download authenticated user's resume
- `DELETE /api/resume` — Delete user's resume

### Dashboard & Publishing
- `GET /api/dashboard/stats` — Real-time metrics, profile completion %, recent projects
- `GET /api/portfolio/preview` — Authenticated full portfolio preview
- `PUT /api/portfolio/publish` — Toggle portfolio public/private status (`{ "published": true }`)

### Public Portfolio (Unauthenticated)
- `GET /api/public/{username}` — Get public portfolio (only if published)
- `GET /api/public/{username}/resume` — Download public resume (only if published)

---

## 📱 Pages & User Flow

1. **Landing Page (`/`)**: Hero section, tech highlights, feature cards, how-it-works, call-to-action buttons.
2. **Registration Page (`/register`)**: Full name, custom username (for URL), email, password, confirm password, password visibility toggle.
3. **Login Page (`/login`)**: Email/username and password login with error banner and redirect.
4. **Dashboard (`/dashboard`)**:
   - Welcome banner with profile completion score meter.
   - Live public portfolio link with copy button and publish toggle.
   - 4 quick stats cards (Projects, Skills, Certifications, Resume).
   - Skills distribution by category.
   - Recent projects list with quick links.
5. **Profile Settings (`/profile`)**: Update name, headline, bio, education, location, phone, avatar URL, and social profiles.
6. **Skills (`/skills`)**: Tabbed category filtering, Add/Edit skill modal with proficiency level, Delete dialog.
7. **Projects (`/projects`)**: Card layout with image previews, tech badges, live demo and github links, featured star toggle.
8. **Certifications (`/certifications`)**: Issuing organization, credential ID, verification links.
9. **Resume (`/resume`)**: PDF file upload dropzone, replacement, file size formatting, and download.
10. **Portfolio Preview (`/preview`)**: Real-time view of what visitors see, with sticky publish bar.
11. **Public Portfolio (`/u/:username`)**: Clean, responsive public website for recruiters and employers.

