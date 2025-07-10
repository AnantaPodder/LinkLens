# LinkLens - Shorten smart. Track better.
LinkLens is a powerful, full-stack URL shortener that not only lets users create custom and expiring short links, but also tracks detailed click analytics such as browser, OS, location, and more. Built with NestJS (backend), MongoDB/PostgreSQL (database), and Next.js (frontend), it features a sleek admin dashboard powered by Chart.js for real-time insights.




Built with:
- 🧠 Backend: [NestJS](https://nestjs.com/)
- 💾 Database: MongoDB or PostgreSQL
- 🌐 Frontend: [Next.js](https://nextjs.org/)
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

| Layer        | Tech                  |
|--------------|-----------------------|
| Frontend     | Next.js, Tailwind CSS |
| Backend      | NestJS                |
| Database     | MongoDB or PostgreSQL |
| Charts       | Chart.js              |
| Geolocation  | IPinfo / GeoLite2     |
| Device Info  | UA Parser             |

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
