# 🚀 ApniSec.com - Quick Start Guide

Complete step-by-step guide to run the project from scratch.

## ✅ Prerequisites

- Node.js 18+ installed
- npm installed
- A PostgreSQL database (local or cloud)

---

## 📦 Step 1: Install Dependencies

The dependencies are already installed, but if you need to reinstall:

```bash
cd "z:\INTERNSHIP PROJECTS\AKANKSHA\New folder"
npm install
```

**Status:** ✅ Already completed (466 packages installed)

---

## 🔐 Step 2: Set Up Environment Variables

Create a file named `.env.local` in the project root directory:

**Location:** `z:\INTERNSHIP PROJECTS\AKANKSHA\New folder\.env.local`

**Contents:**
```env
# Database Connection
DATABASE_URL="postgresql://user:password@localhost:5432/apnisec?schema=public"

# JWT Configuration
JWT_SECRET="your-super-secret-jwt-key-min-32-characters-long"
JWT_EXPIRES_IN="7d"

# Email Service (Optional - for email notifications)
RESEND_API_KEY="re_xxxxxxxxxxxxxxxxxxxx"

# Application URL
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NODE_ENV="development"
```

### 🗄️ Database Setup Options:

**Option A: Supabase (Recommended - Free & Easy)**
1. Go to https://supabase.com
2. Sign up for free account
3. Click "New Project"
4. Choose a name, database password, and region
5. Wait for project to initialize (~2 minutes)
6. Go to Settings → Database
7. Copy the "Connection String" (URI format)
8. Replace `[YOUR-PASSWORD]` with your database password
9. Paste into `.env.local` as `DATABASE_URL`

**Option B: Local PostgreSQL**
1. Install PostgreSQL on your machine
2. Create a database: `createdb apnisec`
3. Use connection string: `postgresql://postgres:password@localhost:5432/apnisec`

### 📧 Email Setup (Optional):

For email notifications (welcome emails, issue notifications):
1. Go to https://resend.com
2. Sign up for free account (100 emails/day free)
3. Get your API key from dashboard
4. Add to `.env.local` as `RESEND_API_KEY`

**Note:** The app works without email - it just won't send notifications.

---

## 🗃️ Step 3: Initialize Database

Once you have your `.env.local` file with a valid `DATABASE_URL`:

```bash
# Generate Prisma Client (creates TypeScript types)
npx prisma generate

# Push database schema (creates tables)
npx prisma db push
```

**Status:** ✅ Prisma client generated

**Next:** Run `npx prisma db push` after setting up your database URL

### Verify Database Setup:

```bash
# Open Prisma Studio to view your database
npx prisma studio
```

This opens a browser interface at http://localhost:5555 where you can see your tables.

---

## 🚀 Step 4: Start Development Server

```bash
npm run dev
```

**Status:** ✅ Already running on http://localhost:3000

The server will start with:
- Frontend: http://localhost:3000
- API Routes: http://localhost:3000/api/*

---

## 🌐 Step 5: Access the Application

Open your browser and visit:

### **Landing Page**
http://localhost:3000

You should see:
- Hero section with "Secure Your Digital Future Today"
- Services section (Cloud Security, Red Team, VAPT)
- About section
- CTA section

### **Register a New Account**
http://localhost:3000/register

