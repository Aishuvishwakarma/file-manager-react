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
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({
    uploadFile: builder.mutation<File, FormData>({
      query: (formData) => ({
        url: "/upload",
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }),
    }),
    getFilesByFolder: builder.query<File[], string>({
      query: (folderId) => `/files/folder/${folderId}`,
    }),
  }),
});
export default fileApiSlice
export const { useUploadFileMutation, useGetFilesByFolderQuery } = fileApiSlice;
