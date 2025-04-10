import { createSlice } from '@reduxjs/toolkit';

interface File {
  _id: string;
  name: string;
  path: string;
  type: string;
  folder: string | null;
}

interface FileState {
  files: File[];
  uploading: boolean;
  error: string | null;
}

const initialState: FileState = {
  files: [],
  uploading: false,
  error: null,
};


const fileSlice = createSlice({
  name: 'file',
  initialState,
  reducers: {}
});

export default fileSlice.reducer;
