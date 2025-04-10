import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FilterType, FolderType } from "../../types/fileSystem";

interface FolderState {
  folders: FolderType[];
  filter: FilterType;
  loading: boolean;
  error: string | null;
}

const initialState: FolderState = {
  folders: [],
  filter: { name: "", description: "", createdAt: "" },
  loading: false,
  error: null,
};

const folderSlice = createSlice({
  name: "folder",
  initialState,
  reducers: {
    setFolders(state, action: PayloadAction<FolderType[]>) {
      state.folders = action.payload;
    },
    setFilters(
      state,
      action: PayloadAction<FilterType>
    ) {
      state.filter = { ...state.filter, ...action.payload };
    },
    clearFolders(state) {
      state.folders = [];
    },
    addFolder(state, action: PayloadAction<FolderType>) {
      state.folders.push(action.payload);
    },
    deleteFolder(state, action: PayloadAction<string>) {
      state.folders = state.folders.filter(
        (folder) => folder._id !== action.payload
      );
    },
    updateFolder(
      state,
      action: PayloadAction<{ _id: string; name?: string; parent?: string }>
    ) {
      const folder = state.folders.find((f) => f._id === action.payload._id);
      if (folder) {
        if (action.payload.name !== undefined)
          folder.name = action.payload.name;
        if (action.payload.parent !== undefined)
          folder.parent = action.payload.parent;
      }
    },
  },
});

export const {
  setFolders,
  setFilters,
  clearFolders,
  addFolder,
  deleteFolder,
  updateFolder,
} = folderSlice.actions;

export default folderSlice.reducer;
