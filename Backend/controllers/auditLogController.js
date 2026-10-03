const AuditLog = require("../models/AuditLog");

// Get all faculty login audit logs
const getFacultyLoginLogs = async (req, res) => {
  try {
    const logs = await AuditLog.find({
      role: "faculty",
      action: "Faculty Login",
    }).sort({ timestamp: -1 });

    res.status(200).json({
      success: true,
      count: logs.length,
      logs,
    });
  } catch (error) {
    console.error("Error fetching audit logs:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch audit logs",
    });
  }
};

module.exports = {
  getFacultyLoginLogs,
};