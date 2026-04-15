import mongoose from "mongoose";

const Schema = mongoose.Schema;

export interface NoteSchema {
  title?: string;
  content?: string;
  pinned?: boolean;
  tags?: string[];
  createdAt: Date;
  updatedAt: Date;
}

const noteSchema = new Schema(
  {
    title: String,
    content: String,
    pinned: Boolean,
    tags: [String],
  },
  { timestamps: true },
);

export const noteModel = mongoose.model("notes", noteSchema);
export { noteSchema };
