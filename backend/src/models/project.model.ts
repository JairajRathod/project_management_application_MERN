import mongoose, { Schema, Types } from "mongoose";

export interface ProjectModelInterface extends Document {
  name: string;
  key: string;
  description?: string;
  owner: Types.ObjectId;
  members: Types.ObjectId[];
  access: string;
  isArchived: boolean;
}

const projectSchema = new Schema<ProjectModelInterface>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    key: {
      type: String,
      required: true,
      uppercase: true,
      maxlength: 10,
    },

    description: {
      type: String,
      trim: true,
      maxlength: 500,
    },

    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    members: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    access: {
      type: String,
      enum: ["PUBLIC", "PRIVATE"],
      default: "PUBLIC",
    },

    isArchived: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

export const Project =
  mongoose.models.Project ||
  mongoose.model<ProjectModelInterface>("Project", projectSchema);
