# GitHub Copilot Instructions for LinkLens

This repository contains LinkLens, a URL shortener with analytics built using **NestJS**, **Next.js**, and **MongoDB/PostgreSQL**.

---

## 🧭 General Guidelines

- Always follow **clean code** practices (readable, modular, reusable).
- Use **TypeScript** consistently in both backend and frontend.
- Prefer **async/await** over promises.
- Use **ESLint** and **Prettier** conventions.
- Keep components and services small, focused, and testable.

---

## 📂 Project Structure

---

## 🧠 Backend (NestJS)

- Framework: **NestJS**
- Database: **MongoDB** (Mongoose) or **PostgreSQL** (TypeORM/Prisma)
- Features:
  - Generate short URLs
  - Handle custom aliases and expiry dates
  - Track analytics (clicks, IP, browser, OS)
- Services:
  - `UrlService` → handles CRUD for URLs
  - `AnalyticsService` → stores and fetches analytics
  - `AuthService` → JWT authentication for admin dashboard
- Controllers should:
  - Follow REST conventions (`/api/urls`, `/api/analytics`)
  - Return standardized response objects `{ success, data, message }`
- Middleware:
  - Collect client info (IP, User-Agent)
  - Log analytics

---

## 🌐 Frontend (Next.js)

- Framework: **Next.js 14+ with App Router**
- Styling: **Tailwind CSS**
- Charts: **Chart.js with react-chartjs-2**
- Pages:
  - `/` → Home page for shortening links
  - `/dashboard` → Admin dashboard
  - `/[alias]` → Redirect handler
- Components should:
  - Be functional React components
  - Use hooks (e.g., `useEffect`, `useState`, TanStack Query for fetching)
- Dashboard must include:
  - Click trends chart
  - Geo distribution
  - Top performing links

---

## 📊 Analytics

- Collect:
  - Timestamp
  - IP → resolved to geo info (via IPinfo / MaxMind)
  - User-Agent → parsed for OS & Browser
- Store analytics in a separate collection/table
- Expose analytics APIs for the frontend dashboard

---

## 🛡️ Security

- Use environment variables for secrets (`.env`)
- Sanitize inputs to prevent injection
- Rate-limit API to prevent abuse
- Support optional **password-protected links**

---

## ✅ Testing

- Use **Jest** for backend unit and integration tests
- Use **Playwright/React Testing Library** for frontend tests
- Write tests for:
  - URL generation
  - Redirect handling
  - Analytics logging

---

## 📦 Bonus Features for Copilot to Consider

- QR code generation for each short link
- Email reports for analytics
- Dark mode for the dashboard
- Redis caching for analytics queries

---

## 🧑‍💻 Contribution Guidelines

- Follow feature-branch workflow (`feature/xyz`)
- Write meaningful commit messages
- Update README when adding new features
