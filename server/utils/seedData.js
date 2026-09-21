import dotenv from "dotenv";
import mongoose from "mongoose";
import Project from "../models/Project.js";
import User from "../models/User.js";
import { seedProjects } from "../services/projectService.js";

dotenv.config();

export const seedInitialDatabase = async () => {
  try {
    // 1. Check and Seed Projects
    const projectCount = await Project.countDocuments();
    if (projectCount === 0) {
      await Project.insertMany(seedProjects);
      console.log(`[MongoDB Seed] Successfully populated ${seedProjects.length} initial projects.`);
    } else {
      console.log(`[MongoDB Status] ${projectCount} projects already exist in the database.`);
    }

    // 2. Ensure Admin User (aniket9097@gmail.com / admin@9097)
    let adminUser = await User.findOne({
      $or: [
        { email: "aniket9097@gmail.com" },
        { username: "aniket9097" },
        { username: "admin" },
        { email: "admin@portfolio.local" },
      ],
    });

    if (!adminUser) {
      adminUser = new User({
        username: "aniket9097",
        email: "aniket9097@gmail.com",
        password: "admin@9097",
        role: "admin",
      });
      await adminUser.save();
      console.log("[MongoDB Seed] Admin user created: aniket9097@gmail.com / admin@9097");
    } else {
      adminUser.username = "aniket9097";
      adminUser.email = "aniket9097@gmail.com";
      adminUser.password = "admin@9097";
      adminUser.role = "admin";
      await adminUser.save();
      console.log("[MongoDB Seed] Admin user credentials synchronized: aniket9097@gmail.com / admin@9097");
    }
  } catch (error) {
    console.warn(`[MongoDB Seed Warning] Error seeding database: ${error.message}`);
  }
};

// Allow direct CLI execution: node utils/seedData.js
if (process.argv[1]?.includes("seedData.js")) {
  const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/portfolio";
  console.log("[MongoDB Seed CLI] Connecting to MongoDB...");
  mongoose.connect(uri)
    .then(async () => {
      console.log("[MongoDB Seed CLI] Connected.");
      await seedInitialDatabase();
      process.exit(0);
    })
    .catch((err) => {
      console.error("[MongoDB Seed CLI] Failed:", err);
      process.exit(1);
    });
}
