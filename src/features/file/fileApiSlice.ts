import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface File {
  _id: string;
  name: string;
  path: string;
  type: string;
  folder: string | null;
}

const fileApiSlice = createApi({
  reducerPath: "api", // default
  baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_API_URL}/api/file-system` }),
  endpoints: (builder) => ({
    uploadFile: builder.mutation<any, FormData>({
      query: (formData) => ({
        url: "/upload",
        method: "POST",
        body: formData,
      }),
    }),
    deleteFile: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
    }),
    getFilesByFolder: builder.query<File[], string>({
      query: (folderId) => `/files/${folderId}`,
    })
  }),
});
export default fileApiSlice;
export const {
  useUploadFileMutation,
  useDeleteFileMutation,
  useGetFilesByFolderQuery,
} = fileApiSlice;
