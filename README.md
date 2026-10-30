# Portfolify — AI-Ready Personal Portfolio Website Builder Platform

**Portfolify** is a complete, production-ready, full-stack Personal Portfolio Website Builder Platform built with **React.js, Tailwind CSS, Java 21 Spring Boot, and MySQL**. 

Unlike a static single-template profile editor, **Portfolify functions as a true no-code website builder**: anyone can register, choose from **6 genuinely distinct professional templates**, customize their design system (colors and typography), populate their projects, skills, work experience, certifications, and PDF resume, and publish a bespoke portfolio website with a unique public URL (e.g., `/p/:username`).

---

## 🌟 Key Features

1. **True No-Code Portfolio Builder**: Create and publish a professional personal website from scratch without writing a single line of code.
2. **10 Genuinely Distinct Portfolio Templates (Not just color swaps)**:
   - **Minimal Professional (`minimal-pro`)**: Clean white layout, serif/sans typography, high-contrast borders, focused case studies.
   - **Modern Developer (`modern-dev`)**: Terminal-inspired dark mode, neon badge accents, prominent GitHub links, interactive tabs, live stats.
   - **Creative Designer (`creative-designer`)**: Bold visual hero, immersive project showcase gallery, creative typography, vibrant accents.
   - **Student Portfolio (`student`)**: Academic achievements, GPA/coursework focus, internships, hackathons, and certifications.
   - **Professional Executive (`executive`)**: Formal two-column corporate layout, executive summary, leadership experience, core competencies.
   - **Tech Bento Grid (`bento-grid`)**: Cutting-edge asymmetrical grid cards, animated highlights, tech stack pills, and responsive bento blocks.
   - **Cyber Terminal Hacker (`terminal-hacker`)**: Interactive Linux bash CRT shell, command prompt headers, memory bars, and hacker telemetry.
   - **Neo-Brutalist Pop (`neo-brutalist`)**: Bold 4px ink borders, pop colors, tilted sticker tags, hard drop-shadows, and tactile click states.
   - **Editorial Magazine Dossier (`editorial-magazine`)**: New Yorker literary elegance with serif headlines, drop caps, monographs, and academic colophon.
   - **Startup Founder & SaaS Showcase (`startup-founder`)**: Silicon Valley SaaS product landing layout with traction metrics and hiring CTAs.
3. **Interactive Builder Studio (`/builder`)**:
   - Real-time preview with device viewport toggles (Desktop, Tablet, Mobile).
   - Theme Customizer: 7 designer palettes (Indigo, Emerald, Violet, Rose, Amber, Cyan, Slate) and 3 typography pairings (Modern Sans, Classic Editorial Serif, Bold Display).
   - Instant live updates as you edit profile details, add work experience, skills, or projects.
4. **Work Experience Management (`/api/experiences`)**:
   - Company, role, location, start date, end date, current role flag, and rich bullet descriptions.
5. **Full Technical Skills & Project Showcase**:
   - Categorized skills (Programming Languages, Frontend, Backend, Databases, Tools) with proficiency ratings.
   - Featured projects with tags, GitHub repository links, live demos, and cover images.
6. **PDF Resume Management**:
   - Validated PDF upload, file size formatting, and instant recruiter download links.
7. **One-Click Publishing & Custom Public URLs**:
   - Toggle public/private visibility at any time.
   - Public URLs available at `/p/:username` (also aliased at `/u/:username`).

---

## 🚀 Technology Stack

### Frontend
- **Framework**: React 18 with Vite
- **Styling**: Tailwind CSS 3
- **Routing**: React Router DOM 6
- **HTTP Client**: Axios with JWT Bearer Interceptors
- **Icons**: Lucide React + Custom SVG Icons
- **State Management**: React Context API (`AuthContext`)

