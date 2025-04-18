import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FilterType, FolderBreadcrumbType, FolderType } from "../../types/fileSystem";

interface FolderState {
  folders: FolderType[];
  filter: FilterType;
  loading: boolean;
  error: string | null;
  showSideBar: boolean;
  breadcrumb: FolderBreadcrumbType;
}

const initialState: FolderState = {
  folders: [],
  filter: { name: "", description: "", createdAt: "" },
  loading: false,
  error: null,
  showSideBar: true,
  breadcrumb: { parentName: "NSM", childName: "Folders & Documents", show: true, selectedFolderId: "" },
};

const fileSystemSlice = createSlice({
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
    updateShowSideBar(state, action: PayloadAction<boolean>) {
      state.showSideBar = action.payload
    },
    updateBreadcrumb(state, action: PayloadAction<{ folderId: string | null }>) {
      state.breadcrumb.selectedFolderId = action.payload.folderId || "";
    }
  }
})

export const {
  setFolders,
  setFilters,
  clearFolders,
  addFolder,
  deleteFolder,
  updateFolder,
  updateShowSideBar,
  updateBreadcrumb
} = fileSystemSlice.actions;

export default fileSystemSlice.reducer;
