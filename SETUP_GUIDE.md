# 🚀 Sunday Board Pro - دليل الإعداد الشامل

## نظرة عامة

**Sunday Board Pro** هو نظام إدارة مشاريع Enterprise-grade مستوحى من Monday.com، مبني بتقنيات حديثة:

### Frontend (React + Vite)
- ⚛️ React 18
- ⚡ Vite 5 (10-100x أسرع من Webpack)
- 🎨 14 نوع عمود (text, status, person, date, timeline, numbers, rating, progress, tags, priority, files, link, location, email)
- 🎯 59 مكوّن احترافي
- 🌐 دعم RTL كامل للعربية

### Backend (Node.js + Express + MongoDB)
- 🔐 JWT Authentication مع Refresh Tokens
- 🏢 Multi-tenancy (دعم عدة شركات)
- 👥 Role-Based Access Control (4 أدوار)
- 💳 نظام اشتراكات (4 خطط)
- 🛡️ أمان متقدم (Helmet, Rate Limiting, CORS, etc.)
- 📊 MongoDB models كاملة

---

## 📋 المتطلبات

### ضروري
- **Node.js 18+** - [تحميل](https://nodejs.org/)
- **MongoDB 6+** - [تحميل](https://www.mongodb.com/try/download/community) أو استخدم MongoDB Atlas (مجاني)
- **Git** - [تحميل](https://git-scm.com/)

### اختياري
- **MongoDB Compass** - واجهة مرئية لـ MongoDB
- **Postman** - لاختبار API
- **VS Code** - محرر الأكواد المفضل

---

## 🛠 الإعداد الكامل

### 1️⃣ استنساخ المشروع

```bash
git clone https://github.com/Meshal1212222/sunday-management.git
cd sunday-management
```

### 2️⃣ إعداد Frontend

```bash
# تثبيت dependencies
npm install

# تشغيل Frontend في وضع التطوير
npm run dev
```

سيعمل Frontend على: **http://localhost:8080/sunday-management/**

#### Frontend Scripts المتاحة:
```bash
npm run dev      # تشغيل Development server
npm run build    # بناء للإنتاج
npm run preview  # معاينة البناء
npm run deploy   # نشر على GitHub Pages
```

### 3️⃣ إعداد MongoDB

#### خيار A: MongoDB محلي (Recommended للتطوير)

**Windows:**
1. حمّل MongoDB Community Server من [الموقع الرسمي](https://www.mongodb.com/try/download/community)
2. ثبّت البرنامج (اختر "Complete" installation)
3. MongoDB سيعمل تلقائياً على `mongodb://localhost:27017`

**Mac:**
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

**Linux (Ubuntu/Debian):**
```bash
sudo apt-get install mongodb
sudo systemctl start mongodb
sudo systemctl enable mongodb
```

**أو استخدم Docker:**
```bash
docker run -d \
  --name mongodb \
  -p 27017:27017 \
  -v mongodb_data:/data/db \
  mongo:latest
```

تحقق أن MongoDB يعمل:
```bash
# من Terminal آخر
mongosh
# يجب أن تدخل إلى MongoDB shell
```

#### خيار B: MongoDB Atlas (مجاني - Recommended للإنتاج)

1. سجّل في https://www.mongodb.com/cloud/atlas/register
2. أنشئ **Cluster مجاني** (M0 Sandbox)
3. أنشئ Database User (اسم مستخدم + كلمة مرور)
4. أضف IP Address الخاص بك إلى Whitelist (أو `0.0.0.0/0` للسماح للجميع)
5. احصل على **Connection String**:
   - اضغط "Connect"
   - اختر "Connect your application"
   - انسخ connection string
   - مثال: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/sunday-board-pro`

### 4️⃣ إعداد Backend

```bash
cd server

# تثبيت dependencies
npm install

# نسخ ملف البيئة
cp .env.example .env

# حرّر .env وحدّث المتغيرات
nano .env   # أو استخدم أي محرر نصوص
```

#### تحديث ملف `.env`:

**إذا استخدمت MongoDB محلي:**
```env
NODE_ENV=development
PORT=5000
API_VERSION=v1

# MongoDB محلي
MONGODB_URI=mongodb://localhost:27017/sunday-board-pro

# JWT Secrets - غيّرها في الإنتاج!
JWT_SECRET=sunday-board-pro-jwt-secret-key-change-in-production-2024
JWT_EXPIRE=30d
JWT_REFRESH_SECRET=sunday-board-pro-refresh-secret-change-in-production-2024
JWT_REFRESH_EXPIRE=90d

# Security
BCRYPT_ROUNDS=12
RATE_LIMIT_MAX=100
RATE_LIMIT_WINDOW=15

# CORS
CORS_ORIGIN=http://localhost:8080,http://127.0.0.1:8080,https://meshal1212222.github.io
```

**إذا استخدمت MongoDB Atlas:**
```env
# استبدل بـ connection string الخاص بك
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/sunday-board-pro
```

### 5️⃣ تشغيل Backend

```bash
# في مجلد server/
npm run dev
```

يجب أن تشاهد:
```
✅ MongoDB Connected: cluster0-shard-00-00.xxxxx.mongodb.net
📦 Database: sunday-board-pro
🚀 ═══════════════════════════════════════════════════════
🌟 Sunday Board Pro API Server
🚀 ═══════════════════════════════════════════════════════
📡 Server running on port: 5000
🌍 Environment: development
🔗 API Base: http://localhost:5000/api/v1
💚 Health Check: http://localhost:5000/health
🚀 ═══════════════════════════════════════════════════════
```

### 6️⃣ اختبار API

افتح متصفح أو Postman واختبر:

**Health Check:**
```
GET http://localhost:5000/health
```

**التسجيل (Register):**
```bash
POST http://localhost:5000/api/v1/auth/register
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

**تسجيل الدخول (Login):**
```bash
POST http://localhost:5000/api/v1/auth/login
Content-Type: application/json

{
  "email": "ahmed@example.com",
  "password": "password123"
}
```

سيعيد لك `accessToken` استخدمه في جميع الطلبات الأخرى:
```
Authorization: Bearer <accessToken>
```

---

## 🎯 البنية الهيكلية

```
sunday-management/
├── src/                          # Frontend React
│   ├── components/               # 59 React component
│   ├── pages/                    # الصفحات
│   ├── contexts/                 # React contexts
│   ├── hooks/                    # Custom hooks
│   ├── layouts/                  # Layouts
│   ├── firebase/                 # Firebase config
│   ├── data/                     # Mock data
│   └── styles/                   # CSS
├── server/                       # Backend API
│   ├── src/
│   │   ├── config/               # Configuration
│   │   ├── models/               # MongoDB models
│   │   │   ├── User.model.js
│   │   │   ├── Organization.model.js
│   │   │   ├── Workspace.model.js
│   │   │   ├── Board.model.js
│   │   │   └── Task.model.js
│   │   ├── controllers/          # Request handlers
│   │   │   └── auth.controller.js
│   │   ├── routes/               # API routes
│   │   │   ├── auth.routes.js
│   │   │   ├── organization.routes.js
│   │   │   ├── workspace.routes.js
│   │   │   ├── board.routes.js
│   │   │   ├── task.routes.js
│   │   │   ├── user.routes.js
│   │   │   └── subscription.routes.js
│   │   ├── middleware/           # Middleware
│   │   │   ├── auth.middleware.js
│   │   │   ├── error.middleware.js
│   │   │   └── validation.middleware.js
│   │   ├── services/             # Business logic
│   │   └── utils/                # Helpers
│   ├── .env                      # Environment vars
│   ├── .env.example              # Example env
│   ├── server.js                 # Entry point
│   ├── package.json
│   └── README.md
├── index.html                    # Vite entry point
├── vite.config.js                # Vite config
├── package.json
└── README.md
```

---

## 📊 خطط الاشتراك

| الخطة | السعر/شهر | المستخدمين | Workspaces | Boards | Tasks | Storage | المميزات |
|------|----------|------------|-----------|--------|-------|---------|----------|
| **Free** | 0 ريال | 5 | 3 | 10 | 100 | 1 GB | أساسي |
| **Basic** | 99 ريال | 20 | 10 | 50 | 1,000 | 10 GB | + حقول مخصصة |
| **Professional** | 299 ريال | 100 | ∞ | ∞ | ∞ | 100 GB | + Automations + Integrations + تقارير |
| **Enterprise** | 999 ريال | ∞ | ∞ | ∞ | ∞ | ∞ | + دعم أولوية + White Label + API |

---

## 🔐 الأمان

### Frontend
- ✅ React 18 مع أحدث security patches
- ✅ Input sanitization
- ✅ XSS protection
- ✅ HTTPS only في production

### Backend
- ✅ **JWT Authentication** مع Refresh Tokens
- ✅ **bcryptjs** لـ password hashing (12 rounds)
- ✅ **Helmet.js** - حماية من XSS, clickjacking, etc.
- ✅ **CORS** configuration
- ✅ **Rate Limiting** (100 requests per 15 min)
- ✅ **Express-validator** للتحقق من المدخلات
- ✅ **mongo-sanitize** ضد NoSQL injection
- ✅ **HPP** ضد HTTP Parameter Pollution
- ✅ **Compression** للأداء

---

## 🚀 النشر (Deployment)

### Frontend - GitHub Pages

```bash
npm run deploy
```

### Backend - خيارات متعددة

#### 1. Heroku (سهل)
```bash
cd server
heroku create sunday-board-api
git push heroku main
```

#### 2. DigitalOcean / AWS / Azure
- استخدم Docker
- أو Node.js app deployment

#### 3. VPS (Linux Server)
```bash
# تثبيت Node.js و MongoDB
# استنساخ المشروع
# تشغيل مع PM2
pm2 start server/server.js --name sunday-api
pm2 startup
pm2 save
```

---

## 🐛 استكشاف الأخطاء

### Frontend لا يعمل؟
```bash
# تأكد أنك في المجلد الصحيح
pwd  # يجب أن يكون sunday-management/

# امسح node_modules وأعد التثبيت
rm -rf node_modules package-lock.json
npm install

# تأكد من Vite version
npm list vite  # يجب أن تكون 5.x
```

### Backend لا يتصل بـ MongoDB؟
```bash
# تحقق أن MongoDB يعمل
mongosh

# تحقق من connection string في .env
cat server/.env | grep MONGODB_URI

# تحقق من logs
cd server
npm run dev
# شاهد رسائل الخطأ
```

### CORS Errors؟
تأكد أن `CORS_ORIGIN` في `server/.env` يتضمن frontend URL:
```env
CORS_ORIGIN=http://localhost:8080,http://127.0.0.1:8080
```

---

## 📚 الخطوات التالية

### للتطوير المحلي:
1. ✅ Frontend يعمل على http://localhost:8080
2. ✅ Backend يعمل على http://localhost:5000
3. ✅ MongoDB متصل
4. 🔄 اربط Frontend مع Backend (حدّث API endpoints في Frontend)

### لبدء تطوير SaaS:
1. 📧 أضف Email notifications (NodeMailer)
2. 💳 دمج Stripe للمدفوعات
3. 📁 File upload (Multer + AWS S3)
4. 🔄 Real-time updates (Socket.io)
5. 📊 Advanced analytics dashboard
6. 🌐 Multi-language support
7. 📱 Mobile app (React Native)
8. 🔍 Full-text search (Elasticsearch)
9. 📄 API documentation (Swagger)
10. ✅ Unit & Integration tests

---

## 💡 نصائح مهمة

### للاستخدام في شركتك:
- ✅ غيّر JWT secrets في `.env` لقيم عشوائية قوية
- ✅ استخدم MongoDB Atlas للإنتاج (أفضل من local)
- ✅ فعّل HTTPS في production
- ✅ احتفظ بنسخ احتياطية من Database
- ✅ راقب server performance (New Relic, Datadog)

### قبل البيع كـ SaaS:
- ✅ أضف Terms of Service & Privacy Policy
- ✅ دمج نظام دفع (Stripe/PayPal)
- ✅ أضف نظام tickets للدعم الفني
- ✅ CDN للملفات الثابتة (Cloudflare)
- ✅ Load balancing للأداء
- ✅ Monitoring & alerts (Uptime Robot)
- ✅ Documentation كاملة للعملاء

---

## 📞 الدعم

للأسئلة أو المشاكل:
- 📧 Email: support@sunday-board.com
- 💬 فريق التطوير الداخلي

---

## 📄 License

MIT License © 2024 Sunday Board Pro

**ملاحظة:** هذا المشروع لاستخدامك الخاص في شركتك، ثم للبيع كـ SaaS. احتفظ بجميع الحقوق.

---

## ⭐ الخلاصة

تهانينا! الآن لديك:

✅ Frontend احترافي مع React + Vite
✅ Backend قوي مع Node.js + Express + MongoDB
✅ نظام JWT Authentication كامل
✅ Multi-tenancy للشركات المتعددة
✅ Role-based permissions
✅ نظام اشتراكات 4 خطط
✅ أمان Enterprise-grade
✅ جاهز للتطوير والبيع كـ SaaS

**الخطوة التالية:** ابدأ التطوير وأضف المميزات الإضافية التي تحتاجها! 🚀