### Backend
- **Language**: Java 21 (LTS)
- **Framework**: Spring Boot 3.3.4
- **Security**: Spring Security 6 & Stateless JWT Authentication (JJWT 0.12.5)
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
│   │   │   │   ├── config/          # Security, WebConfig, CORS
│   │   │   │   ├── controller/      # REST API Controllers (Auth, Profile, Experience, Skills, Projects, Certifications, Resume, Public)
│   │   │   │   ├── dto/             # Request & Response DTOs
│   │   │   │   ├── entity/          # JPA Entities (User, Profile, Experience, Skill, Project, Certification, Resume)
│   │   │   │   ├── exception/       # Global Exception Handler & Custom ResourceNotFound / Unauthorized Exceptions
│   │   │   │   ├── repository/      # Spring Data JPA Repositories
│   │   │   │   ├── security/        # JWT Filter, Token Provider, UserDetailsService
│   │   │   │   └── service/         # Business Logic Layer
│   │   │   └── resources/
│   │   │       └── application.properties
│   │   └── test/                    # Integration & Security Unit Tests (H2 DB)
│   ├── pom.xml
│   └── README.md
│
├── portfolio-frontend/              # React Vite Application
│   ├── src/
│   │   ├── api/                     # Axios instance & interceptors
│   │   ├── components/
│   │   │   ├── builder/             # TemplateSelector, ThemeCustomizer
│   │   │   ├── common/              # Navbar, Sidebar, Modal, ConfirmDialog, Badge, Icons
│   │   │   └── layout/              # DashboardLayout & PublicLayout
│   │   ├── context/                 # AuthContext (login, register, logout, session)
│   │   ├── pages/                   # Landing, Templates, Builder, Dashboard, Profile, Skills,
│   │   │                            # Projects, Certifications, Resume, Preview, PublicPortfolio
│   │   ├── templates/               # 6 Distinct Template implementations + TemplateRenderer
│   │   │   ├── MinimalProfessionalTemplate.jsx
│   │   │   ├── ModernDeveloperTemplate.jsx
│   │   │   ├── CreativeDesignerTemplate.jsx
│   │   │   ├── StudentPortfolioTemplate.jsx
│   │   │   ├── ProfessionalExecutiveTemplate.jsx
│   │   │   ├── TechBentoTemplate.jsx
│   │   │   ├── TemplateRenderer.jsx
│   │   │   └── templatesData.js
│   │   ├── App.jsx                  # React Router configuration
│   │   └── main.jsx
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
│
├── .gitignore
└── README.md
```

---

## 🗄️ Database Design

The system runs on MySQL with database `portfolio_db`.

### Entities & Relationships
1. **`User`**:
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
   - `template_id` (VARCHAR(50), e.g. `minimal-pro`, `modern-dev`, `creative-designer`, `student`, `executive`, `bento-grid`)
   - `theme_color` (VARCHAR(30), e.g. `indigo`, `emerald`, `violet`, `rose`, `amber`, `cyan`, `slate`)
   - `font_family` (VARCHAR(30), e.g. `sans`, `serif`, `display`)

3. **`Experience`** (`N:1` with `User`):
   - `company`, `role`, `start_date`, `end_date`, `is_current`, `location`, `description`

4. **`Skill`** (`N:1` with `User`):
   - `name`, `category` (`PROGRAMMING_LANGUAGES`, `FRONTEND`, `BACKEND`, `DATABASES`, `TOOLS`), `proficiency_level` (`Beginner`, `Intermediate`, `Advanced`, `Expert`)

5. **`Project`** (`N:1` with `User`):
   - `title`, `description`, `technologies`, `github_url`, `live_demo_url`, `image_url`, `is_featured`

6. **`Certification`** (`N:1` with `User`):
   - `name`, `issuing_organization`, `issue_date`, `credential_url`, `credential_id`

7. **`Resume`** (`1:1` with `User`):
   - `original_file_name`, `stored_file_name`, `file_type` (`application/pdf`), `file_size`, `upload_path`, `uploaded_at`

---

## 🔐 Security & Authorization

- **BCrypt Hashing**: Passwords stored strictly as BCrypt hashes.
- **Stateless JWT**: Standard Bearer token authentication via `JwtAuthenticationFilter`.
- **Resource Ownership Verification**: Every update and delete operation on skills, projects, experiences, certifications, profiles, and resumes checks the authenticated user ID against resource ownership. Attempting to tamper with another user's records triggers `403 Forbidden`.
- **File Upload Security**: Strict validation for resume uploads — only `.pdf` files up to 5MB are stored. Uploaded filenames use UUIDs to prevent directory traversal attacks.
- **Public Endpoint Isolation**: Public portfolios (`/api/public/{username}` and `/api/public/p/{username}`) only expose published accounts. Unpublished accounts return a `404 Not Found` and never leak credentials, file paths, or private data.

---

## 🛠️ Getting Started & Setup

### 1. Database Setup (MySQL)
Open your MySQL client:
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
1. **User Registration & Login**: Successful registration, JWT token generation, duplicate email rejection.
2. **Skills CRUD**: Creation, category assignment, updates, deletion.
3. **Projects Ownership & Authorization**: Proves that User B cannot modify or delete User A's project (`401/403 Forbidden`).
4. **Public Portfolio Access Control**: Private portfolios return 404; toggling publish enables public access; unpublishing makes it private again.
5. **Dashboard Statistics**: Dynamic calculation of total counts and completion score.

---

## 📡 REST API Reference

### Authentication
- `POST /api/auth/register` — Register a new account
- `POST /api/auth/login` — Login and receive JWT token
- `GET /api/auth/me` — Get current logged-in user details

### Profile & Template Customization
- `GET /api/profile` — Get user profile (including `templateId`, `themeColor`, `fontFamily`)
- `PUT /api/profile` — Update user profile and builder design settings

### Work Experience
- `GET /api/experiences` — Get all experiences for current user
- `POST /api/experiences` — Add new experience
- `PUT /api/experiences/{id}` — Update experience (ownership verified)
- `DELETE /api/experiences/{id}` — Delete experience (ownership verified)

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
- `GET /api/public/p/{username}` & `GET /api/public/{username}` — Get public portfolio (only if published)
- `GET /api/public/p/{username}/resume` & `GET /api/public/{username}/resume` — Download public resume (only if published)

---

## 📱 Pages & User Flow

1. **Landing Page (`/`)**: 
   - Headline: *"Build Your Professional Portfolio in Minutes"*
   - Hero section with primary CTA *"Create Your Portfolio"* and secondary CTA *"Explore Templates"*
   - Template showcase section with live preview modal
   - How It Works 4-step walkthrough
   - Feature grid, sample example portfolios, testimonials, and FAQ accordion
2. **Template Gallery (`/templates`)**:
   - Filter by category (*All, Developer, Designer, Student, Corporate, Modern*)
   - Detailed breakdown of each template's layout and best-fit use case
   - Interactive live demo preview modal for all 6 templates
   - Direct *"Use This Template"* CTA leading into the Builder
3. **Builder Studio (`/builder`)**:
   - Interactive workspace with real-time live preview
   - Viewport switcher (Desktop, Tablet, Mobile)
   - Template switcher tab (swap between all 6 designs with 1 click)
   - Style customizer tab (7 color palettes + 3 font pairings)
   - Profile, Experience, Skills, and Projects inline editors
   - Instant "Save Changes" and "Publish" action bar
4. **Registration Page (`/register`)**: Full name, custom username (for public URL), email, password, confirm password.
5. **Login Page (`/login`)**: Email/username and password login with error banner and redirect to dashboard.
6. **Dashboard (`/dashboard`)**: Profile completion gauge, quick stats, live public URL banner with copy button, recent projects, and quick actions.
7. **Profile Management (`/profile`)**: Update bio, headline, education, location, avatar URL, social links, template, and theme.
8. **Skills Management (`/skills`)**: Category filters, add/edit modal, proficiency rating, delete dialog.
9. **Projects Management (`/projects`)**: Card layout with tech badges, GitHub and demo links, featured project toggle.
10. **Resume Management (`/resume`)**: PDF file upload dropzone, replacement, download, and delete.
11. **Public Portfolio (`/p/:username`)**: High-performance, responsive public website rendered using the user's chosen template, custom colors, and typography.
