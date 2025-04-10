import { createSlice } from "@reduxjs/toolkit";

interface Folder {
  _id: string;
  name: string;
  parent?: string;
}

interface FolderState {
  folders: Folder[];
  loading: boolean;
  error: string | null;
}

const initialState: FolderState = {
  folders: [],
  loading: false,
  error: null,
};

const folderSlice = createSlice({
  name: "folder",
  initialState,
  reducers: {},
});

export default folderSlice.reducer;
