import { RootState } from "../../app/store";
import { useGetFoldersQuery } from "../../features/folder/folderApiSlice";
import {
  FilterType,
  FolderApiResponse,
  FileType,
} from "../../types/fileSystem";
import FileRow from "./FileRow";
import FileItemRow from "./FileItemRow";
import { useSelector } from "react-redux";

function FileList() {
  const filters: FilterType = useSelector(
    (state: RootState) => state.folder.filter
  );
  const { data, error, isLoading } =
    useGetFoldersQuery<FolderApiResponse>(filters);

  const topLevelFolders = data?.folders?.filter((f) => f.parent === null) || [];
  const unassignedFiles: FileType[] =
    data?.files?.filter((f:FileType) => f.parent === null) || [];

  console.log(topLevelFolders, unassignedFiles, "unassignedFiles")

  return (
    <div className="overflow-x-auto h-full rounded-md w-full">
      <div className="w-full text-left">
        {/* Header */}
        <div className="text-sm text-gray-700 grid grid-cols-5 border-b border-gray-200 font-semibold px-3 py-2">
          <span>Name</span>
          <span>Description</span>
          <span>Created At</span>
          <span>Updated At</span>
          <span></span>
        </div>

        {/* Folder/File Rows */}
        <div className="flex flex-col mt-2">
          {isLoading && (
            <p className="p-2 text-gray-500">Loading folders...</p>
          )}
          {error && (
            <p className="p-2 text-red-500">Failed to load folders</p>
          )}
          {topLevelFolders.map((folder) => (
            <FileRow key={folder._id} folder={folder} />
          ))}
          {unassignedFiles.map((file) => (
            <FileItemRow key={file._id} file={file} />
          ))}
          {topLevelFolders.length === 0 && unassignedFiles.length === 0 && (
            <p className="text-sm text-gray-400 p-2">
              No folders or files found
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default FileList;
