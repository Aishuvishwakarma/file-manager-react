import { createApi } from "@reduxjs/toolkit/query/react";
import { customBaseQuery } from "../../app/customBaseQuery";
interface AuthResponse {
  token: string;
  user: {
    _id: string;
    email: string;
  };
}

interface AuthRequest {
  email: string;
  password: string;
}
const authPath = "api/auth";

export const authApiSlice = createApi({
  reducerPath: "authApi",
  baseQuery: customBaseQuery,
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, AuthRequest>({
      query: (credentials) => ({
        url: `${authPath}/login`,
        method: "POST",
        body: credentials,
      }),
    }),
    register: builder.mutation<AuthResponse, AuthRequest>({
      query: (userData) => ({
        url: `${authPath}/login/register`,
        method: "POST",
        body: userData,
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = authApiSlice;
