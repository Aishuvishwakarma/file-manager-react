export type FolderType = {
  _id?: string;
  name?: string;
  parent?: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
  parent?: string | null;
  children?: FolderType[];
}

export type FolderApiResponse =
  {
    data:
    { folders: FolderType[] },
    error: any,
    isLoading: boolean
  }