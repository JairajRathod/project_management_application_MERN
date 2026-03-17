import mongoose, { Schema, Types } from "mongoose";

export interface CommentModelInterface {
  issueId: Types.ObjectId;
  authorId: Types.ObjectId;
  content: string;
  isEdited: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const commentSchema = new Schema<CommentModelInterface>(
  {
    issueId: {
      type: Schema.Types.ObjectId,
      ref: "Issue",
      required: true,
    },

    authorId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    content: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1000,
    },

    isEdited: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

export const Comment =
  mongoose.models.Comment ||
  mongoose.model<CommentModelInterface>("Comment", commentSchema);