1. Enter your name, email, and password
2. Password requirements:
   - Minimum 8 characters
   - At least one uppercase letter
   - At least one lowercase letter
   - At least one number
   - At least one special character (!@#$%^&*)
3. Click "Create Account"
4. You'll be redirected to the dashboard

### **Login**
http://localhost:3000/login

Use the credentials you just created.

### **Dashboard**
http://localhost:3000/dashboard

Here you can:
- Create new security issues
- View all your issues
- Filter by type (Cloud Security, Red Team, VAPT)
- Delete issues

### **Profile**
http://localhost:3000/profile

Manage your account information.

---

## 🧪 Step 6: Test the Application

### Test Authentication:

```bash
# Register a new user
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"test@example.com\",\"password\":\"Test123!@#\",\"name\":\"Test User\"}"

# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"test@example.com\",\"password\":\"Test123!@#\"}" \
  -c cookies.txt

# Get current user (protected route)
curl http://localhost:3000/api/auth/me -b cookies.txt
```

### Test Issue Management:

```bash
# Create an issue
curl -X POST http://localhost:3000/api/issues \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d "{\"title\":\"Cloud Security Audit\",\"description\":\"Need to audit AWS infrastructure for security vulnerabilities\",\"type\":\"CLOUD_SECURITY\"}"

# Get all issues
curl http://localhost:3000/api/issues -b cookies.txt

# Filter by type
curl "http://localhost:3000/api/issues?type=CLOUD_SECURITY" -b cookies.txt
```

---

## 📁 Project Structure Overview

```
z:\INTERNSHIP PROJECTS\AKANKSHA\New folder\
├── app/                      # Next.js pages and API routes
│   ├── api/                  # Backend API endpoints
│   │   ├── auth/            # Authentication (register, login, logout, me)
│   │   ├── issues/          # Issue management (CRUD)
│   │   └── users/           # User profile
│   ├── dashboard/           # Dashboard page (protected)
│   ├── login/               # Login page
│   ├── register/            # Registration page
│   ├── profile/             # Profile page (protected)
│   └── page.tsx             # Landing page
├── backend/                  # OOP Backend Architecture
│   ├── handlers/            # HTTP request handlers
│   ├── services/            # Business logic
│   ├── repositories/        # Database access
│   ├── validators/          # Input validation
│   ├── middleware/          # Auth & rate limiting
│   ├── utils/               # JWT, hashing, rate limiter
│   └── errors/              # Custom error classes
├── components/              # React components
├── prisma/                  # Database schema
│   └── schema.prisma
├── .env.local              # Environment variables (YOU CREATE THIS)
└── README.md               # Documentation
```

---

## 🔧 Common Issues & Solutions

### Issue: "Environment variable not found: DATABASE_URL"
**Solution:** Create `.env.local` file with your database connection string.

### Issue: "Can't reach database server"
**Solution:** 
- Check your database is running
- Verify DATABASE_URL is correct
- For Supabase, ensure you replaced `[YOUR-PASSWORD]` with actual password

### Issue: "Prisma Client not generated"
**Solution:** Run `npx prisma generate`

### Issue: "Table does not exist"
**Solution:** Run `npx prisma db push`

### Issue: "Port 3000 already in use"
**Solution:** 
- Stop the existing server (Ctrl+C)
- Or use a different port: `PORT=3001 npm run dev`

---

## 🎯 What You Can Do Now

1. **Create an Account**
   - Go to http://localhost:3000/register
   - Fill in the form
   - You'll receive a welcome email (if Resend is configured)

2. **Manage Security Issues**
   - Create issues for Cloud Security, Red Team, or VAPT
   - Filter and organize your issues
   - Get email notifications when issues are created

3. **Update Your Profile**
   - Change your name or email
   - View account information

4. **Test the API**
   - Use the cURL commands above
   - Or use Postman/Insomnia

---

## 📊 Database Management

### View Database in Browser:
```bash
npx prisma studio
```
Opens at http://localhost:5555

### Reset Database (Delete all data):
```bash
npx prisma db push --force-reset
```

### View Database Schema:
```bash
npx prisma db pull
```

---

## 🚀 Production Deployment

When ready to deploy:

1. **Set Production Environment Variables:**
   - Generate strong JWT_SECRET (32+ characters)
   - Use production database URL
   - Set NODE_ENV=production
   - Update NEXT_PUBLIC_APP_URL to your domain

2. **Build the Application:**
   ```bash
   npm run build
   npm start
   ```

3. **Deploy to Platform:**
   - Vercel (recommended for Next.js)
   - Railway
   - Render
   - AWS/GCP/Azure

---

## 📞 Need Help?

- Check the [README.md](./README.md) for detailed documentation
- Review the [walkthrough.md](../walkthrough.md) for architecture details
- Check the [implementation_plan.md](../implementation_plan.md) for design decisions

---

## ✅ Quick Checklist

- [ ] Dependencies installed (`npm install`)
- [ ] `.env.local` file created with DATABASE_URL
- [ ] Database set up (Supabase or local PostgreSQL)
- [ ] Prisma client generated (`npx prisma generate`)
- [ ] Database schema pushed (`npx prisma db push`)
- [ ] Development server running (`npm run dev`)
- [ ] Can access http://localhost:3000
- [ ] Can register a new account
- [ ] Can login
- [ ] Can create issues
- [ ] Can view dashboard

---

**You're all set! 🎉**

The application is now running. Visit http://localhost:3000 to start using ApniSec.com!
