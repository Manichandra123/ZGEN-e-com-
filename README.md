
# 📦 Project Title

🛒 MERN E-Commerce Application
A full-stack e-commerce web application built using the MERN stack (MongoDB, Express, React, Node.js) with modern best practices, responsive UI, and a modular architecture.

---

## 🛠️ Tech Stack

 | Layer            | Technology                         |
| ---------------- | ---------------------------------- |
| Frontend         | React, TailwindCSS, Axios, Zod     |
| Backend          | Node.js, Express.js, MongoDB, JWT  |
| Input Validation | Zod (on frontend)                  |
| API              | RESTful (JSON-based)               |
| Auth             | JWT (Bearer Token)                 |
| State Mgmt       | Local Component State (or Context) |

---

 


---

## 🚀 Features

- 🔐 User Authentication (JWT)
- 🛒 Product Catalog
- 📦 Cart Functionality
- 📍 Pincode Availability Check
- 🧾 Order Creation (Planned)
- 🎨 Fully Responsive UI
- 🧹 Clean & Modular Code

---
 


## 📦 Installation

### Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` folder:

```env
PORT=5000
MONGO_URI=mongodb+srv://<your-db>
JWT_SECRET=your_jwt_secret
```

Start the backend:

```bash
npm run dev
```

---

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

This will start the React app at `http://localhost:5173`.

---

## 📬 API Endpoints (Examples)

| Method | Endpoint              | Description             |
|--------|------------------------|-------------------------|
| GET    | `/api/products`        | Fetch all products      |
| GET    | `/api/products/:id`    | Get single product      |
| POST   | `/api/auth/signup`     | Register user           |
| POST   | `/api/auth/signin`     | Login user              |


---

## ✅ Validation with Zod

Zod is used to validate frontend forms like:

- Login / Register
- Address input
- Pincode checker

```ts
const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
```

---

## 🧩 To Do / Future Features

- [ ] Admin Dashboard
- [ ] Product Filters
- [ ] Product Ratings / Reviews
- [ ] Payment Gateway Integration
- [ ] Image Carousel & Zoom

---

## 🖼️ Screenshots (Optional)

> Add product page, cart view, and authentication UI screenshots here.

---

## 🤝 Contributing

Contributions are welcome! Fork the repo, make your changes, and submit a PR.


