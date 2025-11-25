
const Task = require("../models/Task");
const OpenAI = require("openai");

const groq = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});


// 1) Create Task
exports.createTask = async (req, res) => {
  try {
    const { title, description, dueDate, teamId, assigneeId } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const task = await Task.create({
      title,
      description,
      dueDate,
      team: teamId || null,
      assignee: assigneeId || null,
      createdBy: req.user._id
    });

    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: "Task creation failed", error: err.message });
  }
};

// 2) Get tasks assigned to logged-in user (+ filter + search)
exports.getMyTasks = async (req, res) => {
  try {
    const { status, search } = req.query;

    const query = { assignee: req.user._id };

    if (status) query.status = status;

    if (search) {
      query.$or = [
        { title: new RegExp(search, "i") },
        { description: new RegExp(search, "i") }
      ];
    }

    const tasks = await Task.find(query).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch tasks", error: err.message });
  }
};

// 3) Get single task (for detail view)
exports.getTaskById = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findById(id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    res.json(task);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch task", error: err.message });
  }
};

// 4) Update task (title/description/dueDate/status etc.)
exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;

    const updated = await Task.findByIdAndUpdate(id, req.body, {
      new: true
    });

    if (!updated) return res.status(404).json({ message: "Task not found" });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Task update failed", error: err.message });
  }
};

// 5) Mark as completed
exports.markCompleted = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findByIdAndUpdate(
      id,
      { status: "completed" },
      { new: true }
    );

    if (!task) return res.status(404).json({ message: "Task not found" });

    // notify assignee if online
    const assigneeId = task.assignee?.toString();
    if (assigneeId && global.io && global.onlineUsers[assigneeId]) {
      global.io.to(global.onlineUsers[assigneeId]).emit("task:updated", {
        message: "A task assigned to you was marked as completed",
        taskId: task._id,
        title: task.title,
        status: task.status,
      });
    }

    res.json(task);
  } catch (err) {
    res.status(500).json({ message: "Failed to mark completed", error: err.message });
  }
};


// 6) Assign task to another user
exports.assignTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { assigneeId } = req.body;

    if (!assigneeId) {
      return res.status(400).json({ message: "assigneeId is required" });
    }

    const task = await Task.findByIdAndUpdate(
      id,
      { assignee: assigneeId },
      { new: true }
    );

    if (!task) return res.status(404).json({ message: "Task not found" });

    // Real-time notification
    if (global.io && global.onlineUsers && global.onlineUsers[assigneeId]) {
      global.io.to(global.onlineUsers[assigneeId]).emit("task:assigned", {
        message: "A new task has been assigned to you",
        taskId: task._id,
        title: task.title,
        status: task.status,
      });
    }

    res.json(task);
  } catch (err) {
    res.status(500).json({ message: "Failed to assign task", error: err.message });
  }
};


// 7) Delete task
exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Task.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "Task not found" });

    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete task", error: err.message });
  }
};

//8 AI description generator using OpenAI

// 11) Generate Task Description via Groq
exports.generateTaskDescription = async (req, res) => {
  try {
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const prompt = `You are a senior backend engineer helping a team manage tasks.

Generate a clear, detailed, and professional task description for developers.

Task title: "${title}"

The description should include:
- What needs to be done (objective)
- Key steps or sub-tasks
- Expected outcome
- Any constraints, edge cases, or testing notes.

Write it as a single well-structured paragraph or 3 to 6 bullet points, no extra chit-chat.`;

    const response = await groq.responses.create({
      model: "llama-3.3-70b-versatile",
      input: prompt,
    });

    const description =
      (response.output_text && response.output_text.trim()) ||
      "No description generated.";

    return res.json({ description });
  } catch (err) {
    console.error("Groq AI error:", err);
    return res.status(500).json({
      message: "AI generation failed",
      error: err.message,
    });
  }
};
