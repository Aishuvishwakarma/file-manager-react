import FolderItem from "./FolderItem";
import { useGetFoldersQuery } from "../../features/folder/fileSystemSliceApiSlice";
import { FilterType, FolderApiResponse } from "../../types/fileSystem";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { FaFileAlt } from "react-icons/fa";

function FolderTree() {
  const filters: FilterType = useSelector(
    (state: RootState) => state.folder.filter
  );
  const { data, error, isLoading } =
    useGetFoldersQuery<FolderApiResponse>(filters);

  if (isLoading) {
    return <div className="p-2 text-gray-500">Loading folders...</div>;
  }

  if (error) {
    return <div className="p-2 text-red-500">Failed to load folders</div>;
  }

  const rootFiles = data?.files || [];
  const folders = data?.folders || [];

  return (
    <div className="pl-2 pr-1 h-full overflow-y-auto custom-scroll">
      {/* Show folders */}
      {folders.length > 0 ? (
        folders.map((folder) => <FolderItem key={folder._id} folder={folder} />)
      ) : rootFiles.length === 0 ? (
        <div className="text-sm text-gray-400 p-2">
          No folders or files found
        </div>
      ) : null}
      {/* Show files */}

      {rootFiles.length > 0 &&
        rootFiles.map((file) => (
          <div
            key={file._id}
            className="flex items-center gap-2 p-2 text-sm text-gray-700 hover:bg-gray-100 border-b border-gray-100"
          >
            <FaFileAlt size={14} className="text-blue-500" />
            <span>{file.name}</span>
          </div>
        ))}
    </div>
  );
}

export default FolderTree;
