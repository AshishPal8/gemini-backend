# Gemini Clone - AI Chat Platform Backend

A backend clone of Google's Gemini chat experience, built with **Node.js**, **TypeScript**, **Prisma**, and **Stripe**. The platform allows users to sign up, chat with Gemini AI, manage chatrooms, and subscribe to a Pro plan with rate-limiting and webhook integration.

---

## 🚀 Features

- ✅ User authentication with OTP (no SMS, mocked)
- ✅ JWT-based auth system
- ✅ Gemini API integration (Google Generative AI)
- ✅ Chatroom creation and messaging with memory
- ✅ Stripe Pro subscription integration
- ✅ Webhook handler for subscription updates
- ✅ Basic vs Pro tier with daily message limits
- ✅ Node-cache caching for chatrooms
- ✅ Clean project structure with Zod validation & error handling

---

## 🧠 Architecture Overview

```
├── src
│   ├── modules
│   │   ├── auth
│   │   ├── chatroom
│   │   ├── subscribe
│   │   └── webhook
│   │   └── subscription
│   ├── middlewares
│   ├── utils
│   ├── types
│   └── app..ts
│   └── index.ts
├── prisma
│   └── schema.prisma
├── dist (compiled TS)
└── README.md
```

- **Prisma**: ORM connected to PostgreSQL
- **Google Generative AI**: Used for generating responses via Gemini model
- **Stripe**: Subscription and billing
- **Node-cache**: Used to cache chatrooms (5 min TTL)

---

## 🛠️ Setup & Run

### Prerequisites

- Node.js v18+
- PostgreSQL database
- Stripe account (test mode)
- Google Generative AI API Key

### Installation

```bash
npm install
npx prisma db push
npx prisma generate
npm run start:prod
```

> For local dev: use `npm start` to run concurrently with watch mode.

### .env Example

```env
PORT=3000
DATABASE_URL=postgresql://...YOUR_URL...
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PRICE_ID=price_...
STRIPE_WEBHOOK_SECRET=whsec_...
GOOGLE_API_KEY=...
```

---

## 🔄 Queue System (Async Messaging)

Gemini response is handled as an **async request**:

- User sends a message to `/chatroom/:id/message`
- Message is saved in DB with `role: user`
- Gemini is called via Google Generative AI
- Response is saved with `role: gemini`
- Client receives final response (not streaming)

---

## 🤖 Gemini API Integration

Using `@google/generative-ai`:

```ts
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
const result = await model.generateContent({...});
```

- Supports message history (roles: `user`, `model`)
- Error handling with retries and 400 validation

---

## 📦 Subscription Logic

### Stripe Flow

- `/subscribe/pro`: Initiates Stripe Checkout session
- Redirects to Stripe checkout (with success/cancel URLs)
- `/webhook/stripe`: Listens for `checkout.session.completed`
- User upgraded to `subscription: PRO` in DB
- `/subscription/status`: Returns user's current tier

---

## ⚖️ Rate Limiting

- **Basic Tier**: 5 messages per day (reset daily)
- **Pro Tier**: Unlimited messages

Checked on `/chatroom/:id/message` endpoint using DB count + date filter.

---

## 📬 Postman Testing Guide

### 1. Auth

- `POST /auth/signup`: { phone, password }
- `POST /auth/send-otp`: { phone }
- `POST /auth/verify-otp`: { phone, otp }
- `POST /auth/signin`: { phone, password }
- `POST /auth/forgot-password`: { phone }
- `POST /auth/change-password`: { oldPassword, newPassword, otp }

### 2. Chatroom

- `POST /chatroom`: Create new chatroom
- `GET /chatroom`: Get all chatrooms (cached)
- `GET /chatroom/:id`: Chatroom details with messages
- `POST /chatroom/:id/message`: Send message and get Gemini reply

### 3. Stripe

- `POST /subscribe/pro`: Start Stripe Checkout
- `POST /webhook/stripe`: Stripe will call this automatically
- `GET /subscription/status`: Check if user is Pro or Basic

> Use Bearer token in Postman for protected routes.

---

## 🌐 Deployment (Render + Custom Domain)

- **Deployed on**: [Render](https://gemini.ashishpro.com)
- **Build command**: `npm install && npm run build`
- **Start command**: `npm run start:prod`
- **Custom subdomain**: `gemini.ashishpro.com` (CNAME pointing to Render)

---

## 🧩 Assumptions & Design Decisions

- OTP is mocked — not sent via SMS
- Chat memory limited to current chatroom messages
- No streaming response — async full reply only
- Subscription system is fake-paid via Stripe test mode
- Node-cache used for simplicity (no Redis)

---

## ✅ Final Notes

If deployed at: `https://gemini.ashishpro.com`, it simulates a real Gemini-style chat backend.

---

> Built by Ashish — Full Stack Developer | 2025
