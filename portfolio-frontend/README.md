# PortfolioHub — React Frontend

Modern, responsive frontend for PortfolioHub built with **React 18**, **Vite**, **Tailwind CSS**, and **React Router DOM**.

## Features

- **Modern Responsive Dashboard**: Collapsible sidebar, top navigation, quick statistics, and mobile drawer.
- **Authentication**: JWT login, registration with email and username validation, password visibility toggles, and protected routes.
- **Dynamic Profile Completion**: Real-time progress bar calculated dynamically from backend data.
- **CRUD Interfaces**: Modal dialogs, empty states, loading indicators, and delete confirmation dialogs for:
  - Technical Skills (categorized with proficiency badges)
  - Project Portfolio (with featured tags, GitHub & Demo links, screenshot previews)
  - Certifications (issuing body, date, credential verification)
  - PDF Resume (upload, replace, download, delete)
- **Public Portfolio Website**: Standalone portfolio page at `/u/:username` with publish/unpublish toggle.
- **Live Preview**: Instant in-app preview of the public portfolio.

## Technology Stack

- **React 18 & Vite**
- **Tailwind CSS 3**
- **React Router DOM 6**
- **Axios** (configured with request & response interceptors)
- **Lucide React** (icons)
- **Recharts** (data visualization)

## Setup & Running

### Install Dependencies
```bash
npm install
```

### Environment Configuration
Create a `.env` file in the `portfolio-frontend` directory:
```env
VITE_API_BASE_URL=http://localhost:8080
```

### Start Development Server
```bash
npm run dev
```
Open `http://localhost:5173` in your browser.

### Build for Production
```bash
npm run build
```
The production bundle will be output to `dist/`.
