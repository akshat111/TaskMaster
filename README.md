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

# 📂 Folder Structure

TaskMaster/
│── src/
│ ├── controllers/
│ │ ├── auth.controller.js
│ │ ├── task.controller.js
│ │ ├── team.controller.js
│ │ └── comment.controller.js
│ │
│ ├── middleware/
│ │ └── auth.js
│ │
│ ├── models/
│ │ ├── User.js
│ │ ├── Task.js
│ │ ├── Team.js
│ │ ├── Comment.js
│ │ └── Attachment.js
│ │
│ ├── routes/
│ │ ├── auth.routes.js
│ │ ├── task.routes.js
│ │ ├── team.routes.js
│ │ └── comment.routes.js
│ │
│ ├── app.js
│ └── server.js
│
├── uploads/ (auto-created for attachments)
├── .env
├── package.json
└── README.md
