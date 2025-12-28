# KSM Dental Care — MERN (No-DB) Website

Responsive dental clinic website (light theme, navy + dental accents) with:
- Pages: **Home, About, Services, Testimonials, Contact**
- **Appointment booking** form that sends details to the owner via **Email** and provides a **WhatsApp prefilled message** link
- **Contact** form that emails the owner

## Run locally

### 1) Install

```bash
npm run install:all
```

### 2) Server env

Create `server/.env` (copy from `server/env.example`) and fill:
- `OWNER_EMAIL`
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS`
- Optional: `OWNER_WHATSAPP` (digits, international format)

### 3) Client env (optional)

For local dev the client proxies `/api` to the server automatically.
If you want an explicit base URL, create `client/.env`:

```bash
VITE_API_BASE=http://localhost:5000
```

### 4) Start dev

```bash
npm run dev
```

- Client: `http://localhost:5173`
- Server: `http://localhost:5000` (health: `/api/health`)

## Notes

- **No database**: submissions are emailed immediately; nothing is stored.
- **WhatsApp**: after booking, the UI shows a button that opens WhatsApp with a prefilled message to the owner number.


