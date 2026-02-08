# AI Form Assistant

AI-powered form enhancement tool that improves user-written text using Large Language Models, with **real-time streaming responses** for a smooth, modern UX.

---

## ✨ Features

* 🤖 AI-powered text improvement
* 🔄 Real-time streaming responses (Server-Sent Events)
* ✍️ Incremental rendering (text appears as it is generated)
* 🧠 Abortable requests (ready for live-typing scenarios)
* 🎨 Smooth UI transitions using Material UI
* 🌍 Production-ready deployment (Vercel + Render)

---

## 🧱 Tech Stack

### Frontend

* React
* TypeScript
* Vite
* Material UI (MUI)

### Backend

* Node.js
* TypeScript
* Express
* Groq SDK (LLM provider)
* Server-Sent Events (SSE) for streaming

---

## 🗂 Project Structure

```txt
ai-form-assistant/
├── frontend/        # React + Vite application
├── backend/         # Express + TypeScript API
└── README.md
```

This is a **monorepo** setup. Frontend and backend are deployed independently.

---

## 🚀 Live Demo

* **Frontend (Vercel):** [FE Demo](https://ai-form-assistant-coral.vercel.app/)

---

## ⚙️ Local Development

### 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/ai-form-assistant.git
cd ai-form-assistant
```

---

### 2️⃣ Backend setup

```bash
cd backend
npm install
```

Create a `.env` file:

```env
GROQ_API_KEY=your_groq_api_key_here
```

Start the backend:

```bash
npm run dev
```

The backend will run at:

```
http://localhost:3001
```

Health check:

```
GET /health
```

---

### 3️⃣ Frontend setup

```bash
cd frontend
npm install
```

Create a `.env.local` file:

```env
VITE_API_URL=http://localhost:3001
```

Start the frontend:

```bash
npm run dev
```

The app will be available at:

```
http://localhost:5173
```

---

