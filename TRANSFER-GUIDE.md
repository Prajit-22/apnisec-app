# 📦 ApniSec.com - Project Transfer Guide

Complete guide to transfer this project to another laptop.

---

## 📋 Method 1: Using Git (RECOMMENDED)

This is the cleanest and most professional way.

### **On Current Laptop:**

#### Step 1: Initialize Git Repository

```bash
cd "z:\INTERNSHIP PROJECTS\AKANKSHA\New folder"

# Initialize git
git init

# Add all files
git add .

# Create first commit
git commit -m "Initial commit - ApniSec.com full-stack application"
```

#### Step 2: Push to GitHub/GitLab

**Option A: GitHub**

1. Go to https://github.com
2. Click "New Repository"
3. Name it: `apnisec-app`
4. Don't initialize with README (we already have code)
5. Click "Create Repository"

Then run:
```bash
# Add remote
git remote add origin https://github.com/YOUR-USERNAME/apnisec-app.git

# Push code
git branch -M main
git push -u origin main
```

**Option B: GitLab** (Similar process)

### **On New Laptop:**

#### Step 1: Install Prerequisites

```bash
# Install Node.js 18+ from https://nodejs.org
# Verify installation
node --version
npm --version
```

#### Step 2: Clone Repository

```bash
# Clone the project
git clone https://github.com/YOUR-USERNAME/apnisec-app.git

# Navigate to project
cd apnisec-app
```

#### Step 3: Install Dependencies

```bash
npm install
```

#### Step 4: Set Up Environment Variables

Create `.env.local` file:

```env
DATABASE_URL="your-supabase-connection-string"
JWT_SECRET="apnisec-super-secret-jwt-key-change-this-in-production-min-32-chars"
JWT_EXPIRES_IN="7d"
RESEND_API_KEY="re_xxxxxxxxxxxxxxxxxxxx"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NODE_ENV="development"
```

**Important:** Use the **same Supabase database** connection string from your current laptop's `.env.local` file.

#### Step 5: Copy .env to .env.local

```bash
# Windows
copy .env.local .env

# Or manually create .env with same content
```

#### Step 6: Generate Prisma Client

```bash
npx prisma generate
```

#### Step 7: Start Development Server

```bash
npm run dev
```

✅ **Done!** Open http://localhost:3000

---

## 📋 Method 2: Manual File Transfer (Without Git)

If you don't want to use Git:

### **On Current Laptop:**

#### Step 1: Create Transfer Package

```bash
cd "z:\INTERNSHIP PROJECTS\AKANKSHA\New folder"

# Create a zip file excluding node_modules and .next
# Use Windows Explorer or PowerShell:
```

**Using PowerShell:**
```powershell
# Compress project (excluding large folders)
Compress-Archive -Path * -DestinationPath ..\apnisec-transfer.zip -Force
```

**Or manually:**
1. Open the project folder
2. Select all files/folders EXCEPT:
   - `node_modules/` (will reinstall)
   - `.next/` (will regenerate)
   - `.env.local` (will recreate)
   - `.env` (will recreate)
3. Right-click → Send to → Compressed (zipped) folder
4. Name it: `apnisec-transfer.zip`

#### Step 2: Copy Your Environment Variables

**IMPORTANT:** Before zipping, copy your `.env.local` content to a secure note/file:

```bash
# View your .env.local content
type .env.local
```

Save this content somewhere safe (password manager, secure note, etc.)

#### Step 3: Transfer the Zip File

Transfer `apnisec-transfer.zip` to the new laptop using:
- USB drive
- Cloud storage (Google Drive, OneDrive, Dropbox)
- Email (if small enough)
- Network share

### **On New Laptop:**

#### Step 1: Install Prerequisites

```bash
# Install Node.js 18+ from https://nodejs.org
# Verify installation
node --version
npm --version
```

#### Step 2: Extract Project

1. Copy `apnisec-transfer.zip` to desired location
2. Extract the zip file
3. Open terminal in the extracted folder

#### Step 3: Install Dependencies

```bash
npm install
```

This will take 2-3 minutes to download all packages.

#### Step 4: Create Environment Files

Create `.env.local` with the content you saved earlier:

