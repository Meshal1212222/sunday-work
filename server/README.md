# Sunday Board Pro - Backend API

نظام Backend احترافي Enterprise-grade لـ Sunday Board Pro مبني على Node.js + Express + MongoDB.

## 🚀 المميزات

### أمان متقدم
- ✅ JWT Authentication مع Refresh Tokens
- ✅ Password Hashing بـ bcryptjs
- ✅ Rate Limiting
- ✅ Helmet.js للحماية من XSS و attacks شائعة
- ✅ CORS Configuration
- ✅ Data Sanitization ضد NoSQL Injection
- ✅ HPP (HTTP Parameter Pollution) Protection

### Multi-tenancy
- ✅ نظام Organizations كامل
- ✅ عزل بيانات كل شركة
- ✅ إدارة أعضاء لكل organization
- ✅ Subscription-based access

### الصلاحيات والأدوار
- ✅ Role-Based Access Control (RBAC)
- ✅ 4 أدوار: Owner, Admin, Member, Guest
- ✅ Permissions حسب الـ resource والـ action
- ✅ Workspace-level permissions

### نظام الاشتراكات
- ✅ 4 خطط: Free, Basic, Professional, Enterprise
- ✅ Usage limits لكل خطة
- ✅ Feature flags
- ✅ Trial period (14 يوم)
- 🔄 Stripe integration (قريباً)

## 📦 المتطلبات

- Node.js 18+
- MongoDB 6+ (أو MongoDB Atlas)
- npm أو yarn

## 🛠 التثبيت

### 1. تثبيت Dependencies

```bash
cd server
npm install
```

### 2. إعداد MongoDB

**خيار 1: MongoDB محلي**
```bash
# تثبيت MongoDB على Linux
sudo apt-get install mongodb

# أو استخدام Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

**خيار 2: MongoDB Atlas (مجاني)**
1. سجل في https://www.mongodb.com/cloud/atlas
2. أنشئ Cluster مجاني
3. احصل على Connection String
4. حدث `MONGODB_URI` في `.env`

### 3. إعداد Environment Variables

انسخ `.env.example` إلى `.env`:
```bash
cp .env.example .env
```

حدّث المتغيرات المهمة:
```env
MONGODB_URI=mongodb://localhost:27017/sunday-board-pro
JWT_SECRET=your-super-secret-key-here
JWT_REFRESH_SECRET=your-refresh-secret-here
```

**⚠️ مهم جداً:** غيّر الـ JWT secrets في production!

## 🚀 التشغيل

### Development
```bash
npm run dev
```

### Production
```bash
npm start
```

سيعمل السيرفر على: `http://localhost:5000`

## 📡 API Endpoints

### Authentication
- `POST /api/v1/auth/register` - تسجيل جديد
- `POST /api/v1/auth/login` - تسجيل دخول
- `POST /api/v1/auth/refresh` - تحديث Token
- `POST /api/v1/auth/logout` - تسجيل خروج
- `GET /api/v1/auth/me` - بيانات المستخدم الحالي
- `PUT /api/v1/auth/profile` - تحديث الملف الشخصي
- `PUT /api/v1/auth/password` - تغيير كلمة المرور

### Organizations
- `GET /api/v1/organizations` - قائمة المنظمات
- `GET /api/v1/organizations/:id` - تفاصيل منظمة
- `PUT /api/v1/organizations/:id` - تحديث منظمة

### Workspaces
- `GET /api/v1/workspaces` - قائمة مساحات العمل
- `POST /api/v1/workspaces` - إنشاء workspace جديد
- `GET /api/v1/workspaces/:id` - تفاصيل workspace
- `PUT /api/v1/workspaces/:id` - تحديث workspace
- `DELETE /api/v1/workspaces/:id` - حذف workspace

### Boards
- `GET /api/v1/boards` - قائمة اللوحات
- `POST /api/v1/boards` - إنشاء board جديد
- `GET /api/v1/boards/:id` - تفاصيل board
- `PUT /api/v1/boards/:id` - تحديث board
- `DELETE /api/v1/boards/:id` - حذف board

### Tasks
- `GET /api/v1/tasks` - قائمة المهام
- `POST /api/v1/tasks` - إنشاء مهمة جديدة
- `GET /api/v1/tasks/:id` - تفاصيل مهمة
- `PUT /api/v1/tasks/:id` - تحديث مهمة
- `DELETE /api/v1/tasks/:id` - حذف مهمة

### Subscriptions
- `GET /api/v1/subscriptions/plans` - خطط الاشتراك
- `GET /api/v1/subscriptions/current` - الاشتراك الحالي
- `POST /api/v1/subscriptions/upgrade` - ترقية الاشتراك
- `POST /api/v1/subscriptions/cancel` - إلغاء الاشتراك

## 🔒 Authentication

جميع الـ endpoints المحمية تحتاج إلى إرسال JWT token في Header:

```
Authorization: Bearer <your_token_here>
```

### مثال على التسجيل:
```bash
curl -X POST http://localhost:5000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "أحمد محمد",
    "email": "ahmed@example.com",
    "password": "password123",
    "organizationName": "شركة مثال",
    "industry": "technology",
    "size": "11-50"
  }'
```

### مثال على تسجيل الدخول:
```bash
curl -X POST http://localhost:5000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "ahmed@example.com",
    "password": "password123"
  }'
```

## 📊 Database Schema

### Models
- **User** - المستخدمين
- **Organization** - الشركات/المنظمات
- **Workspace** - مساحات العمل
- **Board** - اللوحات مع الأعمدة
- **Task** - المهام مع جميع الحقول

## 🎯 خطط الاشتراك

| الخطة | السعر/شهر | المستخدمين | Workspaces | Boards | Tasks | Storage |
|------|----------|------------|-----------|--------|-------|---------|
| Free | 0 SAR | 5 | 3 | 10 | 100 | 1 GB |
| Basic | 99 SAR | 20 | 10 | 50 | 1,000 | 10 GB |
| Professional | 299 SAR | 100 | ∞ | ∞ | ∞ | 100 GB |
| Enterprise | 999 SAR | ∞ | ∞ | ∞ | ∞ | ∞ |

## 🔧 التطوير

### Structure
```
server/
├── src/
│   ├── config/          # إعدادات
│   ├── models/          # Database models
│   ├── controllers/     # Request handlers
│   ├── routes/          # API routes
│   ├── middleware/      # Auth, validation, etc.
│   ├── services/        # Business logic
│   └── utils/           # Helper functions
├── .env                 # Environment variables
├── server.js            # Entry point
└── package.json
```

## 📝 TODO

- [ ] إكمال جميع الـ Controllers
- [ ] إضافة File Upload
- [ ] Email notifications
- [ ] Webhooks
- [ ] Stripe integration للمدفوعات
- [ ] Real-time updates مع Socket.io
- [ ] API documentation مع Swagger
- [ ] Unit tests
- [ ] Docker support

## 🤝 المساهمة

المشروع خاص بشركتك. لأي أسئلة أو تحسينات، تواصل مع فريق التطوير.

## 📄 License

MIT License - Sunday Board Pro © 2024
