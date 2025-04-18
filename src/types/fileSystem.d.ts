export type FileType = {
  _id?: string;
  name?: string;
  path?: string;
  type?: string;
  folder?: string;
  createdAt?: string;
  parent?: string | null;
  children?: FileType[];
};
export type FolderType = {
  _id: string;
  name?: string;
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

export type FolderBreadcrumbType = {
  parentName: string;
  childName: string;
  show: boolean;
  selectedFolderId: string;
}