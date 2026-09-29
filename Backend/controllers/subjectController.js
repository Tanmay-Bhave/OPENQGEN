const Subject = require("../models/Subject");
const User = require("../models/User");

// =====================================================
// GET ALL SUBJECTS
// GET /api/subjects
// =====================================================

const getSubjects = async (req, res) => {
  try {
    const filter = req.user.role === "faculty" ? { assignedFaculty: req.user.id } : {};
    const subjects = await Subject.find(filter)
      .populate(
        "assignedFaculty",
        "name email department designation facultyId"
      )
      .sort({ createdAt: -1 });

    res.status(200).json({
      count: subjects.length,
      subjects,
    });
  } catch (error) {
    console.error("Get subjects error:", error);

    res.status(500).json({
      message: "Failed to fetch subjects",
      error: error.message,
    });
  }
};


// =====================================================
// GET SUBJECT BY ID
// GET /api/subjects/:id
// =====================================================

const getSubjectById = async (req, res) => {
  try {
    const subject = await Subject.findOne(req.user.role === "faculty" ? { _id: req.params.id, assignedFaculty: req.user.id } : { _id: req.params.id }).populate(
      "assignedFaculty",
      "name email department designation facultyId"
    );

    if (!subject) {
      return res.status(404).json({
        message: "Subject not found",
      });
    }

    res.status(200).json(subject);
  } catch (error) {
    console.error("Get subject error:", error);

    res.status(500).json({
      message: "Failed to fetch subject",
      error: error.message,
    });
  }
};


// =====================================================
// CREATE SUBJECT
// POST /api/subjects
// =====================================================

const createSubject = async (req, res) => {
  try {
    const {
      name,
      courseCode,
      department,
      semester,
      credits,
      subjectType,
      assignedFaculty,
      academicYear,
    } = req.body;

    // Required fields
    if (
      !name ||
      !courseCode ||
      !department ||
      !semester ||
      credits === undefined
    ) {
      return res.status(400).json({
        message:
          "Name, course code, department, semester and credits are required",
      });
    }

    const normalizedCourseCode = courseCode
      .trim()
      .toUpperCase();

    // Check duplicate course code
    const existingSubject = await Subject.findOne({
      courseCode: normalizedCourseCode,
    });

    if (existingSubject) {
      return res.status(409).json({
        message: "Course code already exists",
      });
    }

    // Validate assigned faculty
    if (assignedFaculty) {
      const facultyUser = await User.findOne({
        _id: assignedFaculty,
        role: "faculty",
      });

      if (!facultyUser) {
        return res.status(400).json({
          message: "Invalid faculty",
        });
      }
    }

    const subject = await Subject.create({
      name: name.trim(),
      courseCode: normalizedCourseCode,
      department: department.trim(),
      semester: semester.toString().trim(),
      credits,
      subjectType: subjectType || "Core",
      assignedFaculty: assignedFaculty || null,
      academicYear: academicYear || "2026-27",
      status: "Active",
    });

    const populatedSubject = await Subject.findById(
      subject._id
    ).populate(
      "assignedFaculty",
      "name email department designation facultyId"
    );

    res.status(201).json({
      message: "Subject created successfully",
      subject: populatedSubject,
    });
  } catch (error) {
    console.error("Create subject error:", error);

    res.status(500).json({
      message: "Failed to create subject",
      error: error.message,
    });
  }
};


// =====================================================
// UPDATE SUBJECT
// PUT /api/subjects/:id
// =====================================================

