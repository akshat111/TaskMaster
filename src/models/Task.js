const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    status: {
      type: String,
      enum: ["open", "in-progress", "completed"],
      default: "open"
    },
    dueDate: { type: Date },

    // team/project — abhi optional rakhenge, baad me Team model banayenge
    team: { type: mongoose.Schema.Types.ObjectId, ref: "Team" },

    // jis user ko task assign hai
    assignee: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    // jisne task create kiya
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    // attachments ke ids (baad me model banayenge)
    attachments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Attachment" }]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);
