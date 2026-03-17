import mongoose, { Schema, Types } from "mongoose";

export interface IssueModelInterface {
  title: string;
  description: string;
  projectId: Types.ObjectId;
  sprintId: Types.ObjectId;
  reporterId: Types.ObjectId;
  assigneeId: Types.ObjectId;
  type: string;
  priority: string;
  status: string;
  storyPoints: number;
  dueDate: Date;
  labels: string;
  isArchived: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const issueSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },

    description: {
      type: String,
      trim: true,
    },

    projectId: {
      type: Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },

    sprintId: {
      type: Schema.Types.ObjectId,
      ref: "Sprint",
    },

    reporterId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    assigneeId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    type: {
      type: String,
      enum: ["TASK", "BUG", "STORY", "EPIC"],
      default: "TASK",
    },

    priority: {
      type: String,
      enum: ["LOW", "MEDIUM", "HIGH", "CRITICAL"],
      default: "MEDIUM",
    },

    status: {
      type: String,
      enum: ["TODO", "IN_PROGRESS", "REVIEW", "DONE"],
      default: "TODO",
    },

    storyPoints: {
      type: Number,
      min: 0,
    },

    dueDate: {
      type: Date,
    },

    labels: [
      {
        type: String,
        trim: true,
      },
    ],

    isArchived: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

export const Issue = mongoose.model("Issue", issueSchema);
