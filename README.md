# 🏗️ Khama Monorepo - خامة
**The First Specialized Marketplace for Fabrics, Leather, and Textile Machinery in Algeria.**
**المنصة الأولى المتخصصة في تجارة الأقمشة، الجلود، وآلات النسيج في الجزائر.**

---

## 🚀 Technical Overview (نظرة عامة تقنية)
Khama is a high-performance Monorepo architecture designed to bridge the gap between B2B (Factories/Importers) and B2C (Consumers/Tailors). Optimized for **Render Free Tier** and high-scale local deployment.

### 🛠️ Tech Stack (التقنيات المستخدمة)
- **Framework**: [Next.js 14](https://nextjs.org/) (App Router, ISR, Server Components).
- **Backend**: Node.js & Express (High performance, Scalable).
- **Monorepo Tooling**: [Turborepo](https://turbo.build/).
- **Database**: PostgreSQL with [Prisma ORM](https://www.prisma.io/).
- **Real-time**: [Socket.io](https://socket.io/) for Live Chat.
- **State Management**: [Zustand](https://github.com/pmndrs/zustand).
- **Styling**: Tailwind CSS with custom Khama Brand Design System.
- **Cloud Media**: [Cloudinary](https://cloudinary.com/) (Auto-optimization, Blur placeholders).
- **Security**: JWT (Access + Refresh Tokens) & Password Hashing.

---

## 📂 Project Structure (هيكلية المشروع)
```text
khama/
├── apps/
│   ├── api/          # Express Backend (PostgreSQL, Prisma, Socket.io)
│   ├── web/          # Next.js 14 Frontend (Marketplace & Dashboard)
│   └── mobile/       # Expo/React Native App (Future Implementation)
├── packages/
│   ├── ui/           # Shared UI Component Library
│   └── shared/       # Shared Utilities & Types
└── docker-compose.yml # Local DB Environment (PostgreSQL)
```

---

## ✨ Features Implemented (الميزات المنفذة حالياً)

### 🔐 Authentication & Security
- **JWT System**: Secure login with 15m Access Tokens and 7d Refresh Tokens.
- **Budget OTP**: In-memory OTP system for cost-free identity verification.
- **RBAC**: Role-Based Access Control (CONSUMER, SELLER, FACTORY, IMPORTER, ADMIN).

### 📦 Product & Inventory
- **Advanced Listing**: Filters by Wilaya, Made in Algeria, Category, and Price.
- **Image Pipeline**: Auto-resize and compression via Cloudinary.
- **Smart Inventory**: Automatic stock decrement and low-stock alerts.

### 🤝 B2B & B2C Commerce
- **B2B RFQ System**: Request for Quotes for bulk orders with technical specs.
- **B2C Orders**: Multi-store checkout (orders are automatically split by seller).
- **Real-time Chat**: Live negotiation between buyers and suppliers using WebSockets.

### 🏆 Trust & Governance
- **Dynamic Badge Engine**: Automatic badges (Verified, On Time, Gold Customer).
- **Ratings & Reviews**: Verified purchase verification for trust building.
- **Admin Dashboard**: Verification center for stores and product moderation.

### 🎓 Khama Academy (New!)
- **Course Infrastructure**: Multi-chapter/lesson recorded and live courses.
- **Automated Certificates**: Digital, verifiable certificates issued upon 100% completion.
- **Monetization**: Split-revenue model between the platform and trainers.
- **Progress Tracking**: Real-time lesson tracking and curriculum management.

### 🤖 AI Concierge (The Brain)
- **Smart RFQ Analysis**: Automated price estimation and technical specification analysis.
- **Multi-Engine Support**: Integrated with OpenAI (GPT), Groq (Llama 3), and a deterministic fallback Rule-Engine.
- **Automated Clarifications**: AI-driven suggestions for buyers to improve their request quality.

---

## ⚙️ Setup & Installation (التثبيت والتشغيل)

### 1. Prerequisites
- Node.js 18+
- Docker (for PostgreSQL)

### 2. Environment Variables (.env)
Create an `.env` file in `apps/api/`:
```env
DATABASE_URL="postgresql://postgres:password123@localhost:5440/khama?schema=public"
JWT_SECRET="your_secret"
JWT_REFRESH_SECRET="your_refresh_secret"
CLOUDINARY_CLOUD_NAME="your_name"
CLOUDINARY_API_KEY="your_key"
CLOUDINARY_API_SECRET="your_secret"
```

### 3. Run Development
```bash
npm install
docker-compose up -d   # Start Database
npx turbo run dev      # Run API & Web simultaneously
```

---

## 🗺️ Roadmap (خارطة الطريق)
- [ ] Integration with Local Payment Gateways (BaridiMob/CIB).
- [ ] Shipping Logistics API (Yassir/Zimail integration).
- [ ] Mobile App launch on Play Store.
- [ ] AI-powered fabric pattern matching.

---

## 📄 License
Privately owned by **Khama Team**. All rights reserved.
جميع الحقوق محفوظة لفريق **خامة**.
