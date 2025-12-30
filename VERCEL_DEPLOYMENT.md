# Vercel Deployment Guide

This project is now configured as a serverless application on Vercel.

## Prerequisites

1. A Vercel account (sign up at https://vercel.com)
2. GitHub repository connected to Vercel
3. SMTP credentials (Gmail app password or other SMTP service)

## Deployment Steps

### 1. Connect Repository to Vercel

1. Go to https://vercel.com/dashboard
2. Click "Add New..." → "Project"
3. Import your GitHub repository
4. Vercel will auto-detect the configuration

### 2. Configure Build Settings

Vercel will automatically detect from `vercel.json`:
- **Install Command**: `npm install && cd client && npm install`
- **Build Command**: `cd client && npm run build`
- **Output Directory**: `client/dist`
- **Framework**: None (custom configuration)

### 3. Set Environment Variables

Go to **Settings** → **Environment Variables** and add:

```
# Email (SMTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=ksmdentalcare25@gmail.com
SMTP_PASS=yxrhcfnqrmemidcw
FROM_EMAIL=KSM Dental Care <ksmdentalcare25@gmail.com>

# Owner receiving details
OWNER_EMAIL=ksmdentalcare25@gmail.com

# Clinic information
CLINIC_NAME=KSM Dental Care
CLINIC_PHONE=+91 88258 38557

# Google Places API (optional)
GOOGLE_PLACES_API_KEY=your_google_places_api_key_here
GOOGLE_PLACE_ID=your_google_place_id_here

# Default patient count (optional)
DEFAULT_PATIENT_COUNT=400
```

**Important**: Set these for **Production**, **Preview**, and **Development** environments.

### 4. Deploy

1. Click "Deploy"
2. Wait for the build to complete
3. Your site will be live at `https://your-project.vercel.app`

## Project Structure

```
.
├── api/                    # Vercel serverless functions
│   ├── appointment.js      # Appointment booking endpoint
│   ├── contact.js          # Contact form endpoint
│   ├── stats.js            # Stats endpoint
│   └── reviews.js          # Google reviews endpoint
├── client/                 # Frontend React app
│   ├── src/
│   └── dist/               # Build output
├── vercel.json             # Vercel configuration
└── package.json            # Root dependencies (nodemailer)
```

## API Endpoints

All endpoints are available at `/api/*`:

- `POST /api/appointment` - Book an appointment
- `POST /api/contact` - Send contact message
- `GET /api/stats` - Get clinic statistics
- `GET /api/reviews` - Get Google reviews

## Local Development

### Option 1: Use Vercel CLI (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Run locally with serverless functions
vercel dev
```

This will:
- Start the frontend dev server
- Run serverless functions locally
- Use environment variables from `.env.local`

### Option 2: Traditional Development

```bash
# Install dependencies
npm run install:all

# Start frontend only (API calls will fail without backend)
cd client
npm run dev
```

**Note**: For full functionality, use `vercel dev` to test serverless functions locally.

## Environment Variables for Local Development

Create `.env.local` in the root directory:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
FROM_EMAIL=KSM Dental Care <your-email@gmail.com>
OWNER_EMAIL=your-email@gmail.com
CLINIC_NAME=KSM Dental Care
CLINIC_PHONE=+91 88258 38557
GOOGLE_PLACES_API_KEY=your_key_here
GOOGLE_PLACE_ID=your_place_id_here
DEFAULT_PATIENT_COUNT=400
```

## Troubleshooting

### Email Not Sending

1. **Check SMTP credentials**: Verify Gmail app password is correct
2. **Check environment variables**: Ensure all SMTP_* vars are set in Vercel
3. **Check function logs**: Go to Vercel Dashboard → Your Project → Functions → View logs

### 404 Errors on API Endpoints

1. **Check function files**: Ensure files are in `api/` directory
2. **Check file names**: Must match endpoint (e.g., `appointment.js` → `/api/appointment`)
3. **Check vercel.json**: Ensure rewrites are configured correctly

### Build Errors

1. **Check Node version**: Vercel uses Node.js 20.x by default
2. **Check dependencies**: Ensure `package.json` has `nodemailer` in root
3. **Check build logs**: View detailed logs in Vercel dashboard

## Features

✅ **Serverless**: No backend server to manage
✅ **Auto-scaling**: Handles traffic automatically
✅ **Fast**: Edge network for global performance
✅ **Free tier**: Generous free tier for small projects
✅ **Easy deployment**: Git push to deploy

## Limitations

- **Patient count**: Currently static (400). To make it dynamic, use Vercel KV or a database
- **File system**: Serverless functions can't write to file system
- **Cold starts**: First request may be slower (~1-2 seconds)

## Upgrading Patient Count

To make patient count dynamic, you can:

1. **Use Vercel KV** (Key-Value store)
2. **Use a database** (PostgreSQL, MongoDB, etc.)
3. **Use an external API** (Firebase, Supabase, etc.)

See Vercel documentation for integrating these services.

