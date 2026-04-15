import { Router } from "express";
import { note_delete_id, note_get, note_patch_id, note_post, } from "../controller/noteController.js";
export const noteRouter = Router();
noteRouter.get("/api/notes", note_get);
noteRouter.post("/api/notes", note_post);
noteRouter.patch("/api/notes/:id", note_patch_id);
noteRouter.delete("/api/notes/:id", note_delete_id);
//# sourceMappingURL=noteRouter.js.map