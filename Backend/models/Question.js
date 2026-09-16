const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    questionText: {
      type: String,
      required: true,
      trim: true,
    },

    subject: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
      required: true,
    },

    courseCode: {
      type: String,
      required: true,
      trim: true,
    },

    unit: {
      type: Number,
      required: true,
      min: 1,
    },

    marks: {
      type: Number,
      required: true,
      min: 1,
    },

    co: {
      type: String,
      required: true,
      trim: true,
    },

    bloomLevel: {
      type: String,
      enum: [
        "Remember",
        "Understand",
        "Apply",
        "Analyze",
        "Evaluate",
        "Create",
      ],
      required: true,
    },

    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      required: true,
    },

    questionType: {
      type: String,
      enum: [
        "MCQ",
        "Short Answer",
        "Descriptive",
        "Numerical",
        "Case Study",
      ],
      default: "Descriptive",
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    status: {
      type: String,
      enum: ["Active", "Inactive", "Pending Review", "Rejected"],
      default: "Pending Review",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Question", questionSchema);
