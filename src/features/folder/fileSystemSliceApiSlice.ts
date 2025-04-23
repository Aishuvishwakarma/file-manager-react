import { createApi } from "@reduxjs/toolkit/query/react";
import { FilterType, FolderType } from "../../types/fileSystem";
import { customBaseQuery } from "../../app/customBaseQuery";
const fileSystemPath = "api/file-system";

const fileSystemSliceApiSlice = createApi({
  reducerPath: "ApiFolders", // default
  baseQuery: customBaseQuery,
  endpoints: (builder) => ({
    getFolders: builder.query<FolderType[], FilterType | void>({
      query: (filters) => {
        const params = new URLSearchParams();

        if (filters?.name) params.append("name", filters.name);
        if (filters?.description)
          params.append("description", filters.description);
        if (filters?.createdAt) params.append("createdAt", filters.createdAt);

        return `${fileSystemPath}/?${params.toString()}`;
      },
    }),
    createFolder: builder.mutation<
      FolderType,
      { name: string; description?: string; parent?: string | null }
    >({
      query: (body) => ({
        url: `${fileSystemPath}/folder`,
        method: "POST",
        body,
      }),
    }),
    deleteFolderAndFile: builder.mutation<
      { message: string }, // Response type
      string // id only
    >({
      query: (id) => ({
        url: `${fileSystemPath}/${id}`,
        method: "DELETE",
      }),
    }),
    getFileSystemCount: builder.query<{ folders: number; files: number }, void>(
      {
        query: () => `${fileSystemPath}/count`,
      }
    ),
    updateFolder: builder.mutation<
      FolderType,
      { id: string; data: Partial<FolderType> }
    >({
      query: ({ id, data }) => ({
        url: `${fileSystemPath}/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    getBreadCrumb: builder.query<{ _id: string; name: string }[], string>({
      query: (folderId) => `${fileSystemPath}/folder/breadcrumb/${folderId}`,
    }),
  }),
});

export default fileSystemSliceApiSlice;
export const {
  useGetFoldersQuery,
  useCreateFolderMutation,
  useDeleteFolderAndFileMutation,
  useUpdateFolderMutation,
  useGetFileSystemCountQuery,
  useGetBreadCrumbQuery,
} = fileSystemSliceApiSlice;
