<<<<<<< HEAD
# Aniket Kumar - Full-Stack Developer Portfolio

Cyber-aesthetic, high-performance portfolio featuring interactive 3D parallax laptop showcases, horizontal project carousels, full-stack REST API, Cloudinary integration, and MongoDB persistence.

---

## 📁 Architecture Overview

```
Nav/
│
├── client/                     # Frontend: React 18 + Vite + Tailwind CSS + Framer Motion
│   ├── public/                 # Project screenshots & resume
│   ├── src/                    # Components, pages, hooks, services, admin
│   ├── vercel.json             # Vercel SPA routing & cache configuration
│   ├── package.json
│   └── .env
│
├── server/                     # Backend: Node.js + Express + MongoDB + Cloudinary
│   ├── config/                 # db.js (MongoDB), cloudinary.js
│   ├── controllers/            # project, contact, auth controllers
│   ├── models/                 # Mongoose schemas
│   ├── routes/                 # Express API routes
│   ├── render.yaml             # Render deployment blueprint
│   ├── server.js               # Express application entry
│   └── package.json
│
├── .gitignore
├── README.md
└── package.json                # Root convenience runner
```

---

## 🌐 1. Server Deployment (Render)

Deploy your backend as a **Web Service** on [Render.com](https://render.com):

1. Go to Render Dashboard ➔ **New +** ➔ **Web Service**.
2. Connect your GitHub repository.
3. Configure the settings:
   - **Name**: `portfolio-server` (or your preferred name)
   - **Root Directory**: `server`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
4. In **Environment Variables**, add:
   ```env
   NODE_ENV=production
   PORT=10000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_jwt_key
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   CLIENT_URL=https://your-portfolio.vercel.app
   ```
5. Click **Deploy Web Service**.
6. Copy your live Render service URL (e.g. `https://portfolio-server.onrender.com`).

---

## ⚡ 2. Client Deployment (Vercel)

Deploy your frontend on [Vercel.com](https://vercel.com):

1. Go to Vercel Dashboard ➔ **Add New...** ➔ **Project**.
2. Import your GitHub repository.
3. In the project configuration:
   - **Framework Preset**: `Vite`
   - **Root Directory**: click `Edit` and select **`client`**
4. Under **Environment Variables**, add:
   ```env
   VITE_API_URL=https://portfolio-server.onrender.com
   ```
   *(Paste your Render backend URL here)*
5. Click **Deploy**.

`client/vercel.json` will automatically handle all SPA routing, clean URLs, and static asset caching on Vercel!

---

## 💻 Local Development

From the root directory:
```bash
# Start Vite Frontend (http://localhost:5173)
npm run client

# Start Express Backend (http://localhost:5000)
npm run server:dev

# Test production build
npm run client:build
```
=======
# portfolio
>>>>>>> 73bab9339ae8dce94b98ad6dc492510a97a5516d
