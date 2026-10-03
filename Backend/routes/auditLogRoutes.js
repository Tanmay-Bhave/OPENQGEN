const express = require("express");
const router = express.Router();

const { getFacultyLoginLogs } = require("../controllers/auditLogController");

router.get("/", getFacultyLoginLogs);

module.exports = router;