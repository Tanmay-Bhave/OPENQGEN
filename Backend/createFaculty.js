const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const User = require("./models/User");

const createFaculty = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected");

    const email = "rahul.sharma@college.edu";

    // Check if faculty already exists
    const existingFaculty = await User.findOne({ email });

    if (existingFaculty) {
      console.log("Faculty already exists.");
      process.exit(0);
    }

    // Hash password
    const hashedPassword = await bcrypt.hash("Faculty@123", 10);

    // Create faculty
    const faculty = await User.create({
      name: "Dr. Rahul Sharma",
      email: email,
      password: hashedPassword,
      role: "faculty",
      status: "Active",
    });

    console.log("Faculty created successfully!");
    console.log("Email:", faculty.email);
    console.log("Role:", faculty.role);

    process.exit(0);
  } catch (error) {
    console.error("Error creating faculty:", error);
    process.exit(1);
  }
};

createFaculty();