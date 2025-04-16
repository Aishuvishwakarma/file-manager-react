import SideMenu from "./SideMenu";
import FolderTree from "./FolderTree";
import { FaRegFolder } from "react-icons/fa6";
import { FaRegFile } from "react-icons/fa";
import { useGetFileSystemCountQuery } from "../../features/folder/folderApiSlice";

function Index() {
  const { data: foldersCount } = useGetFileSystemCountQuery();
  return (
    <div className="flex h-full">
      <SideMenu />
      <div className="w-[300px] bg-white border-r-2 border-gray-300 h-full overflow-hidden">
        <div className="w-full h-[150px] border-b-2 border-gray-300 p-5 space-y-4">
          <p className="text-sm font-medium">Folders & Documents</p>
          <div className="flex space-x-8">
            <div className="space-y-1">
              <FaRegFolder style={{ fontSize: "25px" }} />
              <p className="text-sm font-normal">Folders</p>
              <p className="text-md font-medium">
                {foldersCount?.folders != null ? (foldersCount.folders < 200 ? foldersCount.folders : "200+") : "—"}
              </p>
              </div>

            <div className="border-l border-gray-300 pl-4 space-y-1">
              <FaRegFile style={{ fontSize: "25px" }} />
              <p className="text-sm font-normal">Documents</p>
              <p className="text-md font-medium">
                {foldersCount?.files != null ? (foldersCount.files < 200 ? foldersCount.files : "200+") : "—"}
              </p>
            </div>
          </div>
        </div>
        <FolderTree />
      </div>

    </div>
  );
}

export default Index;
