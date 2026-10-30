# Portfolify — Spring Boot Backend

The backend engine for Portfolify, developed with **Java 21**, **Spring Boot 3.3.4**, **Spring Security 6**, **Spring Data JPA**, and **MySQL**.

## Features

- **JWT Authentication & Security**: Stateless JWT token authentication with BCrypt hashing and custom UserDetailsService.
- **Strict Authorization & Ownership**: Server-side checks ensure users can only modify their own data.
- **RESTful Endpoints**: Full CRUD operations for Profiles, Experiences, Skills, Projects, Certifications, and Resumes.
- **Dynamic Template & Theme Persistence**: Stores chosen `templateId`, `themeColor`, and `fontFamily` in the profile.
- **Work Experience Support**: Full CRUD for company history, roles, dates, and descriptions.
- **PDF File Storage**: Secure validation and local filesystem storage for resumes (max 5MB, PDF MIME verification).
- **Public Portfolio Generation**: Generates public portfolios at `/api/public/p/{username}` and `/api/public/{username}` with publishing controls.
- **Centralized Exception Handling**: Structured error responses with timestamps, HTTP status codes, and field validation messages.

## Prerequisites

- Java 21 LTS (`java -version`)
- Maven 3.8+ (`mvn -v`)
- MySQL 8.0+ running locally on port 3306

## Environment Configuration

Configure `application.properties` or set environment variables:

| Variable | Default Value | Description |
|---|---|---|
| `SERVER_PORT` | `8080` | Spring Boot server port |
| `DB_URL` | `jdbc:mysql://localhost:3306/portfolio_db` | MySQL JDBC Connection URL |
| `DB_USERNAME` | `root` | Database username |
| `DB_PASSWORD` | `Deva@#2006` | Database password |
| `JWT_SECRET` | `(secure 256-bit secret)` | JWT signing key |
| `JWT_EXPIRATION_MS` | `86400000` (24h) | Token lifespan |
| `UPLOAD_DIR` | `uploads/resumes` | Directory for PDF resumes |
| `CORS_ALLOWED_ORIGINS` | `http://localhost:5173,http://127.0.0.1:5173` | Allowed frontend origins |

## Database Setup

Log into MySQL and create the database:
```sql
CREATE DATABASE IF NOT EXISTS portfolio_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

Hibernate `ddl-auto` is set to `update`, which will automatically create and update tables:
- `users`
- `profiles` (with `template_id`, `theme_color`, `font_family`)
- `experiences` (with `company`, `role`, `start_date`, `end_date`, `is_current`, `location`, `description`)
- `skills`
- `projects`
- `certifications`
- `resumes`

## Building & Running

### Run Backend
```bash
mvn spring-boot:run
```

### Run Tests
```bash
mvn test
```

### Package JAR
```bash
mvn clean package -DskipTests
java -jar target/portfolio-backend-0.0.1-SNAPSHOT.jar
```
