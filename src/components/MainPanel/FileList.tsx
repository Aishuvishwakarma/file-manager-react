import { useGetFoldersQuery } from "../../features/folder/folderApiSlice";
import { FolderApiResponse } from "../../types/fileSystem";
import FileRow from "./FileRow";

function FileList() {
  const { data, error, isLoading } = useGetFoldersQuery<FolderApiResponse>();

  return (
    <div className="overflow-x-auto h-full rounded-md">
      <table className="w-full table-auto text-left">
        <thead className="text-sm text-gray-700" >
          <tr className="" >
            <th className="p-3 font-semibold">Name</th>
            <th className="p-3 font-semibold">Description</th>
            <th className="p-3 font-semibold">Created At</th>
            <th className="p-3 font-semibold">Updated At</th>
            <th className="p-3 font-semibold"></th>
          </tr>
        </thead>
        <tbody className="">
          {isLoading && <div className="p-2 text-gray-500">Loading folders...</div>}
          {error && <div className="p-2 text-red-500">Failed to load folders</div>}
          {data && data.folders && Array.isArray(data.folders) && data.folders && data.folders.length > 0 ? (
            data.folders.map((folder) => <FileRow key={folder._id} folder={folder} />)
          ) : (
            <div className="text-sm text-gray-400 p-2">No folders found</div>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default FileList;
