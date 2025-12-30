# Deployment Guide

## Frontend (Netlify)

The frontend is already deployed on Netlify at `https://ksmclinic.netlify.app`.

### Required Environment Variables in Netlify

Go to your Netlify dashboard → Site settings → Environment variables and add:

```
VITE_API_BASE=https://your-backend-url.onrender.com
```

Replace `https://your-backend-url.onrender.com` with your actual backend URL.

## Backend (Render / Railway / Heroku)

The backend needs to be deployed separately. Here are options:

### Option 1: Render (Recommended - Free tier available)

1. **Create a new Web Service on Render:**
   - Go to https://render.com
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select the `server` folder as the root directory

2. **Configure Build & Start:**
   - Build Command: `npm install`
   - Start Command: `npm start`

3. **Set Environment Variables in Render Dashboard:**
   ```
   NODE_ENV=production
   PORT=10000
   CLIENT_ORIGIN=https://ksmclinic.netlify.app
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_SECURE=false
   SMTP_USER=ksmdentalcare25@gmail.com
   SMTP_PASS=yxrhcfnqrmemidcw
   FROM_EMAIL=KSM Dental Care <ksmdentalcare25@gmail.com>
   OWNER_EMAIL=ksmdentalcare25@gmail.com
   CLINIC_NAME=KSM Dental Care
   CLINIC_PHONE=+91 88258 38557
   ```

4. **Deploy:**
   - Render will automatically deploy your service
   - Note the URL (e.g., `https://ksm-dental-care-api.onrender.com`)

5. **Update Netlify Environment Variable:**
   - Go back to Netlify
   - Set `VITE_API_BASE` to your Render URL (e.g., `https://ksm-dental-care-api.onrender.com`)
   - Redeploy the frontend

### Option 2: Railway

1. Go to https://railway.app
2. Create a new project from GitHub
3. Select the `server` folder
4. Add environment variables (same as Render)
5. Deploy and get the URL
6. Update Netlify with the Railway URL

### Option 3: Heroku

1. Install Heroku CLI
2. Create a new app: `heroku create ksm-dental-care-api`
3. Set environment variables: `heroku config:set KEY=value`
4. Deploy: `git subtree push --prefix server heroku main`
5. Update Netlify with the Heroku URL

## Verification

After deployment:

1. **Test Backend Health:**
   ```
   curl https://your-backend-url.onrender.com/api/health
   ```
   Should return: `{"ok":true}`

2. **Test Email Configuration:**
   ```
   curl https://your-backend-url.onrender.com/api/email-config
   ```

3. **Test Frontend:**
   - Visit https://ksmclinic.netlify.app
   - Try submitting the appointment form
   - Check browser console for errors

## Troubleshooting

### 404 Errors
- Make sure `VITE_API_BASE` is set in Netlify
- Make sure the backend URL is correct (no trailing slash)
- Redeploy frontend after changing environment variables

### 500 Errors
- Check backend logs in Render/Railway/Heroku dashboard
- Verify all environment variables are set correctly
- Check that SMTP credentials are correct
- Test email endpoint: `/api/test-email`

### CORS Errors
- Make sure `CLIENT_ORIGIN` in backend includes `https://ksmclinic.netlify.app`
- Check that the backend `allowedOrigins` array includes your frontend URL

