const router = require('express').Router();
const multer = require('multer');
const auth = require('../middleware/auth');
const Attachment = require('../models/Attachment');
const Task = require('../models/Task');

const upload = multer({ dest: 'uploads/' });

// Upload attachment for a task
router.post('/:taskId', auth, upload.single('file'), async (req, res) => {
  try {
    const { taskId } = req.params;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const attachment = await Attachment.create({
      task: taskId,
      uploadedBy: req.user._id,
      fileName: file.originalname,
      filePath: file.path,
      fileType: file.mimetype
    });

    // Task ke attachments list me push karo
    await Task.findByIdAndUpdate(taskId, {
      $push: { attachments: attachment._id }
    });

    res.status(201).json(attachment);
  } catch (err) {
    res.status(500).json({ message: 'Upload failed', error: err.message });
  }
});

module.exports = router;
