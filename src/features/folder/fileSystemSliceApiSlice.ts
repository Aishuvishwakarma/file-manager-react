import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { FilterType, FolderType } from "../../types/fileSystem";
const fileSystemSliceApiSlice = createApi({
  reducerPath: "ApiFolders", // default
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_URL}/api/file-system`,
    prepareHeaders(headers) {
      const token = localStorage.getItem("authToken");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getFolders: builder.query<FolderType[], FilterType | void>({
      query: (filters) => {
        const params = new URLSearchParams();

        if (filters?.name) params.append("name", filters.name);
        if (filters?.description)
          params.append("description", filters.description);
        if (filters?.createdAt) params.append("createdAt", filters.createdAt);

        return `/?${params.toString()}`;
      },
    }),
    createFolder: builder.mutation<
      FolderType,
      { name: string; description?: string; parent?: string | null }
    >({
      query: (body) => ({
        url: "/folder",
        method: "POST",
        body,
      }),
    }),
    deleteFolderAndFile: builder.mutation<
      { message: string }, // Response type
      string // id only
    >({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
    }),
    getFileSystemCount: builder.query<{ folders: number; files: number }, void>(
      {
        query: () => `/count`,
      }
    ),
    updateFolder: builder.mutation<
      FolderType,
      { id: string; data: Partial<FolderType> }
    >({
      query: ({ id, data }) => ({
        url: `/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    getBreadCrumb: builder.query<{ _id: string; name: string }[], string>({
      query: (folderId) => `/folder/breadcrumb/${folderId}`,
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
