import FolderItem from "./FolderItem";
import { useGetFoldersQuery } from "../../features/folder/folderApiSlice";
import { FolderApiResponse } from "../../types/fileSystem";

function FolderTree() {
  const { data, error, isLoading } = useGetFoldersQuery<FolderApiResponse>();

  console.log(data,'data')

  if (isLoading) {
    return <div className="p-2 text-gray-500">Loading folders...</div>;
  }

  if (error) {
    return <div className="p-2 text-red-500">Failed to load folders</div>;
  }

  return (
    <div className="pl-2 pr-1 h-full overflow-y-auto custom-scroll">
      {data && data.folders && Array.isArray(data.folders) && data.folders && data.folders.length > 0 ? (
        data.folders.map((folder) => <FolderItem key={folder._id} folder={folder} />)
      ) : (
        <div className="text-sm text-gray-400 p-2">No folders found</div>
      )}

    </div>
  );
}

export default FolderTree;
