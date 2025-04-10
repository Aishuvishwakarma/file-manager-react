import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { FolderType } from "../../types/fileSystem";
const folderApiSlice = createApi({
  reducerPath: "ApiFolders", // default
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/folders" }),
  endpoints: (builder) => ({
    getFolders: builder.query<FolderType[], void>({
      query: () => "/",
    }),
    createFolder: builder.mutation<
      FolderType,
      { name: string; description?: string, parent?: string | null }
    >({
      query: (body) => ({
        url: "/",
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
  useUpdateFolderMutation
} = folderApiSlice;
