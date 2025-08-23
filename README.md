# LinkLens 🔗

A modern URL shortener with analytics built as a monorepo using Next.js and NestJS.

## 🏗️ Project Structure

```
LinkLens/
├── apps/
│   ├── api/          # NestJS backend API
│   └── web/          # Next.js frontend
├── packages/
│   └── shared/       # Shared types and utilities
├── package.json      # Root package.json with workspace config
└── README.md
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm 9+
- PostgreSQL database

### 1. Clone & Install

```bash
git clone <your-repo-url>
cd LinkLens
npm install
```

### 2. Environment Setup

```bash
# Copy environment template
cp .env.example .env

# Edit .env with your database credentials and JWT secret
```

### 3. Database Setup

```bash
# Generate Prisma client and run migrations
npm run db:generate
npm run db:migrate
```

### 4. Development

```bash
# Start all services
npm run dev:all

# Or start individually
npm run dev:api    # API on http://localhost:3001
npm run dev:web    # Web on http://localhost:3000
```

## 📦 Available Scripts

### Root Level Commands

- `npm run dev` - Start all apps in development mode
- `npm run dev:all` - Start API and Web concurrently
- `npm run build` - Build all apps
- `npm run test` - Run tests in all workspaces
- `npm run lint` - Lint all workspaces
- `npm run clean` - Clean all build outputs

### API Commands

- `npm run dev:api` - Start API in development mode
- `npm run build:api` - Build API for production
- `npm run start:api` - Start API in production mode
- `npm run db:generate` - Generate Prisma client
- `npm run db:migrate` - Run database migrations
- `npm run db:seed` - Seed database with sample data

### Web Commands

- `npm run dev:web` - Start web app in development mode
- `npm run build:web` - Build web app for production
- `npm run start:web` - Start web app in production mode

## 🛠️ Tech Stack

### Backend (API)

- **Framework**: NestJS
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT with Passport
- **Validation**: Class Validator & Class Transformer
- **Documentation**: Swagger/OpenAPI
- **Analytics**: Custom tracking with geolocation

### Frontend (Web)

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS
- **State Management**: TanStack Query (React Query)
- **Forms**: React Hook Form with Zod validation
- **UI Components**: Custom components with Tailwind

### Shared

- **Language**: TypeScript
- **Validation**: Zod schemas
- **Linting**: ESLint + Prettier
- **Package Manager**: npm workspaces

Built with ❤️ using the power of monorepos!

- 📊 Charts: [Chart.js](https://www.chartjs.org/)

---

## 🚀 Features

- ✅ Shorten any URL
- 🔁 Custom aliases (`/my-brand-link`)
- 📆 Expiry date for links
- 📈 Track:
  - Click counts
  - Location by IP
  - Browser & OS info
- 📊 Admin dashboard with:
  - Realtime stats
  - Top-performing links
  - Daily click trends
- 👤 Authenticated user support (optional)

---

## 🧪 Tech Stack

| Layer       | Tech                  |
| ----------- | --------------------- |
| Frontend    | Next.js, Tailwind CSS |
| Backend     | NestJS                |
| Database    | MongoDB or PostgreSQL |
| Charts      | Chart.js              |
| Geolocation | IPinfo / GeoLite2     |
| Device Info | UA Parser             |

---

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+
- MongoDB or PostgreSQL
- Redis (optional for caching)
- IPInfo or MaxMind API key (optional)

### Installation

```bash
# Clone the repo
git clone https://github.com/AnantaPodder/linklens.git
cd linklens

# Install backend
cd server
npm install

# Install frontend
cd ../client
npm install
```
