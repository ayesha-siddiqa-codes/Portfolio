# Ayesha Siddiqa | Portfolio

A responsive full stack portfolio website with an animated, swipeable project gallery, dark/light mode, a downloadable resume and a contact form that emails me and stores messages in MongoDB.

## Features
- Sections for About, Skills, Projects, Resume (timeline and certificates) and Contact
- Projects filter by category, with live demo and GitHub links
- Contact form: Express API, email notification via Nodemailer, optional MongoDB storage
- Spam protection: honeypot field, server-side validation, rate limiting
- Dark / light theme that remembers your choice
- Scroll animations, with side-by-side swipeable cards on mobile, and reduced-motion support
- SEO: meta tags, Open Graph, JSON-LD, `robots.txt`, `sitemap.xml`, semantic HTML

## Tech stack
**Frontend:** React (Vite), CSS  
**Backend:** Node.js, Express, Nodemailer  
**Database:** MongoDB Atlas (Mongoose)  
**Hosting:** Vercel (frontend), Render (backend)

## Project structure
```
portfolio/
├── client/   React frontend (content is edited in src/data.js)
└── server/   Express API for the contact form
```

## Run locally
Requires Node.js 18+.

```bash
# 1. Backend
cd server
cp .env.example .env     # fill in your values
npm install
npm run dev              # http://localhost:5000

# 2. Frontend (new terminal)
cd client
cp .env.example .env
npm install
npm run dev              # http://localhost:5173
```

On Windows PowerShell, use `copy .env.example .env` instead of `cp`.

### Environment variables (server)
| Variable | Purpose |
|---|---|
| `CLIENT_ORIGIN` | Frontend URL allowed to call the API |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` | Email sending (Gmail App Password) |
| `NOTIFY_TO` | Where contact messages are delivered |
| `MONGODB_URI` | Optional: store messages in MongoDB |

### Environment variables (client)
| Variable | Purpose |
|---|---|
| `VITE_API_URL` | URL of the deployed backend |

## Deployment
**Backend (Render):** New Web Service, root directory `server`, build command `npm install`, start command `npm start`. Add the server environment variables and set `CLIENT_ORIGIN` to the frontend URL.

**Frontend (Vercel):** Import the repo, root directory `client`, framework preset Vite. Add `VITE_API_URL` with the Render URL.

## Author
**Ayesha Siddiqa**, BCA student and full stack developer  
GitHub: [ayesha-siddiqa-codes](https://github.com/ayesha-siddiqa-codes)
