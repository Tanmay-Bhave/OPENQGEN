const Question = require("../models/Question");

// CREATE QUESTION
const createQuestion = async (req, res) => {
  try {
    const {
      questionText,
      subject,
      courseCode,
      unit,
      marks,
      co,
      bloomLevel,
      difficulty,
      questionType,
    } = req.body;

    // Basic validation
    if (
      !questionText ||
      !subject ||
      !courseCode ||
      !unit ||
      !marks ||
      !co ||
      !bloomLevel ||
      !difficulty
    ) {
      return res.status(400).json({
        message: "Please provide all required fields",
      });
    }

    const question = await Question.create({
      questionText,
      subject,
      courseCode,
      unit,
      marks,
      co,
      bloomLevel,
      difficulty,
      questionType: questionType || "Descriptive",
      createdBy: req.user.id,
      status: "Pending Review",
    });

    res.status(201).json({
      message: "Question created successfully",
      question,
    });
  } catch (error) {
    console.error("Create question error:", error);

    res.status(500).json({
      message: "Failed to create question",
      error: error.message,
    });
  }
};


// GET ALL QUESTIONS
const getQuestions = async (req, res) => {
  try {
    const questions = await Question.find()
      .populate("subject", "name courseCode")
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      count: questions.length,
      questions,
    });
  } catch (error) {
    console.error("Get questions error:", error);

    res.status(500).json({
      message: "Failed to fetch questions",
      error: error.message,
    });
  }
};


// GET SINGLE QUESTION
const getQuestionById = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id)
      .populate("subject", "name courseCode")
      .populate("createdBy", "name email");

    if (!question) {
      return res.status(404).json({
        message: "Question not found",
      });
    }

    res.status(200).json(question);
  } catch (error) {
    console.error("Get question error:", error);

    res.status(500).json({
      message: "Failed to fetch question",
      error: error.message,
    });
  }
};


// UPDATE QUESTION
const updateQuestion = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);

    if (!question) {
      return res.status(404).json({
        message: "Question not found",
      });
    }

    const updatedQuestion = await Question.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      message: "Question updated successfully",
      question: updatedQuestion,
    });
  } catch (error) {
    console.error("Update question error:", error);

    res.status(500).json({
      message: "Failed to update question",
      error: error.message,
    });
  }
};


// DELETE QUESTION
const deleteQuestion = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);

    if (!question) {
      return res.status(404).json({
        message: "Question not found",
      });
    }

    await Question.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Question deleted successfully",
    });
  } catch (error) {
    console.error("Delete question error:", error);

    res.status(500).json({
      message: "Failed to delete question",
      error: error.message,
    });
  }
};


module.exports = {
  createQuestion,
  getQuestions,
  getQuestionById,
  updateQuestion,
  deleteQuestion,
};
