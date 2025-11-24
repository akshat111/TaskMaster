const router = require("express").Router();
const auth = require("../middleware/auth");
const taskController = require("../controllers/task.controller");

// All routes protected (login required)
router.post("/", auth, taskController.createTask);               // create task
router.get("/me", auth, taskController.getMyTasks);              // tasks assigned to me
router.get("/:id", auth, taskController.getTaskById);            // single task
router.patch("/:id", auth, taskController.updateTask);           // update task
router.patch("/:id/complete", auth, taskController.markCompleted); // mark completed
router.patch("/:id/assign", auth, taskController.assignTask);    // assign task
router.delete("/:id", auth, taskController.deleteTask);          // delete
router.post("/generate", auth, taskController.generateDescription);  // generate description using AI



module.exports = router;
