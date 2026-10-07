🏠 CraftHaus
Modern renovation, carpentry & interior design platform built with Next.js, TypeScript, Express.js, MongoDB and Better Auth.

🌐 Live: https://crafthaus-nu.vercel.app
⚙️ API: https://crafthaus-backend.vercel.app
✨ Features
🌿 Public Website
- Responsive modern homepage
- Dynamic Services & Projects
- Project detail pages
- Blog & blog detail pages
- Contact form
- Responsive navbar & footer
- Premium editorial-style UI
🔐 Admin Dashboard
- Better Auth login
- Admin role protection
- Services CRUD
- Projects CRUD
- Blog CRUD
- Publish / Unpublish
- Contact message management
- Image uploads with ImageBB
- SEO management
- Toast notifications
🚀 SEO
Admin can manage:
- Meta title & description
- Keywords
- Open Graph title, description & image
- Canonical URL
🛠️ Tech Stack
Frontend
Next.js TypeScript Tailwind CSS HeroUI Better Auth Recharts Sonner React Icons
Backend
Node.js Express.js TypeScript MongoDB JOSE CORS dotenv
MongoDB Native Driver is used. No Mongoose.

🏗️ Architecture
Next.js Frontend
       ↓
   Fetch API
       ↓
Express.js REST API
       ↓
     MongoDB

Better Auth
   ↓ JWT
JWKS Verification
   ↓
Protected Admin API
📁 Structure
Frontend
src/
├── app/
│   ├── admin/
│   ├── blog/
│   ├── contact/
│   ├── login/
│   ├── projects/
│   ├── services/
│   └── page.tsx
├── components/
├── lib/
├── services/
└── types/
Backend
crafthaus-backend/
├── index.ts
├── .env
├── package.json
├── tsconfig.json
└── vercel.json
🔄 Content Flow
Admin Dashboard
      ↓
Frontend API Layer
      ↓
Express API
      ↓
MongoDB
      ↓
Public Website
Collections:
services · projects · blogs · contact_messages · seo
🔑 Main API Routes
GET    /services
GET    /services/:slug

GET    /projects
GET    /projects/:slug

GET    /blogs
GET    /blogs/:slug

POST   /contact

GET    /admin/stats
GET    /admin/services
POST   /admin/services
PATCH  /admin/services/:id
DELETE /admin/services/:id

GET    /admin/projects
PATCH  /admin/projects/:id
DELETE /admin/projects/:id

GET    /admin/blogs
POST   /admin/blogs
PATCH  /admin/blogs/:id
DELETE /admin/blogs/:id

GET    /admin/messages
PATCH  /admin/messages/:id/read
DELETE /admin/messages/:id

GET    /admin/seo
PATCH  /admin/seo
🔒 Admin routes require a valid Bearer JWT.
⚙️ Environment
Frontend .env
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_IMGBB_API_KEY=use_imgbb_key
MONGO_DB_URI=use_mongodb_uri
AUTH_DB_NAME=crafthaus_auth
BETTER_AUTH_URL=http://localhost:3000
Backend .env
PORT=5000
MONGO_DB_URI=use_mongodb_uri
CLIENT_URL=http://localhost:3000
💻 Run Locally
# Frontend
npm install
npm run dev
# Backend
npm install
npm run dev
Frontend → http://localhost:3000
Backend → http://localhost:5000
🎨 Design
Crafted Architecture aesthetic using:
#f8f7f4 Warm Ivory · #24302b Charcoal · #b8895b Copper · #6f716d Muted Gray
Focus: minimal · premium · editorial · responsive
☁️ Deployment
Both frontend and backend are deployed separately on Vercel.
🌐 Frontend: https://crafthaus-nu.vercel.app
⚙️ Backend: https://crafthaus-backend.vercel.app
👨‍💻 Author
Jannatul Ferdous
Full Stack Developer
Built with ❤️ using modern web technologies.
⭐ If you like the project, consider giving it a star!
