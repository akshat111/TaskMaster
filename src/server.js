require("dotenv").config();
const mongoose = require("mongoose");
const http = require("http");
const { Server } = require("socket.io");
const app = require("./app");

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");

    const server = http.createServer(app);

    // Socket.io server
    const io = new Server(server, {
      cors: {
        origin: "*",
      },
    });

    global.io = io;
    global.onlineUsers = {};

    io.on("connection", (socket) => {
      console.log("🔌 Socket connected:", socket.id);

      socket.on("register", (userId) => {
        if (!userId) return;
        global.onlineUsers[userId] = socket.id;
        console.log(" User registered for notifications:", userId);
      });

      socket.on("disconnect", () => {
        console.log(" Socket disconnected:", socket.id);
        // remove from onlineUsers
        for (const [userId, socketId] of Object.entries(global.onlineUsers)) {
          if (socketId === socket.id) {
            delete global.onlineUsers[userId];
            break;
          }
        }
      });
    });

    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
  });
