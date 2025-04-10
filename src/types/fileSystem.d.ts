export type FileType = {
  _id?: string;
  name?: string;
  path?: string;
  type?: string;
  folder?: string;
  createdAt?: string;
};
export type FolderType = {
  _id?: string;
  name?: string;
  parent?: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
  parent?: string | null;
  children?: FolderType[];
  files?: FileType[];
};

export type FolderApiResponse = {
  data: { folders: FolderType[]; files: FileType[] };
  error: any;
  isLoading: boolean;
  isSuccess: boolean;
};

export type FilterType = {
  name?: string;
  description?: string;
  createdAt?: string;
};