const updateSubject = async (req, res) => {
  try {
    const {
      name,
      courseCode,
      department,
      semester,
      credits,
      subjectType,
      assignedFaculty,
      academicYear,
    } = req.body;

    const subject = await Subject.findById(req.params.id);

    if (!subject) {
      return res.status(404).json({
        message: "Subject not found",
      });
    }

    // Check duplicate course code
    if (courseCode) {
      const normalizedCourseCode = courseCode
        .trim()
        .toUpperCase();

      const existingSubject = await Subject.findOne({
        courseCode: normalizedCourseCode,
        _id: { $ne: req.params.id },
      });

      if (existingSubject) {
        return res.status(409).json({
          message: "Course code already exists",
        });
      }

      subject.courseCode = normalizedCourseCode;
    }

    // Validate faculty
    if (assignedFaculty) {
      const facultyUser = await User.findOne({
        _id: assignedFaculty,
        role: "faculty",
      });

      if (!facultyUser) {
        return res.status(400).json({
          message: "Invalid faculty",
        });
      }
    }

    if (name !== undefined) {
      subject.name = name.trim();
    }

    if (department !== undefined) {
      subject.department = department.trim();
    }

    if (semester !== undefined) {
      subject.semester = semester.toString().trim();
    }

    if (credits !== undefined) {
      subject.credits = credits;
    }

    if (subjectType !== undefined) {
      subject.subjectType = subjectType;
    }

    if (assignedFaculty !== undefined) {
      subject.assignedFaculty = assignedFaculty || null;
    }

    if (academicYear !== undefined) {
      subject.academicYear = academicYear;
    }

    await subject.save();

    const populatedSubject = await Subject.findById(
      subject._id
    ).populate(
      "assignedFaculty",
      "name email department designation facultyId"
    );

    res.status(200).json({
      message: "Subject updated successfully",
      subject: populatedSubject,
    });
  } catch (error) {
    console.error("Update subject error:", error);

    res.status(500).json({
      message: "Failed to update subject",
      error: error.message,
    });
  }
};


// =====================================================
// UPDATE SUBJECT STATUS
// PATCH /api/subjects/:id/status
// =====================================================

const updateSubjectStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["Active", "Inactive"].includes(status)) {
      return res.status(400).json({
        message: "Status must be Active or Inactive",
      });
    }

    const subject = await Subject.findByIdAndUpdate(
      req.params.id,
      {
        status,
      },
      {
        new: true,
        runValidators: true,
      }
    ).populate(
      "assignedFaculty",
      "name email department designation facultyId"
    );

    if (!subject) {
      return res.status(404).json({
        message: "Subject not found",
      });
    }

    res.status(200).json({
      message: `Subject ${status.toLowerCase()}`,
      subject,
    });
  } catch (error) {
    console.error("Update subject status error:", error);

    res.status(500).json({
      message: "Failed to update subject status",
      error: error.message,
    });
  }
};


// =====================================================
// DELETE SUBJECT
// DELETE /api/subjects/:id
// =====================================================

const deleteSubject = async (req, res) => {
  try {
    const subject = await Subject.findByIdAndDelete(
      req.params.id
    );

    if (!subject) {
      return res.status(404).json({
        message: "Subject not found",
      });
    }

    res.status(200).json({
      message: "Subject deleted successfully",
    });
  } catch (error) {
    console.error("Delete subject error:", error);

    res.status(500).json({
      message: "Failed to delete subject",
      error: error.message,
    });
  }
};


// =====================================================
// ASSIGN FACULTY
// PATCH /api/subjects/:id/faculty
// =====================================================

const assignFaculty = async (req, res) => {
  try {
    const { assignedFaculty } = req.body;

    if (!assignedFaculty) {
      return res.status(400).json({
        message: "Faculty ID is required",
      });
    }

    const facultyUser = await User.findOne({
      _id: assignedFaculty,
      role: "faculty",
    });

    if (!facultyUser) {
      return res.status(404).json({
        message: "Faculty not found",
      });
    }

    const subject = await Subject.findByIdAndUpdate(
      req.params.id,
      {
        assignedFaculty,
      },
      {
        new: true,
        runValidators: true,
      }
    ).populate(
      "assignedFaculty",
      "name email department designation facultyId"
    );

    if (!subject) {
      return res.status(404).json({
        message: "Subject not found",
      });
    }

    res.status(200).json({
      message: "Faculty assigned successfully",
      subject,
    });
  } catch (error) {
    console.error("Assign faculty error:", error);

    res.status(500).json({
      message: "Failed to assign faculty",
      error: error.message,
    });
  }
};


module.exports = {
  getSubjects,
  getSubjectById,
  createSubject,
  updateSubject,
  updateSubjectStatus,
  deleteSubject,
  assignFaculty,
};
