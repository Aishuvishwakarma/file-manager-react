import { configureStore } from '@reduxjs/toolkit';
import folderReducer from '../features/folder/fileSystemSlice';
import fileSystemSliceApiSlice from '../features/folder/fileSystemSliceApiSlice';

export const store = configureStore({
  reducer: {
    [fileSystemSliceApiSlice.reducerPath]: fileSystemSliceApiSlice.reducer,
    folder: folderReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
    fileSystemSliceApiSlice.middleware
  ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
