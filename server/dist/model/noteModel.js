import mongoose from "mongoose";
const Schema = mongoose.Schema;
const noteSchema = new Schema({
    title: String,
    content: String,
    pinned: Boolean,
    tags: [String],
}, { timestamps: true });
export const noteModel = mongoose.model("notes", noteSchema);
export { noteSchema };
//# sourceMappingURL=noteModel.js.map