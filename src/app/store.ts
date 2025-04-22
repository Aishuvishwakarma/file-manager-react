import { configureStore } from '@reduxjs/toolkit';
import folderReducer from '../features/folder/fileSystemSlice';
import fileSystemSliceApiSlice from '../features/folder/fileSystemSliceApiSlice';
import authReducer from '../features/auth/authSlice';
import { authApiSlice } from '../features/auth/authApi';

export const store = configureStore({
  reducer: {
    [fileSystemSliceApiSlice.reducerPath]: fileSystemSliceApiSlice.reducer,
    [authApiSlice.reducerPath]: authApiSlice.reducer,
    folder: folderReducer,
    auth: authReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
    fileSystemSliceApiSlice.middleware,
    authApiSlice.middleware
  ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
