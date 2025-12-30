# AuthUser — Secure Authentication System

AuthUser is a full-stack authentication system built with modern web technologies.  
It provides secure user onboarding, login, and password-reset workflows with OTP (One-Time Password) verification.

It is designed to be simple, scalable, and production-ready.

---

## ✨ Features

- 🔐 User registration and login  
- 🔄 JSON Web Token (JWT)-based authentication  
- 📧 Password reset using OTP email verification  
- 🚫 Protected routes (frontend & backend side)  
- 📝 Validations and helpful error messages  
- 🛡️ Secure password hashing (bcrypt)  
- 📬 Re-usable email templates (Nodemailer)  
- ⚙️ Environment-based configuration

---

## 🧰 Tech Stack

**Frontend**
- React (Vite)
- Axios
- React Router
- Toast notifications

**Backend**
- Node.js
- Express.js
- MongoDB + Mongoose
- Nodemailer
- JWT
- Bcrypt

---

## 📂 Project Structure

```
AuthUser/
 ├── frontend/        # React frontend
 ├── backend/        # Node/Express backend
 └── README.md
```

---

## 🚀 Getting Started

### 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/AuthUser.git
cd AuthUser
```

### 2️⃣ Install dependencies

Backend:

```bash
cd backend
npm install
```

Frontend:

```bash
cd ../frontend
npm install
```

---

## 🔧 Environment Variables

Create a **.env** file in the backend (`/backend`) and configure:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret_key

SENDER_EMAIL=your_email@example.com
SENDER_PASSWORD=your_email_password
SMTP_HOST=smtp.example.com
SMTP_PORT=587
frontend_URL=http://localhost:5173
```

> Never commit real credentials — use environment variables.

---

## ▶️ Running the App

Start backend:

```bash
cd backend
npm run dev
```

Start frontend:

```bash
cd frontend
npm run dev
```

---

## 🔐 Password Reset Flow (OTP)

1. User enters email.  
2. System generates OTP and sends it by email.  
3. User submits OTP for verification.  
4. User sets a new password.  

All OTP logic is secured and time-bound (expiry enforced).

---

## 📡 API Overview

| Method | Endpoint | Description |
|-------|----------|------------|
| POST | `/api/auth/register` | Register user |
| POST | `/api/auth/login` | Login user |
| POST | `/api/auth/send-reset-otp` | Send OTP to email |
| POST | `/api/auth/verify-reset-otp` | Verify OTP |
| POST | `/api/auth/reset-password` | Reset password |

---

## 🧪 Future Enhancements

- Multi-device login management  
- Remember-me sessions  
- Google / GitHub OAuth login  
- Activity logs and notifications  
- Two-factor authentication  

---

## 🤝 Contributing

Pull requests are welcome.  
Please open an issue before making major changes.

---

## 📜 License

This project is licensed under the MIT License.

---

## 🙌 Acknowledgements

Thanks to the open-source community and libraries that made this project possible.
