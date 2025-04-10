import { configureStore } from '@reduxjs/toolkit';
import folderReducer from '../features/folder/folderSlice';
import fileReducer from '../features/file/fileSlice';
import folderApiSlice from '../features/folder/folderApiSlice';
import fileApiSlice from '../features/file/fileApiSlice';

export const store = configureStore({
  reducer: {
    [fileApiSlice.reducerPath]: fileApiSlice.reducer,
    [folderApiSlice.reducerPath]: folderApiSlice.reducer,
    folder: folderReducer,
    file: fileReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
    fileApiSlice.middleware,
    folderApiSlice.middleware
  ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
