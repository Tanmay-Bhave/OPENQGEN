const express = require("express");

const {
  createFaculty,
  getFaculties,
  getFacultyById,
  updateFaculty,
  updateFacultyStatus,
  updateFacultyPassword,
  deleteFaculty,
} = require("../controllers/facultyController");

const { protect } = require("../middleware/authMiddleware");
const { adminOnly } = require("../middleware/adminMiddleware");

const router = express.Router();

router.get("/", protect, adminOnly, getFaculties);

router.get("/:id", protect, adminOnly, getFacultyById);

router.post("/", protect, adminOnly, createFaculty);

router.put("/:id", protect, adminOnly, updateFaculty);

router.patch(
  "/:id/status",
  protect,
  adminOnly,
  updateFacultyStatus
);

router.patch(
  "/:id/password",
  protect,
  adminOnly,
  updateFacultyPassword
);

router.delete(
  "/:id",
  protect,
  adminOnly,
  deleteFaculty
);

module.exports = router;