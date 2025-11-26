# 🚀 TaskMaster – Team Task Tracking & Collaboration Backend

TaskMaster is a complete backend system for managing tasks, teams, collaboration, attachments, comments, and real-time notifications.  
It supports authenticated task workflows, team creation, task assignment, and even AI-powered task description generation.

This backend is built using **Node.js, Express, MongoDB, JWT, Socket.io, Multer, and Groq (AI)**.

---

## 🔥 Key Features

### ✅ **User Authentication**
- Register, login, logout
- JWT-based authentication
- Password hashing with bcrypt
- User profile fetch & update

### 📝 **Task Management**
- Create, update, delete tasks  
- View tasks assigned to logged-in user  
- Mark tasks as completed  
- Assign tasks to team members  
- Task filtering (status)  
- Task search (title & description)  

### 👥 **Teams / Projects**
- Create teams/projects  
- Invite team members  
- Team ownership safety

### 💬 **Comments**
- Add comments to tasks  
- Fetch all comments for a task

### 📎 **Attachments**
- Upload file attachments for tasks  
- Multer-based file handling  
- File reference stored in DB

### 🤖 **AI Task Description Generator**
- Uses **Groq API (OpenAI-compatible)**  
- Auto-generates detailed task descriptions from title  
- Endpoint: `/api/tasks/generate`

### 🔔 **Real-Time Notifications (Socket.io)**
- Notify users when:
  - A task is assigned to them  
  - A task is marked completed  
- Tracks online users via socket IDs

---

# 🛠️ **Tech Stack**

- **Node.js**
- **Express.js**
- **MongoDB + Mongoose**
- **JWT**
- **Bcrypt.js**
- **Socket.io**
- **Multer**
- **Groq (OpenAI-compatible AI API)**
- **dotenv**

---

## 📂 Folder Structure

```
TaskMaster/
│── src/
│ ├── controllers/
│ │ ├── auth.controller.js
│ │ ├── task.controller.js
│ │ ├── team.controller.js
│ │ └── comment.controller.js
│
│ ├── middleware/
│ │ └── auth.js
│
│ ├── models/
│ │ ├── User.js
│ │ ├── Task.js
│ │ ├── Team.js
│ │ ├── Comment.js
│ │ └── Attachment.js
│
│ ├── routes/
│ │ ├── auth.routes.js
│ │ ├── task.routes.js
│ │ ├── team.routes.js
│ │ └── comment.routes.js
│
│ ├── app.js
│ └── server.js
│
├── uploads/ (auto-created for attachments)
├── .env
├── package.json
└── README.md
```




# ⚙️ **Setup Instructions**

### 1️⃣ Clone Repository
```
git clone https://github.com/akshat111/TaskMaster.git
cd TaskMaster
```

2️⃣ Install Dependencies
```
npm install
```

3️⃣ Create a .env File
```
PORT=3000
MONGO_URI=your_mongodb_url_here
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=7d

# Groq for AI generation
GROQ_API_KEY=your_groq_api_key
```

🔌 API Endpoints Overview
🔐 Auth Endpoints
```
| Method | Endpoint             | Description     |
| ------ | -------------------- | --------------- |
| POST   | `/api/auth/register` | Create new user |
| POST   | `/api/auth/login`    | Login & get JWT |
| GET    | `/api/auth/me`       | Get profile     |
| PUT    | `/api/auth/me`       | Update profile  |
```

📝 Task Endpoints
```
| Method | Endpoint                  | Description                       |
| ------ | ------------------------- | --------------------------------- |
| POST   | `/api/tasks`              | Create task                       |
| GET    | `/api/tasks/me`           | Tasks assigned to logged-in user  |
| GET    | `/api/tasks/:id`          | Get task by ID                    |
| PATCH  | `/api/tasks/:id`          | Update task                       |
| PATCH  | `/api/tasks/:id/complete` | Mark as completed                 |
| PATCH  | `/api/tasks/:id/assign`   | Assign task                       |
| DELETE | `/api/tasks/:id`          | Delete a task                     |
| POST   | `/api/tasks/generate`     | **AI: Generate task description** |
```

👥 Team Endpoints
```
| Method | Endpoint                | Description               |
| ------ | ----------------------- | ------------------------- |
| POST   | `/api/teams`            | Create team               |
| GET    | `/api/teams`            | Get teams user is part of |
| POST   | `/api/teams/:id/invite` | Invite user to a team     |
```

💬 Comment Endpoints
```
| Method | Endpoint                | Description           |
| ------ | ----------------------- | --------------------- |
| POST   | `/api/comments/:taskId` | Add comment           |
| GET    | `/api/comments/:taskId` | Get comments for task |
```

📎 Attachment Endpoint
```
| Method | Endpoint                   | Description               |
| ------ | -------------------------- | ------------------------- |
| POST   | `/api/attachments/:taskId` | Upload attachment to task |
```

🤖 AI Integration (Groq)

This project includes an AI-powered task description generator using:

Model: llama-3.3-70b-versatile

Endpoint: /api/tasks/generate

Input:
---
  "title": "Implement role-based access control"

---
🔔 Real-Time Notifications

Socket.io is used to push notifications when:

A task is assigned

A task is completed

Online users are tracked via their socket ID, enabling direct notifications.

---
📌 Notes

Attachments are stored locally inside /uploads

JWT is required for all protected routes

Codebase follows modular MVC structure

This repository contains backend only

---
🎉 Conclusion

TaskMaster is a fully functional backend system designed for real-world team collaboration with:

Authentication

Task management

Team management

Collaboration tools

File uploads

Real-time notifications

AI-assisted workflows

Feel free to fork, clone, or use the architecture as reference for your own project!

---
Built with ❤️ by Akshat Kumar and ChatGPT.

---
