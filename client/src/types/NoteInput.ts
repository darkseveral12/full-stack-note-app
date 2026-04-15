export type IFormInput = {
  _id: string;
  title?: string;
  content?: string;
  pinned?: boolean;
  tags?: string[];
  createdAt: Date;
  updatedAt: Date;
};

export type bodyData = {
  status: number;
  message: IFormInput[]; // ✅ array, means 0 or more items
};
