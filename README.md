# ApniSec.com - Full-Stack Cybersecurity Platform

A production-ready full-stack application built with Next.js 15, TypeScript, and strict Object-Oriented Programming principles.

## 🚀 Features

- **Custom JWT Authentication** - Secure authentication system with HTTP-only cookies
- **Issue Management** - Create and manage security issues (Cloud Security, Red Team, VAPT)
- **User Profiles** - Manage user account information
- **Rate Limiting** - Database-backed rate limiting (100 requests/15 minutes)
- **Email Notifications** - Welcome emails and issue notifications via Resend
- **SEO Optimized** - Lighthouse score ≥ 80%
- **100% OOP Backend** - Handler → Service → Repository architecture

## 🛠️ Tech Stack

### Frontend
- Next.js 15+ (App Router)
- React 19+
- TypeScript
- Tailwind CSS

### Backend
- Next.js API Routes
- Prisma ORM
- PostgreSQL
- JWT Authentication
- Resend (Email)

## 📋 Prerequisites

- Node.js 18+ and npm
- PostgreSQL database (local or Supabase)
- Resend API key (for email notifications)

## ⚙️ Setup Instructions

### 1. Clone and Install

```bash
cd "z:/INTERNSHIP PROJECTS/AKANKSHA/New folder"
npm install
```

### 2. Environment Variables

Create a `.env.local` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/apnisec?schema=public"

# JWT
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
JWT_EXPIRES_IN="7d"

# Email (Resend)
RESEND_API_KEY="re_xxxxxxxxxxxxxxxxxxxx"

# App
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NODE_ENV="development"
```

**Important:** 
- Replace `DATABASE_URL` with your PostgreSQL connection string
- Generate a secure random string for `JWT_SECRET`
- Get your `RESEND_API_KEY` from [resend.com](https://resend.com)

### 3. Database Setup

```bash
# Generate Prisma Client
npx prisma generate

# Push schema to database
npx prisma db push

# (Optional) Open Prisma Studio to view data
npx prisma studio
```

### 4. Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
├── app/                      # Next.js App Router
│   ├── api/                  # API Routes
│   │   ├── auth/            # Authentication endpoints
│   │   ├── issues/          # Issue management endpoints
│   │   └── users/           # User profile endpoints
│   ├── dashboard/           # Dashboard page
│   ├── login/               # Login page
│   ├── register/            # Registration page
│   └── profile/             # Profile page
├── backend/                  # OOP Backend Layer
│   ├── handlers/            # HTTP Layer
│   ├── services/            # Business Logic Layer
│   ├── repositories/        # Data Access Layer
│   ├── validators/          # Input Validation
│   ├── middleware/          # Auth & Rate Limiting
│   ├── utils/               # Utility Classes
│   ├── errors/              # Custom Error Classes
│   └── types/               # DTOs and Interfaces
├── components/              # React Components
│   └── layout/              # Header, Footer
├── lib/                     # Shared Libraries
│   └── prisma.ts            # Prisma Client
└── prisma/                  # Database Schema
    └── schema.prisma
```

## 🔐 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user (protected)

### Issues
- `GET /api/issues` - Get all issues (protected, filterable by type)
- `POST /api/issues` - Create new issue (protected)
- `GET /api/issues/[id]` - Get single issue (protected)
- `PUT /api/issues/[id]` - Update issue (protected)
- `DELETE /api/issues/[id]` - Delete issue (protected)

### User Profile
- `GET /api/users/profile` - Get user profile (protected)
- `PUT /api/users/profile` - Update user profile (protected)

## 🏗️ Architecture

### OOP Design Pattern

```
Request → Handler → Service → Repository → Database
                ↓
            Validator
```

- **Handlers**: HTTP layer, request/response handling
- **Services**: Business logic, orchestration
- **Repositories**: Data access, Prisma operations
- **Validators**: Input validation
- **Middleware**: Authentication, rate limiting

### Key Classes

- `AuthService` - Authentication business logic
- `IssueService` - Issue management logic
- `ProfileService` - User profile logic
- `EmailService` - Email notifications
- `RateLimiter` - Rate limiting implementation
- `JWTUtil` - JWT token management
- `HashUtil` - Password hashing

## 🧪 Testing

### Manual Testing

1. **Registration**
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Test123!@#","name":"Test User"}'
```

2. **Login**
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Test123!@#"}'
```

3. **Create Issue** (use token from login)
```bash
curl -X POST http://localhost:3000/api/issues \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title":"Test Issue","description":"Test description","type":"CLOUD_SECURITY"}'
```

## 🔒 Security Features

- **Password Hashing**: bcrypt with 10 salt rounds
- **JWT Tokens**: Stored in HTTP-only cookies
- **Rate Limiting**: 100 requests per 15 minutes
- **Input Validation**: Comprehensive validation on all inputs
- **SQL Injection Protection**: Prisma ORM prevents SQL injection
- **Security Headers**: Configured in next.config.js

## 📱 Pages

- `/` - Landing page with services showcase
- `/login` - User login
- `/register` - User registration
- `/dashboard` - Issue management dashboard (protected)
- `/profile` - User profile management (protected)

## 🎨 Design

- **Theme**: Cybersecurity-focused dark theme
- **Colors**: Purple/blue gradient accents
- **Responsive**: Mobile, tablet, and desktop layouts
- **Animations**: Smooth transitions and hover effects

## 📧 Email Templates

- **Welcome Email**: Sent on registration
- **Issue Created**: Sent when new issue is created

## 🚀 Deployment

### Environment Variables for Production

Ensure all environment variables are set:
- Use a strong `JWT_SECRET`
- Set `NODE_ENV=production`
- Use production database URL
- Configure `NEXT_PUBLIC_APP_URL` to your domain

### Build

```bash
npm run build
npm start
```

## 📝 License

This project is for educational purposes.

## 👥 Author

Built for ApniSec - Your Cybersecurity Partner
