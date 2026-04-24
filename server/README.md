# 📝 Todo API — Backend

A scalable backend API for managing todos with support for priority, tags and reminders.

---

## 🚀 Features

- Create, update, delete todos
- Priority-based task management
- Tagging system
- Due dates & reminders
- RESTful API design

---

## ⚙️ Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB
- **ORM/ODM:** Mongoose
- **API Docs:** Swagger / Postman

---

## 📁 Project Structure

```
src/
 ├── controllers/     # Handle request/response logic
 ├── services/        # Business logic
 ├── models/          # Database schemas
 ├── routes/          # API routes
 ├── middlewares/     # Auth, error handling
 ├── utils/           # Helper functions
 └── config/          # DB & environment configs
```

---

## 🛠️ Installation

```bash
git clone https://github.com/your-username/todo-api.git
cd todo-api
npm install
```

---

## 🔐 Environment Variables

Create a `.env` file in the root:

```
PORT=5000
DATABASE_URL=your_database_url
JWT_SECRET=your_secret_key
```

**Description:**

- `PORT` → Server port
- `DATABASE_URL` → DB connection string
- `JWT_SECRET` → Token signing key

---

## ▶️ Running the Server

```bash
npm run dev   # development
npm start     # production
```

---

## 📡 API Endpoints

### Todos

```
GET    /api/todos        # Get all todos
POST   /api/todos        # Create todo
GET    /api/todos/:id    # Get single todo
PUT    /api/todos/:id    # Update todo
DELETE /api/todos/:id    # Delete todo
```

### Auth

```
POST /api/auth/register
POST /api/auth/login
```

---

## 🗄️ Database Schema (Simplified)

### Todo

```json
{
  "id": "UUID",
  "title": "string",
  "description": "string",
  "status": "pending | in_progress | completed",
  "priorityLevel": 1-5,
  "dueDate": "Date",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

---

## 🔑 Authentication

- Uses **JWT (JSON Web Token)**
- Include token in headers:

```
Authorization: Bearer <token>
```

- Protected routes require valid token

---

## ⚠️ Error Response Format

```json
{
  "success": false,
  "message": "Error message here"
}
```

---

## 🧪 Testing

```bash
npm test
```

Tools:

- Jest / Mocha

---

## 📦 Deployment

### Using Docker

```bash
docker build -t todo-api .
docker run -p 5000:5000 todo-api
```

---

## 🛠️ Available Scripts

```
npm run dev     # Run with nodemon
npm start       # Run server
npm run lint    # Lint code
npm test        # Run tests
```

---

## 🤝 Contributing

1. Fork the repo
2. Create a feature branch (`feature/new-feature`)
3. Commit changes
4. Open a Pull Request

---

## 📜 License

MIT License

---

## 📌 Notes

- Priority is stored as numeric (1–5) for better sorting
- Designed for scalability and extensibility
- Easily integrable with frontend apps (React, Next.js, etc.)

---
