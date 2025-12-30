# KSM Dental Care — Serverless Website

Responsive dental clinic website (light theme, navy + dental accents) with:
- Pages: **Home, About, Services, Testimonials, Contact**
- **Appointment booking** form that sends details to the owner via **Email**
- **Contact** form that emails the owner
- **Fully serverless** - deployed on Vercel with serverless functions

## 🚀 Quick Start

### Local Development (Recommended: Vercel CLI)

```bash
# Install Vercel CLI globally
npm i -g vercel

# Run locally with serverless functions
vercel dev
```

This will start the frontend and run serverless functions locally.

### Local Development (Traditional)

```bash
# Install dependencies
npm run install:all

# Start frontend only
cd client
npm run dev
```

**Note**: For full functionality (email sending), use `vercel dev` to test serverless functions locally.

## 📦 Project Structure

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

## ⚙️ Environment Variables

### For Local Development

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

### For Vercel Deployment

Add these in **Vercel Dashboard** → **Settings** → **Environment Variables**:

- `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS`
- `FROM_EMAIL`, `OWNER_EMAIL`
- `CLINIC_NAME`, `CLINIC_PHONE`
- `GOOGLE_PLACES_API_KEY`, `GOOGLE_PLACE_ID` (optional)
- `DEFAULT_PATIENT_COUNT` (optional, defaults to 400)

## 🚢 Deployment

See [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md) for detailed deployment instructions.

**Quick Summary:**
1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

## 📡 API Endpoints

All endpoints are available at `/api/*`:

- `POST /api/appointment` - Book an appointment
- `POST /api/contact` - Send contact message
- `GET /api/stats` - Get clinic statistics
- `GET /api/reviews` - Get Google reviews

## 📝 Notes

- **Serverless**: No backend server to manage - everything runs on Vercel
- **No database**: Submissions are emailed immediately; nothing is stored
- **Patient count**: Currently static (400). To make it dynamic, use Vercel KV or a database
- **Free tier**: Vercel free tier is generous for small projects

## 🔧 Tech Stack

- **Frontend**: React + TypeScript + Vite + Tailwind CSS
- **Backend**: Vercel Serverless Functions (Node.js)
- **Email**: Nodemailer with SMTP
- **Deployment**: Vercel

## 📚 Documentation

- [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md) - Detailed Vercel deployment guide
- [DEPLOYMENT.md](./DEPLOYMENT.md) - Legacy deployment guide (for reference)
