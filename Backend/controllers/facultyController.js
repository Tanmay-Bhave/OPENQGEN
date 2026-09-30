const User = require("../models/User");
const bcrypt = require("bcryptjs");
const {
  sendFacultyRegistrationEmail,
} = require("../services/emailService");
// =====================================================
// GET ALL FACULTY
// GET /api/faculty
// =====================================================
const getFaculties = async (req, res) => {
  try {
    const faculty = await User.find({ role: "faculty" })
      .select("-password")
      .sort({ createdAt: -1 });

    res.status(200).json({
      count: faculty.length,
      faculty,
    });
  } catch (error) {
    console.error("Get faculty error:", error);

    res.status(500).json({
      message: "Failed to fetch faculty",
      error: error.message,
    });
  }
};


// =====================================================
// GET SINGLE FACULTY
// GET /api/faculty/:id
// =====================================================
const getFacultyById = async (req, res) => {
  try {
    const faculty = await User.findOne({
      _id: req.params.id,
      role: "faculty",
    }).select("-password");

    if (!faculty) {
      return res.status(404).json({
        message: "Faculty not found",
      });
    }

    res.status(200).json(faculty);
  } catch (error) {
    console.error("Get faculty by ID error:", error);

    res.status(500).json({
      message: "Failed to fetch faculty",
      error: error.message,
    });
  }
};


// =====================================================
// CREATE FACULTY
// POST /api/faculty
// =====================================================
const createFaculty = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      department,
      designation,
      phone,
      facultyId,
      employeeCode,
    } = req.body;

    if (!name || !email || !password || !department) {
      return res.status(400).json({
        message: "Name, email, password and department are required",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Check duplicate email
    const existingFaculty = await User.findOne({
      email: normalizedEmail,
    });

    if (existingFaculty) {
      return res.status(409).json({
        message: "Faculty with this email already exists",
      });
    }

    // Check duplicate faculty ID if provided
    if (facultyId) {
      const existingFacultyId = await User.findOne({
        facultyId: facultyId.trim(),
      });

      if (existingFacultyId) {
        return res.status(409).json({
          message: "Faculty ID already exists",
        });
      }
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const faculty = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      password: hashedPassword,
      role: "faculty",
      facultyId: facultyId ? facultyId.trim() : undefined,
      employeeCode: employeeCode
        ? employeeCode.trim()
        : undefined,
      department: department.trim(),
      designation: designation
        ? designation.trim()
        : undefined,
      phone: phone ? phone.trim() : undefined,
      status: "Active",
    });
   await sendFacultyRegistrationEmail({
  facultyName: faculty.name,
  facultyEmail: faculty.email,
  facultyPassword: password,
});

    const facultyResponse = faculty.toObject();

    delete facultyResponse.password;

    res.status(201).json({
      message: "Faculty created successfully",
      faculty: facultyResponse,
    });
  } catch (error) {
    console.error("Create faculty error:", error);

    res.status(500).json({
      message: "Failed to create faculty",
      error: error.message,
    });
  }
};


// =====================================================
// UPDATE FACULTY
// PUT /api/faculty/:id
// =====================================================
const updateFaculty = async (req, res) => {
  try {
    const {
      name,
      email,
      department,
      designation,
      phone,
      facultyId,
      employeeCode,
    } = req.body;

    const faculty = await User.findOne({
      _id: req.params.id,
      role: "faculty",
    });

    if (!faculty) {
      return res.status(404).json({
        message: "Faculty not found",
      });
    }

    // Check email duplicate
    if (email) {
      const normalizedEmail = email.trim().toLowerCase();

      const existingUser = await User.findOne({
        email: normalizedEmail,
        _id: { $ne: req.params.id },
      });

      if (existingUser) {
        return res.status(409).json({
          message: "Email already belongs to another account",
        });
      }

      faculty.email = normalizedEmail;
    }

    // Check Faculty ID duplicate
    if (facultyId) {
      const existingFacultyId = await User.findOne({
        facultyId: facultyId.trim(),
        _id: { $ne: req.params.id },
      });

      if (existingFacultyId) {
        return res.status(409).json({
          message: "Faculty ID already exists",
        });
      }

      faculty.facultyId = facultyId.trim();
    }

    if (name !== undefined) {
      faculty.name = name.trim();
    }

    if (department !== undefined) {
      faculty.department = department.trim();
    }

    if (designation !== undefined) {
      faculty.designation = designation.trim();
    }

    if (phone !== undefined) {
      faculty.phone = phone.trim();
    }

    if (employeeCode !== undefined) {
      faculty.employeeCode = employeeCode.trim();
    }

    await faculty.save();

    const response = faculty.toObject();

    delete response.password;

    res.status(200).json({
      message: "Faculty updated successfully",
      faculty: response,
    });
  } catch (error) {
    console.error("Update faculty error:", error);

    res.status(500).json({
      message: "Failed to update faculty",
      error: error.message,
    });
  }
};


// =====================================================
// CHANGE FACULTY STATUS
// PATCH /api/faculty/:id/status
// =====================================================
const updateFacultyStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["Active", "Inactive"].includes(status)) {
      return res.status(400).json({
        message: "Status must be Active or Inactive",
      });
    }

    const faculty = await User.findOneAndUpdate(
      {
        _id: req.params.id,
        role: "faculty",
      },
      {
        status,
      },
      {
        new: true,
        runValidators: true,
      }
    ).select("-password");

    if (!faculty) {
      return res.status(404).json({
        message: "Faculty not found",
      });
    }

    res.status(200).json({
      message: `Faculty ${status.toLowerCase()}`,
      faculty,
    });
  } catch (error) {
    console.error("Update faculty status error:", error);

    res.status(500).json({
      message: "Failed to update faculty status",
      error: error.message,
    });
  }
};


// =====================================================
// CHANGE FACULTY PASSWORD
// PATCH /api/faculty/:id/password
// =====================================================
const updateFacultyPassword = async (req, res) => {
  try {
    const { password } = req.body;

    if (!password || password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters",
      });
    }

    const faculty = await User.findOne({
      _id: req.params.id,
      role: "faculty",
    });

    if (!faculty) {
      return res.status(404).json({
        message: "Faculty not found",
      });
    }

    faculty.password = await bcrypt.hash(password, 10);

    await faculty.save();

    res.status(200).json({
      message: "Faculty password updated successfully",
    });
  } catch (error) {
    console.error("Update faculty password error:", error);

    res.status(500).json({
      message: "Failed to update faculty password",
    });
  }
};


// =====================================================
// DELETE FACULTY
// DELETE /api/faculty/:id
// =====================================================
const deleteFaculty = async (req, res) => {
  try {
    const faculty = await User.findOneAndDelete({
      _id: req.params.id,
      role: "faculty",
    });

    if (!faculty) {
      return res.status(404).json({
        message: "Faculty not found",
      });
    }

    res.status(200).json({
      message: "Faculty deleted successfully",
    });
  } catch (error) {
    console.error("Delete faculty error:", error);

    res.status(500).json({
      message: "Failed to delete faculty",
    });
  }
};


// =====================================================
// EXPORTS
// =====================================================
module.exports = {
  getFaculties,
  getFacultyById,
  createFaculty,
  updateFaculty,
  updateFacultyStatus,
  updateFacultyPassword,
  deleteFaculty,
};