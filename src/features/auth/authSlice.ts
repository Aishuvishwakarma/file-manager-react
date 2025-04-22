import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  user: {
    email: string;
    token: string;
  } | null;
}

const initialState: AuthState = {
  user: null,
};

const authApiSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ email: string; token: string }>
    ) => {
      state.user = action.payload;
      localStorage.setItem("authToken", action.payload.token);
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("authToken");
    },
  },
});

export const { setCredentials, logout } = authApiSlice.actions;

export default authApiSlice.reducer;
