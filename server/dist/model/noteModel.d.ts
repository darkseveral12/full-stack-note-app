import mongoose from "mongoose";
export interface NoteSchema {
    title?: string;
    content?: string;
    pinned?: boolean;
    tags?: string[];
    createdAt: Date;
    updatedAt: Date;
}
declare const noteSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    tags: string[];
    title?: string | null;
    content?: string | null;
    pinned?: boolean | null;
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, {
    tags: string[];
    title?: string | null;
    content?: string | null;
    pinned?: boolean | null;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, mongoose.MergeType<mongoose.DefaultSchemaOptions, {
    timestamps: true;
}>> & Omit<{
    tags: string[];
    title?: string | null;
    content?: string | null;
    pinned?: boolean | null;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, unknown, {
    tags: string[];
    title?: string | null;
    content?: string | null;
    pinned?: boolean | null;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
export declare const noteModel: mongoose.Model<{
    tags: string[];
    title?: string | null;
    content?: string | null;
    pinned?: boolean | null;
} & mongoose.DefaultTimestampProps, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, {
    tags: string[];
    title?: string | null;
    content?: string | null;
    pinned?: boolean | null;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
}> & Omit<{
    tags: string[];
    title?: string | null;
    content?: string | null;
    pinned?: boolean | null;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    tags: string[];
    title?: string | null;
    content?: string | null;
    pinned?: boolean | null;
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, {
    tags: string[];
    title?: string | null;
    content?: string | null;
    pinned?: boolean | null;
} & mongoose.DefaultTimestampProps, {
    id: string;
}, mongoose.MergeType<mongoose.DefaultSchemaOptions, {
    timestamps: true;
}>> & Omit<{
    tags: string[];
    title?: string | null;
    content?: string | null;
    pinned?: boolean | null;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, unknown, {
    tags: string[];
    title?: string | null;
    content?: string | null;
    pinned?: boolean | null;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, {
    tags: string[];
    title?: string | null;
    content?: string | null;
    pinned?: boolean | null;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
export { noteSchema };
//# sourceMappingURL=noteModel.d.ts.map