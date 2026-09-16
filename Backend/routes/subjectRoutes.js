const express = require("express");

const {
  createSubject,
  getSubjects,
  getSubjectById,
  updateSubject,
  updateSubjectStatus,
  deleteSubject,
  assignFaculty,
} = require("../controllers/subjectController");

const { protect } = require("../middleware/authMiddleware");
const { adminOnly } = require("../middleware/adminMiddleware");

const router = express.Router();


// Get all subjects
router.get(
  "/",
  protect,
  adminOnly,
  getSubjects
);


// Get single subject
router.get(
  "/:id",
  protect,
  adminOnly,
  getSubjectById
);


// Create subject
router.post(
  "/",
  protect,
  adminOnly,
  createSubject
);


// Update subject
router.put(
  "/:id",
  protect,
  adminOnly,
  updateSubject
);


// Update subject status
router.patch(
  "/:id/status",
  protect,
  adminOnly,
  updateSubjectStatus
);


// Assign faculty
router.patch(
  "/:id/faculty",
  protect,
  adminOnly,
  assignFaculty
);


// Delete subject
router.delete(
  "/:id",
  protect,
  adminOnly,
  deleteSubject
);


module.exports = router;