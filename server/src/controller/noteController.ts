import type { Request, Response } from "express";
import { userModel } from "../model/userModel.js";
import type { bodyData } from "../shared/notes.js";
import { isValidObjectId, now } from "mongoose";
import type { NoteSchema } from "../model/noteModel.js";

export const note_get = async (
  request: Request,
  response: Response,
): Promise<void> => {
  const { search, tags, sort } = request.query;

  try {
    const user = await userModel.findById(request.user?._id).select("notes");
    if (!user) throw new Error("User not found.");

    let notes: NoteSchema[] = user.notes;

    if (search) {
      notes = notes.filter(
        (note) =>
          note.title?.match(new RegExp(search as string, "i")) ||
          note.content?.match(new RegExp(search as string, "i")),
      );
    }

    // filter by tags
    if (tags) {
      const tagsArray = (tags as string).split(",");
      notes = notes.filter((note) =>
        tagsArray.every((tag) => note?.tags?.includes(tag)),
      );
    }

    // sort
    notes = notes.sort((a, b) =>
      sort === "oldest"
        ? a.createdAt.getTime() - b.createdAt.getTime()
        : b.createdAt.getTime() - a.createdAt.getTime(),
    );

    response.status(200).json({
      status: 200,
      message: notes,
    });
  } catch (err) {
    response.status(400).json({
      status: 400,
      error: err,
    });
  }
};

export const note_post = async (
  request: Request,
  response: Response,
): Promise<Response> => {
  const { title, content, pinned = false, tags }: bodyData = request.body;

  if (!request.body && Object.keys(request.body).length === 0)
    return response.status(404).json({
      status: 404,
      error: "Empty fields.",
    });
  else if (!title || !content || !tags)
    return response.status(404).json({
      status: 404,
      error: "Missing fields.",
    });

  try {
    const user = await userModel.findById(request.user?._id);

    if (!user) throw new Error("User not found.");
    user.notes.push({
      title,
      content,
      pinned,
      tags,
      createdAt: now(),
      updatedAt: now(),
    });
    await user.save();

    return response.status(200).json({
      status: 200,
      message: "Sucessfully created a note!",
    });
  } catch (err) {
    return response.status(400).json({
      status: 400,
      error: err,
    });
  }
};

export const note_patch_id = async (
  request: Request,
  response: Response,
): Promise<Response | undefined> => {
  const id: string = request.params.id as string;
  const partial: bodyData = request.body;

  if (!id || !isValidObjectId(id))
    return response.status(400).json({
      status: 400,
      error: "not a valid object id.",
    });

  try {
    const user = await userModel.findById(request.user?._id);
    if (!user) throw new Error("User not found.");

    const note = user.notes.id(id);
    if (!note) throw new Error("Note not found.");

    note.set({ ...partial, updatedAt: now() });

    await user.save();

    response.status(200).json({
      status: 200,
      message: "Sucessfully updated a note!",
    });
  } catch (err) {
    response.status(400).json({
      status: 400,
      error: err,
    });
  }
};

export const note_delete_id = async (
  request: Request,
  response: Response,
): Promise<Response | undefined> => {
  const id: string = request.params.id as string;

  if (!id || !isValidObjectId(id))
    return response.status(400).json({
      status: 400,
      error: "not a valid object id.",
    });

  try {
    const user = await userModel.findById(request.user?._id);
    if (!user) throw new Error("User not found.");

    const note = user.notes.id(id);
    if (!note) throw new Error("Note not found.");
    note.deleteOne();
    await user.save();

    response.status(200).json({
      status: 200,
      message: "Sucessfully deleted a note!",
    });
  } catch (err) {
    response.status(400).json({
      status: 400,
      error: err,
    });
  }
};
