import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { FilterType, FolderType } from "../../types/fileSystem";
const folderApiSlice = createApi({
  reducerPath: "ApiFolders", // default
  baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_API_URL}/api/file-system` }),
  endpoints: (builder) => ({
    getFolders: builder.query<FolderType[], FilterType | void>({
      query: (filters) => {
        const params = new URLSearchParams();

        if (filters?.name) params.append("name", filters.name);
        if (filters?.description) params.append("description", filters.description);
        if (filters?.createdAt) params.append("createdAt", filters.createdAt);

        return `/?${params.toString()}`;
      },
    }),
    createFolder: builder.mutation<
      FolderType,
      { name: string; description?: string, parent?: string | null }
    >({
      query: (body) => ({
        url: "/folder",
        method: "POST",
        body,
      }),
    }),                           
    deleteFolder: builder.mutation<
      { message: string }, // Response type
      string               // id only
    >({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
    }),
    getFileSystemCount: builder.query<{folders: number ,files:number}, void>({
      query: () => `/count`,
    }),
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
  }),
});

export default folderApiSlice;
export const {
  useGetFoldersQuery,
  useCreateFolderMutation,
  useDeleteFolderMutation,
  useUpdateFolderMutation,
  useGetFileSystemCountQuery
} = folderApiSlice;
