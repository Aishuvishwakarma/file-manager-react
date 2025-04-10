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
    data?.files?.filter((f) => f.folder === null) || [];

  return (
    <div className="overflow-x-auto h-full rounded-md">
      <table className="w-full  text-left">
        <thead className="text-sm text-gray-700">
          <tr>
            <th className="p-3 font-semibold">Name</th>
            <th className="p-3 font-semibold">Description</th>
            <th className="p-3 font-semibold">Created At</th>
            <th className="p-3 font-semibold">Updated At</th>
            <th className="p-3 font-semibold"></th>
          </tr>
        </thead>
        <tbody className="">
          {isLoading && (
            <tr>
              <td colSpan={5} className="p-2 text-gray-500">
                Loading folders...
              </td>
            </tr>
          )}
          {error && (
            <tr>
              <td colSpan={5} className="p-2 text-red-500">
                Failed to load folders
              </td>
            </tr>
          )}
          {topLevelFolders.map((folder) => (
            <FileRow key={folder._id} folder={folder} />
          ))}
          {unassignedFiles.map((file) => (
            <FileItemRow key={file._id} file={file} />
          ))}
          {topLevelFolders.length === 0 && unassignedFiles.length === 0 && (
            <tr>
              <td colSpan={5} className="text-sm text-gray-400 p-2">
                No folders or files found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default FileList;
