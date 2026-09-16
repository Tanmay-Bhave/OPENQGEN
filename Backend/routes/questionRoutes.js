const express = require("express");

const {
  createQuestion,
  getQuestions,
  getQuestionById,
  updateQuestion,
  deleteQuestion,
} = require("../controllers/questionController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();


// Create question
router.post("/", protect, createQuestion);

// Get all questions
router.get("/", protect, getQuestions);

// Get one question
router.get("/:id", protect, getQuestionById);

// Update question
router.put("/:id", protect, updateQuestion);

// Delete question
router.delete("/:id", protect, deleteQuestion);


module.exports = router;