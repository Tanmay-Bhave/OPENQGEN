const User = require("../models/User");
const AuditLog = require("../models/AuditLog");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Login attempt:", email);

    // Check input first
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const user = await User.findOne({
      email: normalizedEmail,
    });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // Check account status
    if (user.status === "Inactive") {
      return res.status(403).json({
        message:
          "Your account is inactive. Please contact the administrator.",
      });
    }

    // Check password
    const passwordMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!passwordMatch) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }
    // Save successful login in audit logs
if (user.role === "faculty") {
  await AuditLog.create({
    userId: user._id,
    user: user.name,
    email: user.email,
    facultyId: user.facultyId || "",
    employeeCode: user.employeeCode || "",
    department: user.department || "",
    designation: user.designation || "",
    role: user.role,
    action: "Faculty Login",
    module: "Authentication",
    status: "Success",
    timestamp: new Date(),
  });
}

    // Generate JWT
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    // Send response
    res.status(200).json({
      message: "Login successful",

      token,

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        facultyId: user.facultyId,
        department: user.department,
        designation: user.designation,
      },
    });
  } catch (error) {
    console.error("Login error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

module.exports = {
  login,
};