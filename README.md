# 🚀 Sunday Board Pro - Enterprise Project Management System

> نظام إدارة مشاريع احترافي Enterprise-grade مستوحى من Monday.com، جاهز للاستخدام في شركتك والبيع كـ SaaS

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18.2-blue.svg)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6+-green.svg)](https://www.mongodb.com/)

---

## 📖 نظرة عامة

**Sunday Board Pro** هو نظام شامل لإدارة المشاريع والمهام يجمع بين قوة React في الواجهة الأمامية وأمان Node.js + MongoDB في الخلفية.

### ✨ مميزات رئيسية

#### Frontend (React + Vite)
- ⚛️ **React 18** مع أحدث المميزات
- ⚡ **Vite 5** - بناء أسرع 10-100x من Webpack
- 🎨 **14 نوع عمود** قابل للتخصيص الكامل
- 🎯 **59 مكوّن احترافي** جاهز للاستخدام
- 🌐 **دعم RTL كامل** للعربية والإنجليزية
- 🎭 **Drag & Drop** لترتيب المهام
- 📊 **Recharts** للرسوم البيانية
- 🔥 **Real-time updates** جاهز

#### Backend (Node.js + Express + MongoDB)
- 🔐 **JWT Authentication** مع Refresh Tokens
- 🏢 **Multi-tenancy** - دعم عدة شركات بعزل بيانات كامل
- 👥 **RBAC** - نظام صلاحيات متقدم (4 أدوار)
- 💳 **نظام اشتراكات** جاهز (4 خطط: Free, Basic, Pro, Enterprise)
- 🛡️ **أمان Enterprise-grade** (Helmet, Rate Limiting, CORS, Sanitization)
- 📊 **MongoDB Models** كاملة للمستخدمين، الشركات، المشاريع، المهام
- ⚡ **Express.js** مع middleware احترافي
- 🔄 **RESTful API** كامل

---

## 🎯 لماذا Sunday Board Pro؟

### للاستخدام الداخلي في شركتك:
✅ جاهز للإنتاج مباشرة
✅ قابل للتخصيص الكامل
✅ دعم فني من فريقك
✅ بدون تكاليف اشتراكات شهرية
✅ بياناتك محفوظة على سيرفراتك

### للبيع كـ SaaS:
✅ بنية Multi-tenant جاهزة
✅ نظام اشتراكات مدمج
✅ Usage limits لكل خطة
✅ Feature flags مرنة
✅ Trial period (14 يوم)
✅ قابل للتوسع Scalable
✅ API جاهز للتطبيقات الخارجية

---

## 🛠 التقنيات المستخدمة

### Frontend Stack
```
React 18.2              - UI Framework
Vite 5.0                - Build Tool (10-100x faster!)
React Router 6          - Routing
Zustand                 - State Management
React Query             - Data Fetching & Caching
React Hook Form + Zod   - Forms & Validation
Lucide React            - Icons
Recharts                - Charts & Analytics
Framer Motion           - Animations
Date-fns                - Date Handling
DND Kit                 - Drag & Drop
React Hot Toast         - Notifications
Axios                   - HTTP Client
```

### Backend Stack
```
Node.js 18+             - Runtime
Express.js              - Web Framework
MongoDB 6+              - Database
Mongoose                - ODM
JWT                     - Authentication
bcryptjs                - Password Hashing
Helmet                  - Security Headers
CORS                    - Cross-Origin
Rate Limiting           - DDoS Protection
Express Validator       - Input Validation
Mongo Sanitize          - NoSQL Injection Prevention
HPP                     - Parameter Pollution Prevention
Morgan                  - HTTP Logging
Compression             - Response Compression
```

---

## 📁 البنية الهيكلية

```
sunday-work/
├── 📂 src/                          Frontend (React + Vite)
│   ├── components/                  59 React Components
│   ├── pages/                       Application Pages
│   ├── contexts/                    React Contexts (Auth, Workspace)
│   ├── hooks/                       Custom Hooks
│   ├── layouts/                     Page Layouts
│   ├── styles/                      Global Styles
│   ├── data/                        Mock Data
│   └── firebase/                    Firebase Config (optional)
│
├── 📂 server/                       Backend API
│   ├── src/
│   │   ├── config/                  Configuration
│   │   ├── models/                  MongoDB Models
│   │   │   ├── User.model.js        👤 User Management
│   │   │   ├── Organization.model.js 🏢 Multi-tenancy
│   │   │   ├── Workspace.model.js   📁 Workspaces
│   │   │   ├── Board.model.js       📋 Boards & Columns
│   │   │   └── Task.model.js        ✅ Tasks & Subtasks
│   │   ├── controllers/             Request Handlers
│   │   │   └── auth.controller.js   Authentication Logic
│   │   ├── routes/                  API Routes
│   │   │   ├── auth.routes.js       🔐 Auth Endpoints
│   │   │   ├── organization.routes.js
│   │   │   ├── workspace.routes.js
│   │   │   ├── board.routes.js
│   │   │   ├── task.routes.js
│   │   │   ├── user.routes.js
│   │   │   └── subscription.routes.js 💳 Subscriptions
│   │   ├── middleware/              Middleware
│   │   │   ├── auth.middleware.js   JWT Auth & RBAC
│   │   │   ├── error.middleware.js  Error Handling
│   │   │   └── validation.middleware.js
│   │   ├── services/                Business Logic
│   │   └── utils/                   Helper Functions
│   ├── .env                         Environment Variables
│   ├── .env.example                 Example Configuration
│   ├── server.js                    Entry Point
│   ├── package.json
│   └── README.md
│
├── 📄 index.html                    Vite Entry Point
├── 📄 vite.config.js                Vite Configuration
├── 📄 package.json                  Frontend Dependencies
├── 📄 SETUP_GUIDE.md                🚀 دليل الإعداد الشامل
├── 📄 FEATURES.md                   📚 دليل الميزات
├── 📄 COMPARISON.md                 🔄 مقارنة النسخ
└── 📄 README.md                     هذا الملف
```

---

## 🚀 البدء السريع

### المتطلبات
- Node.js 18+
- MongoDB 6+ (أو MongoDB Atlas مجاناً)
- Git

### 1️⃣ الاستنساخ والتثبيت

```bash
# استنساخ المشروع
git clone https://github.com/Meshal1212222/sunday-work.git
cd sunday-work

# تثبيت Frontend dependencies
npm install

# تثبيت Backend dependencies
cd server
npm install
cd ..
```

### 2️⃣ إعداد MongoDB

**خيار A: MongoDB محلي**
```bash
# تثبيت MongoDB (Windows/Mac/Linux)
# راجع: https://docs.mongodb.com/manual/installation/

# أو استخدم Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

**خيار B: MongoDB Atlas (مجاني)** ⭐ Recommended
1. سجّل في https://www.mongodb.com/cloud/atlas
2. أنشئ Cluster مجاني (M0)
3. احصل على Connection String
4. استخدمه في `.env`

### 3️⃣ إعداد Environment Variables

```bash
cd server
cp .env.example .env
# حرّر .env وحدّث MONGODB_URI و JWT secrets
```

**مثال `.env`:**
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/sunday-board-pro
JWT_SECRET=your-super-secret-change-this
JWT_REFRESH_SECRET=your-refresh-secret-change-this
CORS_ORIGIN=http://localhost:8080
```

### 4️⃣ التشغيل

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```
✅ Backend يعمل على: http://localhost:5000

**Terminal 2 - Frontend:**
```bash
# من المجلد الرئيسي
npm run dev
```
✅ Frontend يعمل على: http://localhost:8080/sunday-management/

---

## 📡 API Documentation

### Base URL
```
http://localhost:5000/api/v1
```

### Authentication Endpoints

#### Register
```http
POST /auth/register
Content-Type: application/json

{
  "name": "أحمد محمد",
  "email": "ahmed@example.com",
  "password": "password123",
  "organizationName": "شركة مثال",
  "industry": "technology",
  "size": "11-50"
}
```

#### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "ahmed@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": { ... },
    "tokens": {
      "accessToken": "eyJhbGciOiJIUzI1NiIs...",
      "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
    }
  }
}
```

#### Protected Endpoints
استخدم access token في Header:
```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
```

### للمزيد من التفاصيل
راجع `server/README.md` للـ API الكامل

---

## 💳 خطط الاشتراك

| الخطة | السعر/شهر | المستخدمين | Workspaces | Boards | Tasks | Storage | Custom Fields | Automations | API |
|------|----------|------------|-----------|--------|-------|---------|--------------|-------------|-----|
| **Free** | 0 ريال | 5 | 3 | 10 | 100 | 1 GB | ❌ | ❌ | ❌ |
| **Basic** | 99 ريال | 20 | 10 | 50 | 1K | 10 GB | ✅ | ❌ | ❌ |
| **Professional** | 299 ريال | 100 | ∞ | ∞ | ∞ | 100 GB | ✅ | ✅ | ❌ |
| **Enterprise** | 999 ريال | ∞ | ∞ | ∞ | ∞ | ∞ | ✅ | ✅ | ✅ |

---

## 🔒 الأمان

### Frontend Security
- ✅ React 18 مع أحدث patches
- ✅ Input sanitization
- ✅ XSS protection
- ✅ HTTPS في production

### Backend Security
- ✅ **JWT** مع Refresh Tokens
- ✅ **bcryptjs** (12 rounds) لـ passwords
- ✅ **Helmet** - Security headers
- ✅ **CORS** configuration
- ✅ **Rate Limiting** (100 req/15min)
- ✅ **Express Validator** للمدخلات
- ✅ **Mongo Sanitize** ضد injection
- ✅ **HPP** ضد parameter pollution

---

## 📚 الوثائق الكاملة

- 📖 **[SETUP_GUIDE.md](SETUP_GUIDE.md)** - دليل الإعداد الشامل خطوة بخطوة
- 📚 **[FEATURES.md](FEATURES.md)** - جميع الميزات بالتفصيل
- 🔄 **[COMPARISON.md](COMPARISON.md)** - مقارنة بين النسخ
- 🔧 **[server/README.md](server/README.md)** - توثيق Backend API

---

## 🚀 النشر (Deployment)

### Frontend - GitHub Pages
```bash
npm run build
npm run deploy
```

### Backend Options
1. **Heroku** (سهل للمبتدئين)
2. **DigitalOcean** (VPS قوي)
3. **AWS / Azure** (Enterprise)
4. **Railway / Render** (مجاني للبداية)

راجع `SETUP_GUIDE.md` للتفاصيل

---

## 🎯 الخطوات التالية

### للاستخدام الداخلي:
- [x] ✅ Frontend جاهز
- [x] ✅ Backend API جاهز
- [x] ✅ Authentication نظام
- [x] ✅ Multi-tenancy
- [x] ✅ Subscriptions
- [ ] 🔄 ربط Frontend مع Backend
- [ ] 📧 Email notifications
- [ ] 📁 File uploads
- [ ] 🔔 Real-time updates

### للبيع كـ SaaS:
- [ ] 💳 Stripe integration
- [ ] 📄 Terms & Privacy Policy
- [ ] 🎫 Support ticketing system
- [ ] 📊 Advanced analytics
- [ ] 🌐 CDN setup
- [ ] 📈 Load balancing
- [ ] 🔍 Monitoring & alerts
- [ ] 📱 Mobile app (React Native)

---

## 🤝 المساهمة

هذا المشروع خاص بشركتك. للتطوير الداخلي:
1. أنشئ branch جديد للميزة
2. اعمل Commit منظمة
3. افتح Pull Request للمراجعة

---

## 📄 License

MIT License © 2024 Sunday Board Pro

**ملاحظة:** المشروع لاستخدامك الخاص، احتفظ بجميع الحقوق عند البيع كـ SaaS.

---

## 📞 الدعم والتواصل

- 📧 **Email:** support@sunday-board.com
- 💬 **فريق التطوير الداخلي**
- 📚 **الوثائق:** راجع الملفات في المشروع

---

## ⭐ الخلاصة

الآن لديك نظام إدارة مشاريع كامل:

✅ **Frontend احترافي** - React + Vite + 59 component
✅ **Backend قوي** - Node.js + Express + MongoDB
✅ **Authentication كامل** - JWT + Refresh Tokens
✅ **Multi-tenancy** - للشركات المتعددة
✅ **RBAC** - نظام صلاحيات متقدم
✅ **Subscriptions** - 4 خطط جاهزة
✅ **Enterprise Security** - حماية شاملة
✅ **Scalable** - قابل للتوسع

**الخطوة التالية:** اقرأ `SETUP_GUIDE.md` وابدأ التطوير! 🚀

---

**تم التطوير بـ ❤️ لشركتك**

*آخر تحديث: نوفمبر 2024*