```env
DATABASE_URL="your-supabase-connection-string"
JWT_SECRET="apnisec-super-secret-jwt-key-change-this-in-production-min-32-chars"
JWT_EXPIRES_IN="7d"
RESEND_API_KEY="re_xxxxxxxxxxxxxxxxxxxx"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NODE_ENV="development"
```

Then copy it:
```bash
copy .env.local .env
```

#### Step 5: Generate Prisma Client

```bash
npx prisma generate
```

#### Step 6: Start Development Server

```bash
npm run dev
```

✅ **Done!** Open http://localhost:3000

---

## 🗄️ Database Considerations

### **Option 1: Use Same Database (RECOMMENDED)**

- Use the **same Supabase connection string** on both laptops
- All data will be shared between laptops
- No need to migrate data
- **Best for:** Continuing work on different machines

### **Option 2: Create New Database**

If you want a fresh database on the new laptop:

1. Create a new Supabase project
2. Get the new connection string
3. Update `DATABASE_URL` in `.env.local`
4. Run: `npx prisma db push`
5. You'll have an empty database (no users/issues)

### **Option 3: Migrate Existing Data**

If you want to copy data to a new database:

**On Current Laptop:**
```bash
# Export data using Prisma Studio
npx prisma studio
# Manually export tables or use Supabase dashboard
```

**On New Laptop:**
```bash
# Import data using Prisma Studio or Supabase dashboard
```

---

## ✅ Verification Checklist

After setup on new laptop, verify:

- [ ] `npm run dev` starts without errors
- [ ] Can access http://localhost:3000
- [ ] Landing page loads correctly
- [ ] Can register a new account
- [ ] Can login
- [ ] Dashboard works
- [ ] Can create/delete issues
- [ ] Profile page works
- [ ] `npx prisma studio` opens database viewer

---

## 📝 Files to Transfer

### **Essential Files (Must Transfer):**
```
✅ All files in app/
✅ All files in backend/
✅ All files in components/
✅ All files in lib/
✅ All files in prisma/
✅ package.json
✅ tsconfig.json
✅ next.config.js
✅ tailwind.config.ts
✅ postcss.config.js
✅ .gitignore
✅ README.md
✅ QUICKSTART.md
```

### **Files to Recreate (Don't Transfer):**
```
❌ node_modules/ (reinstall with npm install)
❌ .next/ (regenerates automatically)
❌ .env.local (recreate with your credentials)
❌ .env (recreate from .env.local)
```

### **Files to Keep Secret:**
```
🔒 .env.local (contains sensitive data)
🔒 .env (contains sensitive data)
```

**Never commit these to Git!** (Already in `.gitignore`)

---

## 🚨 Common Issues & Solutions

### Issue: "Module not found" errors
**Solution:**
```bash
# Delete node_modules and reinstall
rm -rf node_modules
npm install
```

### Issue: "Environment variable not found: DATABASE_URL"
**Solution:**
```bash
# Make sure .env file exists
copy .env.local .env

# Restart the dev server
npm run dev
```

### Issue: "Prisma Client not generated"
**Solution:**
```bash
npx prisma generate
```

### Issue: Port 3000 already in use
**Solution:**
```bash
# Kill the process
taskkill /F /IM node.exe

# Or use different port
$env:PORT=3001; npm run dev
```

---

## 🎯 Quick Setup Commands (New Laptop)

Copy-paste these commands in order:

```bash
# 1. Navigate to project
cd path/to/apnisec-app

# 2. Install dependencies
npm install

# 3. Generate Prisma Client
npx prisma generate

# 4. Start dev server
npm run dev
```

**Don't forget to create `.env.local` and `.env` files first!**

---

## 📞 Need Help?

If you encounter issues:

1. Check the error message carefully
2. Verify `.env.local` and `.env` files exist with correct content
3. Ensure Node.js version is 18 or higher
4. Try deleting `node_modules` and running `npm install` again
5. Check that Supabase database is accessible

---

## 🔐 Security Reminder

When transferring:
- ✅ Keep `.env.local` content secure
- ✅ Don't share database credentials publicly
- ✅ Don't commit `.env` files to Git
- ✅ Use strong JWT_SECRET in production
- ✅ Keep Resend API key private

---

**Total Transfer Time:** ~10-15 minutes (depending on internet speed for npm install)

**Recommended Method:** Git (Method 1) - Professional, clean, and allows version control
