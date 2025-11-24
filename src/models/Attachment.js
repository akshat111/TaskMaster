const mongoose = require('mongoose');

const attachmentSchema = new mongoose.Schema(
  {
    task: { type: mongoose.Schema.Types.ObjectId, ref: 'Task', required: true },
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    fileName: String,
    filePath: String,
    fileType: String
  },
  { timestamps: true }
);

module.exports = mongoose.model('Attachment', attachmentSchema);
