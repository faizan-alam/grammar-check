# 🚀 Next.js Authentication & Grammar Checker

- This project includes **Next.js authentication (Login/Signup)** and a **Grammar Checker**.

## 🔧 Getting Started

1️⃣ Install:

- cd grammar-checker
- npm install

2️⃣ Create `.env.local`:

- DATABASE_URL=your_mongodb_connection_string
- PORT=your_port_number
- JWT_SECRET=your_jwt_secret
- OPEN_AI_URL=your_open_ai_url
- OPENAI_API_KEY=your_open_ai_api_key

3️⃣ Run the Server:
- npm run dev

## 🔐 Authentication Details
- **Email:** `testing@testing.com`
- **Password:** `12345678`

## 🚦 Routes
- | Route | Description | Access |
- |------------|--------------------------|--------|
- | `/signup` | User Signup Page | Public |
- | `/login` | User Login Page | Public |
- | `/grammar` | Grammar Checker (Private) | Protected |

## 📽️ Demo Video
🔹 Deployed Link: https://grammar-checker-six.vercel.app/login

🔹 Click the thumbnail or [watch the demo here](https://streamable.com/rc3kna).
