import mongoose, { Schema, Types } from "mongoose";

export interface SprintModelInterface extends Document {
  name: string;
  projectId: Types.ObjectId;
  startDate: Date;
  endDate: Date;
  status: "PLANNED" | "ACTIVE" | "COMPLETED";
  goal?: string;
  createdAt: Date;
  updatedAt: Date;
}

const sprintSchema = new Schema<SprintModelInterface>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    projectId: {
      type: Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },

    startDate: {
      type: Date,
      required: true,
    },

    endDate: {
      type: Date,
      required: true,
    },

    status: {
      type: String,
      enum: ["PLANNED", "ACTIVE", "COMPLETED"],
      default: "PLANNED",
    },

    goal: {
      type: String,
      trim: true,
      maxlength: 300,
    },
  },
  { timestamps: true },
);

export const Sprint =
  mongoose.models.Sprint ||
  mongoose.model<SprintModelInterface>("Sprint", sprintSchema);
