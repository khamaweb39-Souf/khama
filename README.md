# 🏗️ Khama Monorepo - خامة
**The First Specialized Marketplace for Fabrics, Leather, and Textile Machinery in Algeria.**
**المنصة الأولى المتخصصة في تجارة الأقمشة، الجلود، وآلات النسيج في الجزائر.**

---

## 🚀 Technical Overview (نظرة عامة تقنية)
Khama is a high-performance Monorepo architecture designed to bridge the gap between B2B (Factories/Importers) and B2C (Consumers/Tailors). Optimized for **Render Full-Stack Deployment** with a premium cinematic user experience.

### 🛠️ Tech Stack (التقنيات المستخدمة)
- **Framework**: [Next.js 14](https://nextjs.org/) (App Router, Server Actions, ISR).
- **Backend**: Node.js & Express (High performance, Scalable).
- **Monorepo Tooling**: [Turborepo](https://turbo.build/).
- **Database**: PostgreSQL with [Prisma ORM](https://www.prisma.io/).
- **Real-time**: [Socket.io](https://socket.io/) for Live Chat.
- **State Management**: [Zustand](https://github.com/pmndrs/zustand).
- **Styling**: Vanilla CSS & Tailwind CSS with Khama Luxury Brand System.
- **Security**: JWT & Role-Based Access Control (RBAC).

---

## ✨ Recent Major Updates (آخر التحديثات الجوهرية)

### 🎬 Cinematic UI & Global Localization
- **Arabic First Approach**: Full localization of the homepage, hero sections, and dashboards with high-end Arabic typography.
- **Word-Level Animations**: Optimized text reveal animations to ensure perfect Arabic script connectivity (no broken ligatures).
- **Build Stability**: Resolved critical PostCSS encoding issues (UTF-8) and React Error #130 by implementing stable local SVG icons.

### 📦 Supplier Add-Product Wizard (معالج إضافة المنتجات)
- **4-Step Professional Flow**: A high-end onboarding system for suppliers to list technical fabrics.
- **Technical Precision**: Capture granular data: Composition (%), Weight (GSM), Width (Laize), and Weave types.
- **Commercial Terms**: Integrated MOQ, Lead Time, and Certification management (GOTS, ISO, OEKO-TEX).

### 🤝 B2B RFQ Procurement Engine (نظام طلبات العروض)
- **Buyer-Side Wizard**: Multi-step flow for buyers to launch international tenders.
- **Smart Targeting**: Ability to target verified suppliers by geographic region or certification status.
- **Real-time Marketplace**: Public RFQ directory with live stats, countdown timers, and urgency indicators.

### 🔗 Full-Stack Database Integration
- **Server Actions Architecture**: All wizards (Product & RFQ) are now connected to the **PostgreSQL** database via **Prisma**.
- **Data Persistence**: Real-world data submission with automatic cache revalidation for a seamless UX.

---

## 📂 Project Structure (هيكلية المشروع)
```text
khama/
├── apps/
│   ├── api/          # Express Backend (Prisma, Socket.io)
│   ├── web/          # Next.js 14 (Marketplace, Dashboards, Server Actions)
│   └── mobile/       # Expo/React Native App (Coming Soon)
├── packages/
│   ├── ui/           # Shared Component Library
│   └── shared/       # Shared Utilities & Types
```

---

## ⚙️ Setup & Installation (التثبيت والتشغيل)

### 1. Prerequisites
- Node.js 18+
- PostgreSQL Instance

### 2. Run Development
```bash
npm install
npx prisma generate --schema=apps/api/prisma/schema.prisma
npm run dev
```

---

## 🗺️ Roadmap (خارطة الطريق)
- [ ] **Chat System Integration**: Linking the RFQ engine with a real-time negotiation chat.
- [ ] **Payment Gateway**: BaridiMob & CIB integration for Algerian market.
- [ ] **Shipping Logistics**: Automated weight calculation and carrier assignment.
- [ ] **AI Search**: Image-to-Fabric visual matching system.

---

## 📄 License
Privately owned by **Khama Team**. All rights reserved.
جميع الحقوق محفوظة لفريق **خامة**.
