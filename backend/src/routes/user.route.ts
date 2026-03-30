// import { Router } from "express";
// import {
//   getCurrentUser,
//   updateProfile,
//   getAllUsers,
//   getUserById,
// } from "@/controllers/user.controller";

// import { requireAuth } from "@/middlewares/auth.middleware";

// const router = Router();

// /**
//  * 🔐 All routes require authenticated user
//  * (validated via NextAuth token/session)
//  */

// // Get logged-in user (from token)
// router.get("/me", requireAuth, getCurrentUser);

// // Update profile
// router.put("/me", requireAuth, updateProfile);

// // Get all users (optional: restrict to admin later)
// router.get("/", requireAuth, getAllUsers);

// // Get user by ID
// router.get("/:userId", requireAuth, getUserById);

// export default router;