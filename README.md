# 🏗️ Khama Monorepo - خامة
**The First Specialized Marketplace for Fabrics, Leather, and Textile Machinery in Algeria.**
**المنصة الأولى المتخصصة في تجارة الأقمشة، الجلود، وآلات النسيج في الجزائر.**

---

## 🚀 Technical Overview (نظرة عامة تقنية)
Khama is a high-performance Monorepo architecture designed to bridge the gap between B2B (Factories/Importers) and B2C (Consumers/Tailors). Optimized for **Render Full-Stack Deployment** with a premium cinematic user experience.

### 🛠️ Tech Stack (التقنيات المستخدمة)
- **Framework**: [Next.js 14](https://nextjs.org/) (App Router, Server Actions, ISR).
- **3D Rendering**: [Three.js](https://threejs.org/) & [React Three Fiber](https://r3f.docs.pmnd.rs/) for fabric visualization.
- **Backend**: Node.js & Express (High performance, Scalable).
- **Monorepo Tooling**: [Turborepo](https://turbo.build/).
- **Database**: PostgreSQL with [Prisma ORM](https://www.prisma.io/).
- **Real-time**: [Socket.io](https://socket.io/) for Live Chat.
- **State Management**: [Zustand](https://github.com/pmndrs/zustand).
- **Styling**: Vanilla CSS & Tailwind CSS with Khama Luxury Brand System.
- **Security**: JWT & Role-Based Access Control (RBAC).

---

## ✨ Recent Major Updates (آخر التحديثات الجوهرية)

### 💳 Finance Center & Khama Escrow (المركز المالي ونظام الضمان)
- **Local Payment Gateways**: Integrated support for **BaridiMob**, **CIB**, and **EDAHABIA** cards tailored for the Algerian market.
- **Secure Escrow System**: Funds are held securely and only released to suppliers after buyer confirmation of receipt.
- **Accounting Dashboards**: Real-time revenue tracking, invoice generation, and withdrawal management for both buyers and suppliers.

### 📦 Logistics & Intelligent Shipping (اللوجستيك والشحن الذكي)
- **Shipping Calculator**: Dynamic cost calculation based on weight (GSM/m), volume, and Algerian wilayas (58 regions).
- **Real-time Tracking**: Interactive visual timeline showing order status from "Preparation" to "Out for Delivery".
- **Carrier Integration**: Support for local carriers (Yalidine, EMS) with automated tracking number assignment.

### 👁️ Visual AI Search (البحث البصري بالذكاء الاصطناعي)
- **Image-to-Fabric Matching**: Users can upload or capture a photo of a fabric to find matches in the catalog.
- **AI Analysis**: Automatically detects weave type (Satin, Twill, etc.), color palette, and estimated weight from a single image.

### 🧵 3D Fabric Viewer & AR (معاينة الأقمشة ثلاثية الأبعاد)
- **Draped Simulation**: Interactive 3D visualization of fabric drapes with PBR (Physically Based Rendering).
- **Real-time Customization**: Switch colors and weave patterns in a live 3D environment.
- **Augmented Reality (AR)**: "View in Space" feature for mobile users to visualize fabrics in their real-world environment.

### 🎓 Khama Academy (أكاديمية خامة التعليمية)
- **Professional Courses**: Specialized textile education platform covering QC, International Trade, and Sustainability.
- **Textile Blog**: Industry news, market trends, and expert interviews integrated directly into the knowledge hub.
- **Certification System**: Automated certificate generation for course completion.

---

## 📂 Project Structure (هيكلية المشروع)
```text
khama/
├── apps/
│   ├── api/          # Express Backend (Prisma, Socket.io)
│   ├── web/          # Next.js 14 (Marketplace, Dashboards, 3D, AI Search)
│   └── mobile/       # Expo/React Native App (In Development)
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
# Install with legacy peer deps due to React 18/19 conflicts in 3D libraries
npm install --legacy-peer-deps
npx prisma generate --schema=apps/api/prisma/schema.prisma
npm run dev
```

---

## 🗺️ Roadmap (خارطة الطريق)
- [x] **Finance & Escrow System**: Fully implemented with local payment support.
- [x] **Shipping & Logistics**: Integrated with tracking and cost calculation.
- [x] **Visual AI Search**: Image-based fabric discovery.
- [x] **3D & AR Preview**: High-fidelity fabric visualization.
- [x] **Educational Academy**: Specialized textile training hub.
- [ ] **Advanced Analytics**: AI-powered price trend forecasting for suppliers.
- [ ] **Mobile App Launch**: Native Android/iOS experience for field sourcing.

---

## 📄 License
Privately owned by **Khama Team**. All rights reserved.
جميع الحقوق محفوظة لفريق **خامة**.
