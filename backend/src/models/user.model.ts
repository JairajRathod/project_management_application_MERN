import mongoose, { Schema } from "mongoose";

export interface UserModelInterface extends Document {
  fullname: string;
  email: string;
  password?: string;
  role: "ADMIN" | "MANAGER" | "MEMBER";
  // twoFactorEnabled: boolean;
  // twoFactorSecret?: string;
  avatar?: string;
  isVerified: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<UserModelInterface>(
  {
    fullname: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
      maxlength: 100,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    role: {
      type: String,
      enum: ["ADMIN", "MANAGER", "MEMBER"],
      default: "MEMBER",
    },

    // twoFactorEnabled: { type: Boolean, default: false },

    // twoFactorSecret: { type: String },

    avatar: {
      type: String,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

export const User =
  mongoose.models.User ||
  mongoose.model<UserModelInterface>("User", userSchema);
